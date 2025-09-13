import Employee from "../Schema/Employees.js";
const escapeRegExp = (s = '') => {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
const getAllEmployees = async (req, res) => {
    try{
        const employees = await Employee.find({}).lean();
    res.status(200).json(employees); 
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
// GET /api/employees/:name
 const getSingleEmployee  = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name?.trim()) {
      return res.status(400).json({ message: "name is required" });
    }

      const employee = await Employee.findOne({
        name: { $regex: `^${escapeRegExp(name.trim())}$`, $options: "i" },
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createEmployee = async (req, res) => {
    try{
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    }catch(err){    
        res.status(500).json({message: err.message});
    }
}
export {getAllEmployees, getSingleEmployee,createEmployee};