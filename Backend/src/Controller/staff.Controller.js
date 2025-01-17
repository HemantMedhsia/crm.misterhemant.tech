import { School } from "../Models/school.model.js";
import { Staff } from "../Models/staff.Model.js";
import { ApiError } from "../Utils/errorHandler.js";
import { generateAccessToken } from "../Utils/generateAcessToken.js";
import { generateRefreshToken } from "../Utils/generateRefreshToken.js";
import { ApiResponse } from "../Utils/responseHandler.js";
import wrapAsync from "../Utils/wrapAsync.js";
import jwt from "jsonwebtoken";
import { StaffAttendance } from "../Models/staffAttendence.Model.js";
import { staffValidationSchema } from "../Validation/staff.Validation.js";
import fs from "fs";
import csv from "csv-parser";
import path from "path";
import xlsx from "xlsx";

const generateAccessAndRefreshTokens = async (staffId, next) => {
    const staff = await Staff.findById(staffId);

    if (!staff) {
        return next(new ApiError(404, "staff not found"));
    }

    const accessToken = generateAccessToken(staff);
    const refreshToken = generateRefreshToken(staff);

    if (!accessToken || !refreshToken) {
        return next(new ApiError(500, "Failed to generate tokens"));
    }

    return { accessToken, refreshToken };
};

export const createStaff = wrapAsync(async (req, res) => {
    const school = await School.findById(req.params.schoolId);
    if (!school) {
        return res.status(404).json({ message: "School not found" });
    }
    const staff = await Staff.create(req.body);
    school.workingStaffs.push(staff._id);
    await school.save();
    return res
        .status(201)
        .json(new ApiResponse(201, staff, "Staff Created Successfully"));
});

export const loginStaff = wrapAsync(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return next(
            new ApiError(400, "Email, password, and role are required")
        );
    }

    const staff = await Staff.findOne({ email });

    if (!staff) {
        console.log("staff not found");
        return next(new ApiError(404, "staff does not exist"));
    }

    console.log("staff found:", staff.email);

    const isPasswordValid = await staff.isValidPassword(password);
    console.log("Is password valid:", isPasswordValid);

    if (!isPasswordValid) {
        console.log("Invalid password attempt for staff:", staff.email);
        return next(new ApiError(401, " Invalid staff credentials "));
    }

    if (staff.role !== role) {
        return next(new ApiError(403, "Unauthorized role"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        staff._id
    );

    staff.refreshToken = refreshToken;
    await staff.save();

    const loggedInstaff = await Staff.findById(staff._id).select(
        "-password -refreshToken"
    );

    // Cookie options
    // const options = {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production", // Set secure to true in production
    // };

    return res
        .status(200)
        .cookie("accessToken", accessToken) // include option before production.
        .cookie("refreshToken", refreshToken) // include option before production.
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInstaff,
                    accessToken,
                    refreshToken,
                },
                "Staff logged in successfully"
            )
        );
});

export const refreshAccessTokenStaff = wrapAsync(async (req, res, next) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        return next(new ApiError(401, "Unauthorized request"));
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const staff = await Staff.findById(decodedToken?.id);

        if (!staff) {
            return next(new ApiError(401, "Invalid refresh token"));
        }

        if (incomingRefreshToken !== staff?.refreshToken) {
            return next(new ApiError(401, "Refresh token is expired or used"));
        }

        // const options = {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        // };

        const { accessToken, refreshToken: newRefreshToken } =
            await generateAccessAndRefreshTokens(staff._id);
        staff.refreshToken = newRefreshToken;
        await staff.save({ validateBeforeSave: false });

        return res
            .status(200)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", newRefreshToken)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        return next(
            new ApiError(401, error?.message || "Invalid refresh token")
        );
    }
});

export const getAllStaffs = wrapAsync(async (req, res) => {
    const staff = await Staff.find();
    return res.status(200).json(new ApiResponse(200, staff));
});

export const getStaffById = wrapAsync(async (req, res) => {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
    }
    return res.status(200).json(new ApiResponse(200, staff));
});

export const updateStaff = wrapAsync(async (req, res) => {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
    }
    return res
        .status(200)
        .json(new ApiResponse(200, staff, "Staff Updated Successfully"));
});

export const deleteStaff = wrapAsync(async (req, res) => {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
        return res.status(404).json({ message: "Staff not found" });
    }
    return res
        .status(200)
        .json(new ApiResponse(200, staff, "Staff Deleted Successfully"));
});

export const getAttendanceAndStaffCount = wrapAsync(async (req, res) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    const attendanceRecords = await StaffAttendance.find({
        date: {
            $gte: startDate,
            $lte: endDate,
        },
    }).populate({
        path: "staffId",
        select: "gender",
    });

    const maleAttendance = Array(7).fill(0);
    const femaleAttendance = Array(7).fill(0);

    attendanceRecords.forEach((record) => {
        const dayOfWeek = record.date.getDay();
        if (record.status === "Present") {
            if (record.staffId.gender === "Male") {
                maleAttendance[dayOfWeek]++;
            } else if (record.staffId.gender === "Female") {
                femaleAttendance[dayOfWeek]++;
            }
        }
    });

    const barChartData = [
        {
            name: "Male",
            data: maleAttendance,
        },
        {
            name: "Female",
            data: femaleAttendance,
        },
    ];

    const totalCounts = await Staff.aggregate([
        {
            $group: {
                _id: "$gender",
                count: { $sum: 1 },
            },
        },
    ]);

    const totalStaff = totalCounts.reduce((acc, curr) => acc + curr.count, 0);
    const totalMaleStaffs =
        totalCounts.find((g) => g._id === "Male")?.count || 0;
    const totalFemaleStaffs =
        totalCounts.find((g) => g._id === "Female")?.count || 0;

    const response = {
        attendanceData: barChartData,
        totalStaff,
        totalMaleStaffs,
        totalFemaleStaffs,
    };

    return res.status(200).json(new ApiResponse(200, response));
});

export const uploadBulkStaffData = wrapAsync(async (req, res) => {
    if (!req.file) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Please upload a file"));
    }

    const schoolId = req.params.schoolId;
    const filePath = req.file.path;
    const staffData = [];
    const errors = [];
    const processedStaffs = [];

    try {
        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        let parsedData = [];

        if (fileExtension === ".csv") {
            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on("data", (row) => {
                        parsedData.push(row);
                    })
                    .on("end", resolve)
                    .on("error", reject);
            });
        } else if (fileExtension === ".xls" || fileExtension === ".xlsx") {
            const workBook = xlsx.readFile(filePath);
            const sheetName = workBook.SheetNames[0];
            const worksheet = workBook.Sheets[sheetName];
            parsedData = xlsx.utils.sheet_to_json(worksheet, { defval: null });
        } else {
            throw new ApiError(400, "Invalid file format");
        }

        parsedData.forEach((row) => {
            staffData.push(row);
        });

        const schoolDoc = await School.findById(schoolId);
        if (!schoolDoc) {
            return res
                .status(404)
                .json(new ApiResponse(404, null, "School not found."));
        }

        for (let i = 0; i < staffData.length; i++) {
            const data = staffData[i];

            const existingStaff = await Staff.findOne({ email: data.email });
            if (existingStaff) {
                errors.push({
                    email: data.email,
                    message: `Staff with email ${data.email} already exists. Skipping this record.`,
                });
                continue;
            }

            const newStaff = new Staff({
                ...data,
                school: schoolId,
            });

            const savedStaff = await newStaff.save();
            processedStaffs.push(savedStaff);

            schoolDoc.workingStaffs.addToSet(savedStaff._id);
        }

        await schoolDoc.save();
        fs.unlinkSync(filePath);

        return res.status(207).json(
            new ApiResponse(
                207,
                {
                    successfulStaffs: processedStaffs,
                    errors: errors,
                },
                "Bulk upload processed with some errors."
            )
        );
    } catch (err) {
        console.error(err);

        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    null,
                    "An error occurred during bulk upload."
                )
            );
    }
});
