import React, { useEffect, useState } from "react";
import { Card, Input, Button, Modal, Form, message,Popconfirm } from "antd";
import "./EmployeeList.css"; // Custom CSS for smooth animations
import  axiosInstance  from '../../apicalls/index'

const EmployeeList = () => {

  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timetableForm] = Form.useForm();

  
  // Fetch employee data
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get("/admin/employee/all");
      if (response.data.success) {
        setEmployees(response.data.data);
        // message.success(response.data.message)
      } else {
         message.error(response.data.message)
      }
    } catch (error) {
      message.error("Failed to fetch employees.");
    }
  };

  // Search filter
  const filteredEmployees = employees.filter(emp =>
    emp.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.registrationNo?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Open modal for employee details
  const viewDetails = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  // Add Doctor Timetable
  const addTimetable = async (values) => {
    try {
      const response = await axiosInstance.patch(`/admin/employee/doctor-timetable/${selectedEmployee._id}`, values);
      if (response.data) {
        message.success("Timetable added successfully!");
        fetchEmployees();
        window.location.reload()

      }
    } catch (error) {
      message.error("Failed to add timetable.");
    }
  };

  // Delete Doctor Timetable
  const deleteTimetable = async (timetableId) => {
    try {
      await axiosInstance.patch(`/admin/employee/doctor-timetable/delete/${selectedEmployee._id}`, { timetableId });
      message.success("Timetable deleted successfully!");
      fetchEmployees();
      window.location.reload()
    } catch (error) {
      message.error("Failed to delete timetable.");
    }
    //
  };
  // Delete Employee
  const deleteEmployee = async (empId) => {
    try {
      await axiosInstance.delete(`admin/employee-delete-profile/${empId}`);
      message.success("Deleted employee successfully!")
      fetchEmployees()
      window.location.reload()
    }catch(error){
    message.error("Failed to delete employee.");
  }
  }
  const cancel = e => {
    message.error('Delete Cancel!');
  };

  if(employees && employees.length === 0)
    return <>
               <h2 className="flex justify-center">Employee Data Not Found or Add Employess </h2>
          </>

  return (
    <div className="employee-container">
     
      <h2 className="title">Employee List</h2>

      <Input
        placeholder="Search by Registration No or Name..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-bar"
      />

      {/* Employee Cards */}
      <div className="card-container">
        {filteredEmployees.map((emp) => (
          <Card key={emp.registrationNo} className="employee-card">
            <p><strong>Reg No:</strong> {emp.registrationNo}</p>
            <p><strong>Name:</strong> {emp.name}</p>
            <p><strong>Type:</strong> {emp.emptype}</p>
            <div className="flex justify-spacebtn">
              <Button type="primary" className="btn-primary" onClick={() => viewDetails(emp)}>View Details</Button>
              <Button type="primary" onClick={() => viewDetails(emp)}>update</Button>
              <Popconfirm
                title="Delete Employee!!"
                description="Are you sure to delete this Employee..?"
                onConfirm={() => deleteEmployee(emp._id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                >
                    {/* <Button type="primary" onClick={() => deleteEmployee(emp._id)}>Delete</Button> */}
                      <Button color="danger" variant="solid"> <i class="ri-delete-bin-6-fill"> </i></Button>
              </Popconfirm>
            </div>
          </Card>
        ))}
      </div>

      {/* Employee Details Modal */}
      <Modal
        title="Employee Details"
        visible={isModalOpen}
        onCancel={handleClose}
        footer={null}
        width="60%"
        className="details-modal"
      >
        {selectedEmployee && (
          <div className="employee-details">
            <h3>{selectedEmployee.name}</h3>
            <p><b>Registration No:</b> {selectedEmployee.registrationNo}</p>
            <p><b>Email:</b> {selectedEmployee.email}</p>
            <p><b>Specialization:</b> {selectedEmployee.specialization}</p>
            <p><b>Employee Type:</b> {selectedEmployee.emptype}</p>

            {/* Timetable Section */}
            <h3>Doctor Timetable</h3>
            {selectedEmployee.timetable && selectedEmployee.timetable.length > 0 ? (
              selectedEmployee.timetable.map((entry) => (
                <Card key={entry._id} className="timetable-card">
                  <p><b>Day:</b> {entry.day}</p>
                  <p><b>Timing:</b> {entry.timing}</p>
                  <Button danger onClick={() => deleteTimetable(entry._id)}>Delete</Button>
                </Card>
              ))
            ) : (
              <p>No timetable available</p>
            )}

            {/* Add Timetable Form */}
            <Form form={timetableForm} layout="vertical" onFinish={addTimetable}>
              <h3>Add Timetable</h3>
              <Form.Item name="day" label="Day" rules={[{ required: true, message: "Please enter the day" }]}>
                <Input placeholder="e.g. Monday" />
              </Form.Item>
              <Form.Item name="timing" label="Timing" rules={[{ required: true, message: "Please enter the timing" }]}>
                <Input placeholder="e.g. 10:00 AM - 4:00 PM" />
              </Form.Item>
              <Button type="primary" htmlType="submit">Add Timetable</Button>
            </Form>
          </div>
        )}
      </Modal>

    </div>
  );

};

export default EmployeeList;
