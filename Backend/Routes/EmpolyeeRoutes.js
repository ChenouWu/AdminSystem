import { Router } from "express";
import { getAllEmployees,getSingleEmployee,createEmployee } from "../Controllers/EmployeeController.js";

const router = Router();

router.get('/', getAllEmployees);
router.get('/by-name/:name', getSingleEmployee);
router.post('/', createEmployee);

export default router;