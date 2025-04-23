import React, { useState,useEffect, use } from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Button,message } from 'antd';
import  axiosInstance  from '../../apicalls/index'
const { Option } = Select;

export const Appointmentform =()=>{
    
    const [doctor,setDoctor] = useState([]);
    const [selectDoc,setSelectDoc] = useState(null);
    const [ time,setTime] = useState([]);
    const [day,setDay]=useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    // fetching doctors details
    useEffect(()=>{
        const fetchdoctors = async()=>{
        try {
            const response = await axiosInstance.get('/employee/all/doctor');
            // if (response.data.success) {
            //   message.success(response.data.message)
            // }
            setDoctor(response.data.data);
          } catch (error) {
           message.error("Failed to fetch Doctors.");
          } 
        }
        fetchdoctors();
    },[]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (date) {
            const dayOfWeek = date.day(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
            const availableDoctors = doctor.filter(doctor =>
                doctor.timetable.some(slot => slot.day === dayOfWeek)
            );
            setFilteredDoctors(availableDoctors);
            setSelectDoc(null); // Reset selected doctor
            setTime([]); // Reset available times
            setDay(availableDoctors.map(doctor => doctor.timetable.filter(slot => slot.day === dayOfWeek).map(slot => slot.day)));
        } else {
            setFilteredDoctors(doctor); // Reset to all doctors if no date is selected
        }
    };

    const doctorchange=(values)=>{
        const doctors = filteredDoctors.find(doc=>doc.name === values)
        setSelectDoc(doctors)
        setTime(doctors? doctors.timetable.filter(slot => slot.day===selectedDate.day()).map(slot=>slot.timing) : [])
        // setDay(doctors? doctors.timetable.map(slot => slot.day) : [])
    }

    const onFinish = (values) => {
        console.log('Received values:', { ...values });
    };

    return(
        <div className="">
            <div className="">
                <div>
                    <Form
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

                    {/* <Form.Item
                        name="dob"
                        label="Date of Birth"
                        rules={[{ required: true, message: 'Please select the date of birth!' }]}
                    >
                        <DatePicker onChange={onDobChange} />
                    </Form.Item> */}

                    {/* <Form.Item label="Age">
                        <Input value={age} readOnly />
                    </Form.Item> */}

                    <Form.Item
                        name="appointmentdate"
                        label="Appointment Date"
                        rules={[{ required: true, message: 'Please select the appointment date!' }]}
                    >
                        <DatePicker  onChange={handleDateChange} />
                    </Form.Item>
                    <Form.Item
                        name="doctorname"
                        label="Doctor Name"
                        rules={[{ required: true, message: 'Please input the doctor name!' }]}
                    >
                        <Select placeholder="Select Doctor Name" onChange={doctorchange}>
                            {filteredDoctors.map(doctor =>(
                                <Option key={doctor._id} value={doctor.name}>{doctor.name}</Option>
                            ))}

                        </Select>
                    </Form.Item>
                    <Form.Item 
                        name="appointmentday"
                        label="Day"
                        rules={[{required:true,message:'Select Your Day To Visit'}]}
                    >
                        <Select placeholder="Select Day to be Visit" >
                            {day.map((day,index)=>(
                                <Option key={index} value={day}>{day}</Option>
                            ))}
                        </Select>

                    </Form.Item>
                    <Form.Item
                        name="appointmenttime"
                        label="Appointment Time"
                        rules={[{ required: true, message: 'Please select the appointment time!' }]}
                    >
                        <Select placeholder="Select Appointment Time">
                            {time.map((time,index)=>(
                                <Option key={index} value={time}>{time}</Option>
                            ))}
                        </Select>
                        
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