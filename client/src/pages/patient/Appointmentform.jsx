import React, { useState,useEffect } from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Button,message, Result } from 'antd';
import  axiosInstance  from '../../apicalls/index'
import {Link} from 'react-router-dom'
const { Option } = Select;

export const Appointmentform =()=>{
    
    const token = localStorage.getItem('token')


    const [doctor,setDoctor] = useState([]);
    const [selectDoc,setSelectDoc] = useState(null);
    const [ time,setTime] = useState([]);
    const [day,setDay]=useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [dates, setDates] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);

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
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          form.setFieldsValue({ age: age.toString() });
        } else {
          form.setFieldsValue({ age: '' });
        }
      };

    const onFinish = (values) => {
        console.log('Received values:', { ...values });
    };
   if(!token) return(
    <>
        <Result
            status="warning"
            title="To Create Appointment, Please Create an Account Or Login First..."
            extra={
            <Button type="primary" key="console">
                <Link to="/signin" className=''>Login</Link>
            </Button>
            }
        />
    </>
   )
    return(
        <div className="">
            <div className="">
                <div>
                    <Form
                    form={form}
                    name="appointment_form"
                    onFinish={onFinish}
                    layout="vertical"
                    >
                    <Form.Item
                        name="patientname"
                        label="Patient Name"
                        rules={[{ required: true, message: 'Please input the patient name!' }]}
                    >
                        <Input />
                    </Form.Item>

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
                    <Form.Item
                        name="dateofbirth"
                        label="DOB"
                        rules={[{required:true,message:'Select Date of Birth '}]}
                        >
                            <DatePicker
                                format={{
                                    format: 'YYYY-MM-DD',
                                    onChange:{handleDOBChange}
                                    // type: 'mask',
                                }}
                                />
                    </Form.Item>
                    <Form.Item
                        name="age"
                        label="Age"
                    >
                        <Input readOnly/>

                    </Form.Item>

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

                </div>
                <div>

                </div>
            </div>

        </div>
    )
} 