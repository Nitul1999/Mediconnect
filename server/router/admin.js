const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/admin"); // Ensure this path is correct
const employee = require('../model/emp');
const { default: mongoose } = require("mongoose");
const router = express.Router();

const authmiddleware = require('../middleware/authmiddleware')


// Admin Registration Route..working
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone,emptype, hospitalName } = req.body;
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
            phone,
            emptype,
            hospitalName
        });
        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Admin Login Route..working
router.post("/login", async (req, res) => {
    try {
        const {email,password} = req.body
        const adminExist = await Admin.findOne({email});
        if (!email || !password) {
            return res.status(400).send({ message: "Email and Password are required", success: false });
        }
        if (!adminExist) {
            return res.status(400).send({ message: "Email does not exist", success: false });
        }
        const validedPassword = await bcrypt.compare(password, adminExist.password);
        if (!validedPassword) {
            return res.status(400).send({ message: "Invalid Password", success: false });
        }
        const token = jwt.sign(
            { userid: adminExist._id, role: adminExist.emptype  },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.send({
            message: "Login Successful",
            success: true,
            data: token
        });
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
});
//view admin details by id ... working
router.get("/profile/view/:id", async (req, res) => {
    const {id:_id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(201).json({message:"Invaild Admin ID"})
    }
    try {
        const admin = await Admin.findById({_id});
        res.status(200).send({
            message:"Admin Found",
            success:true,
            data: admin});
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
})


// Update Admin Details/profile..working
router.patch("/profile/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAdmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin updated successfully", data: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Delete Admin
router.delete("/admin-delete-profile/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


//from here some end point of admin to create and update employee details
// **Make sure this line is present at the end**

//get all employee details...working
router.get('/employee/all',async(req,res)=>{
    try {
        const employeedata = await employee.find({})
        if(employeedata.length === 0){
            return res.status(200).send({
                message: "No employee found",
                data: employeedata,
                success:false
            });
        }

        res.status(200).send({
            message: "Employee details found",
            data: employeedata,
            success:true
        })
    } catch (error) {
        
    }
})
//get employee by id...working
router.get('/employee/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        const employeedata = await employee.findById(id)
        if(!employeedata){
            return res.status(404).json({ message: "Employee not found" });
            }
            res.json({ message: "Employee found", data: employeedata });
            } catch (error) {
                res.status(500).json({ message: "Server error", error });
           }
});

//update emptype by admin  ..woking
router.put('/employee/update-employee-type/:id',async(req,res)=>{
    try {
        const {id:_id}=req.params
        const {emptype} = req.body
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(400).json({ message: "Invalid employee id" });
        }
        const updatedemployee = await employee.findByIdAndUpdate(_id, {emptype}, {new:true})

        if(!updatedemployee){
            return res.status(204).json({ message: "Employee Data Not Updated" });
        }
        res.status(200).json({ message: "Employee Data Updated Successfully", data: updatedemployee})
        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
})

//add employeee details by admin..working
router.post('/employee/add',async(req,res)=>{
    try {
        const newemp = req.body;
        const existingEmployee = await employee.findOne({ email: newemp.email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(newemp.password, 10);
        const adddata = new employee({
            registrationNo:newemp.registrationNo,
            name:newemp.name,
            email:newemp.email,
            password:hashedPassword,
            specialization:newemp.specialization,
            emptype:newemp.emptype
        }) 
        await adddata.save();
        res.status(200).json({
            message:"Employee added successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json(error)
    }
})
//delete employee by id
router.delete("/employee-delete-profile/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedemployee = await employee.findByIdAndDelete(id);
        if (!deletedemployee) {
            return res.status(404).json({ message: " not found" });
        }
        res.json({ message: "employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});



//update doctor timetbale from admin ...working
router.patch('/employee/doctor-timetable/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const updatedTimetable = req.body;
    
        // Validate the updated timetable
        if (!updatedTimetable || !updatedTimetable.day || !updatedTimetable.timing) {
          return res.status(400).json({ message: 'Invalid timetable data' });
        }
    
        // Update the timetable of the existing doctor
        const updatedEmployee = await employee.findByIdAndUpdate(id, {
          $push: {
            'timetable': updatedTimetable
          }
        }, { new: true });
    
        if (!updatedEmployee) {
          return res.status(404).json({ message: 'Employee not found' });
        }
    
        res.json(updatedEmployee);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})

//delete timetable by admin ..working
router.patch('/employee/doctor-timetable/delete/:id',async(req,res)=>{
    try {
        const{id:_id} = req.params
        const timetableId = req.body.timetableId //timetable id entry to be deleted
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(201).json({message:"Employee Not Vaild"})
        }
        if(!timetableId){
            return res.status(201).json({message:"Timetable ID is not vaild"})
        }
        const updateemp = await employee.findByIdAndUpdate(_id,
            {
                $pull: {timetable: {_id: timetableId}}
            },
                {new:true}
            
        )
        if(!updateemp){
            return res.status(404).json({message:"Employee Data Not Found"})
        }
        res.status(200).json({message:"Employe Time-Table Succssfully Deleted"})
    } catch (error) {
        res.status(500).json(error)
    }

})


module.exports = router;
