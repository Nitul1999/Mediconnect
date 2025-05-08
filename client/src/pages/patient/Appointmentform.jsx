import React, { useState,useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button,message, Result,Alert,Row,Col } from 'antd';
import  axiosInstance  from '../../apicalls/index'
import {Link} from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

export const Appointmentform =()=>{
    
    const token = localStorage.getItem('token')
    // let decoded = jwtDecode(token);
    if (!token || typeof token !== 'string') {
        return (
            <Result
                status="warning"
                title="To Create Appointment, Please Create an Account Or Login First..."
                extra={
                    <Button type="primary" key="console">
                        <Link to="/signin">Login</Link>
                    </Button>
                }
            />
        );
    }

    let decoded;
    try {
        decoded = jwtDecode(token);
    } catch (error) {
        return (
            <Result
                status="error"
                title="Invalid token. Please log in again."
                extra={
                    <Button type="primary">
                        <Link to="/signin">Login</Link>
                    </Button>
                }
            />
        );
    }
    const userid = decoded.userid

    const [doctor,setDoctor] = useState([]);
    const [selectDoc,setSelectDoc] = useState(null);
    const [ time,setTime] = useState([]);
    const [day,setDay]=useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [dates, setDates] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [specialization, setSpecialization] = useState('');

    const navigate= useNavigate()

    const [form] = Form.useForm();
    // fetching doctors details
    useEffect(()=>{
        const fetchdoctors = async()=>{
        try {
            const response = await axiosInstance.get('/employee/all/doctor');
            
            setDoctor(response.data.data);
          } catch (error) {
           message.error("Failed to fetch Doctors.");
          } 
        }
        fetchdoctors();
    },[]);

    const handleDoctorChange = (doctorName) => {
        const selectedDoctor = doctor.find(doc => doc.name === doctorName);
        setSelectDoc(selectedDoctor);
        setAvailableDates(selectedDoctor.timetable.map(slot => slot.day));
        setTime([]); // Reset available times
        setSelectedDate(null); // Reset selected date
        setSpecialization(selectedDoctor.specialization);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (selectDoc && date) {
            const dayOfWeek = date.format('dddd').toLowerCase();
            console.log(dayOfWeek)
            const selectedTimetable = selectDoc.timetable.find(slot => slot.day.toLowerCase() === dayOfWeek);
            if (selectedTimetable) {
                setTime(selectedTimetable.timing);
                console.log('Available Times:', selectedTimetable.timing);
            } else {
                setTime([]);
                console.log('No available times for this day.');
            }
        } else {
            setTime([]);
        }
    };
   
    //age calculation
    const handleDOBChange = (date) => {
        if (date) {
            const today = new Date();
            const birthDate = new Date(date.format('YYYY-MM-DD'));
            let years = today.getFullYear() - birthDate.getFullYear();
            let months = today.getMonth() - birthDate.getMonth();

            // Adjust for negative months
            if (months < 0) {
                years--;
                months += 12;
            }

            // Calculate age in decimal format
            const ageInDecimal = years + (months / 12);
            form.setFieldsValue({ age: ageInDecimal.toFixed(1) }); // Set age with one decimal place
        } else {
            form.setFieldsValue({ age: '' });
        }
      };

    const onFinish = async(values) => {
       const appointmentdata ={
        patientname:values.patientname,
        gender:values.gender,
        dob:values.dateofbirth.format('YYYY-MM-DD'),
        age:values.age,
        contact:values.contact,
        appointmentdate:selectedDate.format('YYYY-MM-DD'),
        appointmentday:selectedDate.format('dddd'),
        appointmenttime:values.appointmenttime,
        doctorname:selectDoc.name,
        reason:values.reason,
        symptoms:values.symptoms,
       };
       try {
        const response = await axiosInstance.put(`/person/create/appointment/${userid}`,appointmentdata)
        if(response.data.success){
            message.success(response.data.message)
            navigate('/patientprofile')
        }else{
            message.error(response.data.message)
        }
       } catch (error) {
             message.error(error.response?.data?.message || "Something went wrong!");
       }
    };
    return(
        <div className=" flex justify-center">
            <div className="m2 w-3">
               
                <Form
                    form={form}
                    name="appointment_form"
                    onFinish={onFinish}
                    layout="vertical"
                    >
                    <Row >
                        <Col >
                            <Form.Item
                            name="patientname"
                            label="Patient Name"
                            rules={[{ required: true, message: 'Please input the patient name!' }]}
                        >
                            <Input />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[{ required: true, message: 'Please select the gender!' }]}
                            >
                                <Select placeholder="Select a gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row gutter={16}>
                        <Col xs={{ span: 7 }}>
                            <Form.Item
                                name="dateofbirth"
                                label="DOB"
                                rules={[{ required: true, message: 'Select Date of Birth ' }]}
                                >
                                    <DatePicker
                                    format="YYYY-MM-DD" // Set the format directly
                                    onChange={handleDOBChange} // Directly assign the onChange prop
                                    />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 3 }}>
                            <Form.Item
                                name="age"
                                label="Age"
                            >
                                <Input readOnly/>

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 7 }}>
                            <Form.Item
                                name="contact"
                                label="Contact number"
                                rules={[{ required: true, message: "Please enter your phone number" },{ pattern: /^[0-9]{10}$/, message: "Please enter a valid phone number" }]}
                                >
                                    <Input/>

                            </Form.Item>
                        </Col>
                    </Row>
                   
                 
                    <Row>
                        <Col xs={{ span: 7 }}>
                            <Form.Item
                                name="doctorname"
                                label="Doctor Name"
                                rules={[{ required: true, message: 'Please select a doctor!' }]}
                            >
                                <Select placeholder="Select Doctor Name" onChange={handleDoctorChange}>
                                    {doctor.map(doc => (
                                        <Option key={doc._id} value={doc.name}>{doc.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col>
                            <div className='p-left m1'>
                                {selectDoc && 
                                    <Alert
                                    message="Specialization in :"
                                    description={` ${selectDoc.specialization}`}
                                    type="info"
                                    showIcon
                                    />
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 7 }}>
                            <Form.Item
                                name="appointmentdate"
                                label="Appointment Date"
                                rules={[{ required: true, message: 'Please select the appointment date!' }]}
                            >
                            
                                <DatePicker onChange={handleDateChange}
                                disabledDate={date => {
                                    if (!selectDoc) return true;
                                    const day = date.format('dddd').toLowerCase();

                                    return !selectDoc.timetable.some(slot => slot.day.toLowerCase() === day);
                                    }}  />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 7 }}>
                            <Form.Item
                                name="appointmenttime"
                                label="Appointment Time"
                                rules={[{ required: true, message: 'Please select the appointment time!' }]}
                            >
                            {Array.isArray(time) && time.length > 0 ? (
                                <Select placeholder="Select Appointment Time">
                                    {time.map((timeslot, index) => (
                                        <Option key={index} value={timeslot}>
                                        {timeslot}
                                        </Option>
                                    ))}
                                </Select>
                                    ) : (
                                        <p style={{ color: 'red' }}>No Time Available</p>
                                    )}
                                                    
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="reason"
                        label="Reason for Appointment"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        name="symptoms"
                        label="Symptoms"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>

                {/* <div>
                            <h1>Booked</h1>
                </div> */}
            </div>

        </div>
    )
} 