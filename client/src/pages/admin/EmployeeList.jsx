import React, { useEffect, useState } from "react";
import { Card, Input, Button, Modal, Form, message,Popconfirm,Select, Row, Col } from "antd";
import "./EmployeeList.css"; // Custom CSS for smooth animations
import  axiosInstance  from '../../apicalls/index'
import {jwtDecode} from'jwt-decode'
const { Option } = Select;

const EmployeeList = () => {

  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [timetableForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  //get user role from token

  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userrole = decoded.role;
  
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
 //update employee details by admin
  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    updateForm.setFieldsValue(employee);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedEmployee(null);
  };

  const updateEmployee = async (values) => {
    console.log(values)
    console.log(selectedEmployee._id)
      try {
       const response =   await axiosInstance.patch(`/employee/profile/update/${selectedEmployee._id}`,values);
       if (response.data) {
        message.success(response.data.message);
        fetchEmployees();
        closeUpdateModal();
        // window.location.reload()

      }   
      } catch (error) {
        message.error("Failed to update employee.");
      }
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
    <div className="employee-container p1">
     
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
          <Card key={emp._id} className="employee-card">
            <h2><strong>Name:</strong> {emp.name} </h2>
            <p><strong>Reg No:</strong> {emp.registrationNo}</p>
            <p><strong>Type:</strong> {emp.emptype.toUpperCase()}</p>
            <div className="flex justify-spacebtn">
              <Button type="primary" className="btn-primary" onClick={() => viewDetails(emp)}>View Details</Button>
             
              { userrole ==='admin' && ( // this is only for admin
                <>
                  <Button type="primary" onClick={() => openUpdateModal(emp)}>update</Button>
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
                  </>
              )}
             
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
        width="40%"
        className="details-modal"
      >
        {selectedEmployee && (
          <div className="employee-details">
                <h3> Employee: {selectedEmployee.name}</h3>
                <Row gutter={14}>
                  <Col span={7}>
                        <p><b>Registration No:</b> {selectedEmployee.registrationNo}</p>
                  </Col>
                  <Col span={7}>
                      <p><b>Email:</b> {selectedEmployee.email}</p>
                  </Col>
                </Row>
                <Row gutter={14}>
                  <Col span={7}>
                        <p><b>Contact No:</b> {selectedEmployee.phone}</p>
                  </Col>
                  <Col span={7}>
                      <p><b>Specialization:</b> {selectedEmployee.specialization}</p>
                  </Col>
                  <Col span={7}>
                        <p><b>Employee Type:</b> {selectedEmployee.emptype.toUpperCase()}</p>
                  </Col>
                  </Row>

                {/* Timetable Section */}
                {
                  (selectedEmployee.emptype ==='doctor' || selectedEmployee.emptype === 'admin') && (
                    <>
                        <h4>Doctor Timetable</h4>
                        <div className=" flex p2 gap-2">
                        {selectedEmployee.timetable && selectedEmployee.timetable.length > 0 ? (
                          selectedEmployee.timetable.map((entry) => (
                            // <Row gutter={10}>
                            //   <Col span={10}>
                                <Card key={entry._id} className="timetable-card flex">
                                  <p><b>Day:</b> {entry.day.toUpperCase()}</p>
                                  <p><b>Timing:</b> {entry.timing.toUpperCase()}</p>
                                  {userrole ==='admin' && ( <Button danger onClick={() => deleteTimetable(entry._id)}>Delete</Button>  )}                           
                                </Card>
                            //   </Col>
                            // </Row>
                          ))
                        ) : (
                          <p>No timetable available</p>
                        )}
                        </div>
                    </>
                  )
                }
              
              {
                selectedEmployee.emptype==='doctor' && (
                  <>
                  {/* Add Timetable Form */}
                {userrole ==='admin' &&  ( // this is only for admin
                  <>
                    <Form form={timetableForm} layout="vertical" onFinish={addTimetable}>
                      <h3>Add Timetable</h3>
                      {/* <Form.Item name="day" label="Day" rules={[{ required: true, message: "Please enter the day" }]}>
                        <Input  placeholder="e.g. Monday" />
                      </Form.Item> */}
                      <Form.Item 
                        name="day" 
                        label="Day" 
                        rules={[{ required: true, message: "Please select a day" }]}
                      >
                        <Select placeholder="Select a day">
                          <Option value="monday">Monday</Option>
                          <Option value="tuesday">Tuesday</Option>
                          <Option value="wednesday">Wednesday</Option>
                          <Option value="thursday">Thursday</Option>
                          <Option value="friday">Friday</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item name="timing" label="Timing" rules={[{ required: true, message: "Please enter the timing" }]}>
                        <Input placeholder="e.g. 10:00 AM - 4:00 PM" />
                      </Form.Item>
                      <Button type="primary" htmlType="submit">Add Timetable</Button>
                    </Form>
                
                  </>
                ) }
                  </>
                )
              }

               
              
          </div>
        )}
      </Modal>

      <Modal
          title="Update Employee"
          open={isUpdateModalOpen}
          onCancel={closeUpdateModal}
          footer={null}
          width="50%"
          className="update-modal"
        >
          <Form form={updateForm} layout="vertical" onFinish={updateEmployee}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter employee name" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter email" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="specialization" label="Specialization">
              <Input />
            </Form.Item>
            <Form.Item name="emptype" label="Employee Type" rules={[{ required: true, message: "Please select employee type" }]}>
                <Select placeholder="Select Employee Type">
                    <Select.Option value="doctor">Doctor</Select.Option>
                    <Select.Option value="labtech">Lab Tech</Select.Option>
                </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">Save Changes</Button>
          </Form>
      </Modal>
    </div>
  );
};

export default EmployeeList;
