import wrapAsync from "../Utils/wrapAsync.js";
import { ApiError } from "../Utils/errorHandler.js";
import { ApiResponse } from "../Utils/responseHandler.js";
import { Master } from "../Models/master.Model.js";
import { generateAccessToken } from "../Utils/generateAcessToken.js";
import { generateRefreshToken } from "../Utils/generateRefreshToken.js";

const generateAccessAndRefreshTokens = async (adminId, next) => {
  const masteradmin = await Master.findById(adminId);

  if (!masteradmin) {
    return next(new ApiError(404, "masteradmin not found"));
  }
  const accessToken = generateAccessToken(masteradmin);
  const refreshToken = generateRefreshToken(masteradmin);

  masteradmin.refreshToken = refreshToken;

  await masteradmin.save({ validateBeforeSave: false });

  if (!accessToken || !refreshToken) {
    return next(new ApiError(500, "Failed to generate tokens"));
  }

  return { accessToken, refreshToken };
};

export const createMasterAdmin = wrapAsync(async (req, res, next) => {
  const { name, email, password, role, schoolCode, frontendUrl } = req.body;

  const master = await Master.create({
    name,
    email,
    password,
    role,
    schoolCode,
    frontendUrl,
  });

  if (!master) {
    return next(new ApiError(400, "Master not created"));
  }

  res.status(201).json(new ApiResponse(201, master));
});

export const getMasterAdmin = wrapAsync(async (req, res, next) => {
  const master = await Master.find();

  if (!master) {
    return next(new ApiError(404, "Master not found"));
  }

  res.status(200).json(new ApiResponse(200, master));
});

export const getMasterAdminById = wrapAsync(async (req, res, next) => {
  const master = await Master.findById(req.params.id);

  if (!master) {
    return next(new ApiError(404, "Master not found"));
  }

  res.status(200).json(new ApiResponse(200, master));
});

export const updateMasterAdmin = wrapAsync(async (req, res, next) => {
  const { name, email, password, role, schoolCode, frontendUrl } = req.body;
  const { id } = req.params;

  const master = await Master.findById(id);

  if (!master) {
    return next(new ApiError(404, "Master not found"));
  }

  master.name = name || master.name;
  master.email = email || master.email;
  master.password = password || master.password;
  master.role = role || master.role;
  master.schoolCode = schoolCode || master.schoolCode;
  master.frontendUrl = frontendUrl || master.frontendUrl;

  await master.save();

  res
    .status(200)
    .json(new ApiResponse(200, master, "Master updated successfully"));
});

export const deleteMasterAdmin = wrapAsync(async (req, res, next) => {
  const master = await Master.findByIdAndDelete(req.params.id);

  if (!master) {
    return next(new ApiError(404, "Master not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, master, "Master deleted successfully"));
});

export const loginMasterAdmin = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError(400, "Email , password  are required"));
  }

  const masteradmin = await Master.findOne({ email });

  if (!masteradmin) {
    console.log("masteradmin not found");
    return next(new ApiError(404, "masteradmin does not exist"));
  }

  const isPasswordValid = await masteradmin.isValidPassword(password);
  console.log("Is password valid:", isPasswordValid);

  if (!isPasswordValid) {
    return next(new ApiError(401, "Invalid admin credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    masteradmin._id
  );

  masteradmin.refreshToken = refreshToken;
  await masteradmin.save({ validateBeforeSave: false });

  const { password: _, ...masteradminData } = masteradmin.toObject();

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        {
          user: masteradminData,
          accessToken,
          refreshToken,
        },
        "Admin logged in successfully"
      )
    );
});

export const refreshAccessTokenAdmin = wrapAsync(async (req, res, next) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return next(new ApiError(401, "Unauthorized request"));
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    return next(new ApiError(401, "Invalid refresh token"));
  }

  const masteradmin = await Master.findById(decodedToken?.id);
  if (!masteradmin) {
    return next(new ApiError(401, "Invalid refresh token"));
  }

  if (incomingRefreshToken !== masteradmin?.refreshToken) {
    return next(new ApiError(401, "Refresh token is expired or used"));
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefreshTokens(masteradmin._id);

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
});
