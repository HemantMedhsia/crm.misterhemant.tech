import express from "express";
import {
    createSchool,
    deleteSchool,
    getSchool,
    getSchoolNameByCode,
    getSchools,
    updateSchool,
} from "../Controller/school.Controller.js";

const router = express.Router();

router.post("/create-school/", createSchool);
router.get("/get-schools", getSchools);
router.get("/get-school/:id", getSchool);
router.put("/update-school/:id", updateSchool);
router.delete("/delete-school/:id", deleteSchool);
router.post("/school-name-byschoolcode", getSchoolNameByCode);

export { router as schoolRoute };
