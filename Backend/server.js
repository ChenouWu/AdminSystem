import cors from 'cors';
import express from 'express';
import {connectDB} from './config/db.js';
import dotenv from 'dotenv';
import employeeRoutes from './Routes/EmpolyeeRoutes.js';

dotenv.config();
const App = express();

App.use(cors());

App.use(express.json());


App.use('/api/employees', employeeRoutes);

App.listen(3000, async () => {
    await connectDB();
    console.log(`Server is running on ${3000} `);
});
