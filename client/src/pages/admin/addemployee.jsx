import React from "react";
import { Form, Input, Button, Select,message, Divider,Flex } from "antd";
import { useNavigate } from "react-router-dom";
import  axiosInstance  from '../../apicalls/index'
const { Option } = Select;

export const Addemployees = () => {

const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axiosInstance.post("/admin/employee/add", values);
      if (response.data.success) {
        message.success(response.data.message)
        navigate("/employees")
      }else{
        message.error(response.data.message)

      }
      } catch (error) {
        message.error(error.response?.data?.message || "Something went wrong!");
      }
   };

  return (
    <div>
     <div className="form-container flex justify-center mt-1 ">
        <div className="form w-3  ">
          <h2 className="text-center text-2xl font-semibold ">Add Employee Details</h2>
          <Divider style={{ borderColor: '#7cb305' }}></Divider>
          <Form layout="vertical" name="register"className="border-1 p2 m1" onFinish={onFinish}  >
            <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item label="Phone Number" name="phone" rules={[{ required: true, message: "Please enter your phone number" },{ pattern: /^[0-9]{10}$/, message: "Please enter a valid phone number" }]}>
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item label="Specialization" name="specialization">
              <Input placeholder="Enter specialization (Optional)" />
            </Form.Item>

            <Form.Item label="Select Employee Type" name="emptype" rules={[{ required: true, message: "Please select a type" }]}>
              <Select placeholder="Choose Employee type">
                <Option value="doctor">Doctor</Option>
                <Option value="labtech">Lab Technician</Option>
              </Select>
            </Form.Item>
            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit" className="w-full text-lg rounded-lg btn-primary p2">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>

     </div>
     </div>
  );
};

export default Addemployees;
