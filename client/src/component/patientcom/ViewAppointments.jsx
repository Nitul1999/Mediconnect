import React,{ useState,useEffect }from 'react';
import  axiosInstance  from '../../apicalls/index'
import { Table,Typography, Empty,Alert, Spin,Button,message,Modal,Card, Col, Row,Divider,Drawer,Form,Input,Select,DatePicker  } from "antd";
const { Title } = Typography;
import { PhoneOutlined,ReconciliationOutlined,SunOutlined,DownloadOutlined,UsergroupDeleteOutlined,CalendarOutlined,ClockCircleOutlined,QuestionOutlined,WarningOutlined,ForkOutlined,SmileOutlined,DeleteOutlined } from '@ant-design/icons'; 
// import jsPDF from "jspdf"; // Ensure jsPDF is imported


export const ViewAppointments =({appointments,userid,refresh})=>{

    const [open, setOpen] = useState(false);
    const [edrawer,setEdrawer] = useState(false)
    const [loading, setLoading] = useState(true);
    const [selectappointment, setSelectedAppointment] = useState({});
    const appointmentList = appointments || [];
    const [doctor,setDoctor] = useState([]);
    const [selectDoc,setSelectDoc] = useState(null);
    const [ time,setTime] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableDates, setAvailableDates] = useState([]);
    const [specialization, setSpecialization] = useState('');

    const handleDelete=async(record)=>{
          try {
            const response = await axiosInstance.patch(`/person/appointmnet/${userid}/delete/${record._id}`)
            if(response.data.success){
              message.success(response.data.message);
              refresh()
            }
            
          } catch (error) {
          }      
    }
    //view appointment details
    const handleView =async(record)=>{
      console.log(record)
      setSelectedAppointment(record)
      showLoading()
    }
    const showLoading = () => {
      setOpen(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    //edit appointment details
    const handleEdit=async(record)=>{
      setSelectedAppointment(record)
      showDrawer()
    }
    const showDrawer=()=>{
      setEdrawer(true);
    }
    const onClose = () => {
       setEdrawer(false);
    };
    //   const handleDownload=async(record)=>{
    //     const doc = new jsPDF();
    //     // Create a container div for HTML content
    //     const container = document.createElement('div');
    //     container.style.width = '600px';  // control width for formatting
    //     // Build HTML content: Hospital header + appointment details in table
    //     container.innerHTML = `
    //       <div style="text-align:center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom:20px;">
    //         <h1 style="margin:0; font-family: Arial, sans-serif; color: #00529B;">My Hospital Name</h1>
    //         <p style="margin:0; font-family: Arial, sans-serif; font-size: 14px; color: #333;">123 Health Street, Medic City</p>
    //         <p style="margin:0; font-family: Arial, sans-serif; font-size: 12px; color: #666;">Phone: (123) 456-7890 | Email: info@myhospital.com</p>
    //       </div>
    //        <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
    //     <tbody>
    //       <tr>
    //         <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Patient Name</th>
    //         <td style="border: 1px solid #ddd; padding: 8px;">${record.patientname || 'N/A'}</td>
    //       </tr>
    //       <tr>
    //         <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Gender</th>
    //         <td style="border: 1px solid #ddd; padding: 8px;">${record.gender || 'N/A'}</td>
    //       </tr>
    //       <tr>
    //         <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Contact</th>
    //         <td style="border: 1px solid #ddd; padding: 8px;">${record.contact ? record.contact.toString() : 'N/A'}</td>
    //       </tr>
    //       <tr>
    //         <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Appointment Date</th>
    //         <td style="border: 1px solid #ddd; padding: 8px;">${record.appointmentdate ? new Date(record.appointmentdate).toLocaleDateString() : 'N/A'}</td>
    //       </tr>
    //       <tr>
    //         <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Appointment Day</th>
    //         <td style="border: 1px solid #ddd; padding: 8px;">${record.appointmentday || 'N/A'}</td>
    //       </tr>
    //       <tr>
    //         <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Appointment Time</th>
    //          <td style="border: 1px solid #ddd; padding: 8px;">${record.appointmenttime || 'N/A'}</td>
    //       </tr>
    //       <tr>
    //         <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Doctor Name</th>
    //         <td style="border: 1px solid #ddd; padding: 8px;">${record.doctorname || 'N/A'}</td>
    //       </tr>
    //       <tr>
    //         <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Reason</th>
    //         <td style="border: 1px solid #ddd; padding: 8px;">${record.reason || 'N/A'}</td>
    //       </tr>
    //       <tr>
    //         <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Symptoms</th>
    //         <td style="border: 1px solid #ddd; padding: 8px;">${record.symptoms || 'N/A'}</td>
    //       </tr>
    //     </tbody>
    //   </table>
    // `;
    // document.body.appendChild(container);
    // // Convert HTML to PDF (async)
    // await doc.html(container, {
    //   callback: function (doc) {
    //     doc.save(`${record.patientname || "appointment"}_details.pdf`);
    //     document.body.removeChild(container);
    //   },
    //   x: 10,
    //   y: 10,
    //   width: 180, // allow some padding for margins
    // });
    //   }
    useEffect(()=>{
      fetchdoctors()
    },[])
    
    const fetchdoctors = async()=>{
      try {
          const response = await axiosInstance.get('/employee/all/doctor');
          
          setDoctor(response.data.data);
        } catch (error) {
         message.error("Failed to fetch Doctors.");
        } 
      }
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectappointment) {
            form.setFieldsValue({
                patientname: selectappointment.patientname,
                gender: selectappointment.gender,
                // dateofbirth: selectappointment.dob ,
                age:selectappointment.age,
                contact: selectappointment.contact,
                doctorname: selectappointment.doctorname,
                // appointmentdate: selectappointment.appointmentdate,
                appointmenttime: selectappointment.appointmenttime,
                reason: selectappointment.reason,
                symptoms: selectappointment.symptoms,
            });
        }
    }, [selectappointment, form]);

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
    const onFinish=async(values)=>{
      try {
        const response = await axiosInstance.patch(`/appointment/${userid}/update-appointment-details/${record._id}`)
        console.log(userid,record._id)
      } catch (error) {
        
      }
    }

    const columns = [
        {
          title: 'Patient Name',
          dataIndex: 'patientname',
          key: 'patientname',
          responsive: ['md'],
          render: text => text || 'N/A',
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 2 }}>
              <input
                placeholder="Search patient"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={confirm}
                style={{ width: 188, marginBottom: 8, display: 'block',padding:4 }}
              />
              <Button
                type="primary"
                onClick={confirm}
                // icon="🔍"
                size="small"
                style={{ width: 90, marginRight: 8}}
              >
                Search
              </Button>
              <Button onClick={() => {
                        clearFilters();
                        confirm();
                      }} size="small" style={{ width: 80 }}>
                Reset
              </Button>
            </div>
          ),
          filterIcon: (filtered) => (
            <span role="img" aria-label="search" style={{ color: filtered ? '#337aff' : undefined }}>
              🔍
            </span>
          ),
          onFilter: (value, record) =>
            (record.patientname || '').toString().toLowerCase().includes(value.toLowerCase()),
        },
        // {
        //   title: 'Gender',
        //   dataIndex: 'gender',
        //   key: 'gender',
        //   responsive: ['md'],
        //   render: text => text || 'N/A',
        // },
        // {
        //   title: 'Age',
        //   dataIndex: 'age',
        //   key: 'age',
        //   responsive: ['lg'],
        //   render: age => (age ?? 'N/A'),
        // },
        // {
        //   title: 'Contact',
        //   dataIndex: 'contact',
        //   key: 'contact',
        //   responsive: ['lg'],
        //   render: contact => (contact ? contact.toString() : 'N/A'),
        // },
        {
          title: 'Appointment Date',
          dataIndex: 'appointmentdate',
          key: 'appointmentdate',
          sorter: (a, b) => new Date(a.appointmentdate) - new Date(b.appointmentdate),
          defaultSortOrder: 'ascend',
          render: date => (date ? new Date(date).toLocaleDateString() : 'N/A'),
        },
        {
          title: 'Appointment Day',
          dataIndex: 'appointmentday',
          key: 'appointmentday',
          responsive: ['md'],
          render: text => text || 'N/A',
        },
        {
          title: 'Appointment Time',
          dataIndex: 'appointmenttime',
          key: 'appointmenttime',
          responsive: ['sm'],
          render: text => text || 'N/A',
        },
        {
          title: 'Doctor Name',
          dataIndex: 'doctorname',
          key: 'doctorname',
          render: text => text || 'N/A',
        },
        // {
        //   title: 'Reason',
        //   dataIndex: 'reason',
        //   key: 'reason',
        //   responsive: ['lg'],
        //   render: text => text || 'N/A',
        // },
        // {
        //   title: 'Symptoms',
        //   dataIndex: 'symptoms',
        //   key: 'symptoms',
        //   responsive: ['lg'],
        //   render: text => text || 'N/A',
        // },
        {
          title: 'Appointment Action',
          key: 'action',
          render: (_, record) => (
            <div style={{ gap:'2px' }}>
              <Button
                type="link"
                
                onClick={() => handleEdit(record)}
                style={{ marginRight: 2 }}
              >
                Edit
              </Button>
              <Button
                type="link"
              
                onClick={() => handleView(record) }
                style={{ marginRight: 2 }}
              >
                View
              </Button>
              <Button
                type="link"
                
                onClick={() => handleDownload(record)}
                style={{ marginRight: 3}}
              >
              <DownloadOutlined />
              </Button>
              <Button
                type="link"
               
                onClick={() => handleDelete(record)}
                style={{ color: 'red' }}
              >
               <DeleteOutlined />
              </Button>
            </div>
          ),
        },
        {
          title: 'Report',
        }
      ];
     
      if (!appointmentList || appointmentList.length === 0) {
      return <Empty description="No appointments found" style={{ padding: 24 }} />;
    }

    return(
        <>
            <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
                All Appointments
            </Title>
                <Table
                    dataSource={appointmentList}
                    columns={columns}
                    rowKey={record => record._id || record.appointmentcreatedate || Math.random()}
                    pagination={{ pageSize: 6, showSizeChanger: true }}
                    scroll={{ x: 'max-content' }}
                    bordered
                  />

            {/* view appointment details for indivisual patient */}
            <Modal
                  title={<p>Patient Details</p>}
                  footer={
                    <Button type="primary" onClick={showLoading}>
                      Reload
                    </Button>
                  }
                  loading={loading}
                  open={open}
                  onCancel={() => setOpen(false)}
                >
                 {loading ? (
                <Spin />
                  ) : (
                    selectappointment &&(
                      <> 
                          <Card 
                          // title={selectappointment.patientname} 
                            title={selectappointment.patientname ? `${selectappointment.patientname.toUpperCase()}'s Appointment Details` : "Loading..."}
                            variant="borderless">
                            <Row >
                                <Col span={12}>
                                <Divider orientation="left" >Personal Details</Divider>
                                  <div><PhoneOutlined /> - {selectappointment.contact}</div>
                                  <div><UsergroupDeleteOutlined /> - {selectappointment.gender}</div>
                                  <div><CalendarOutlined /> - {new Date(selectappointment.dob).toLocaleDateString()}</div>
                                  <div><SmileOutlined /> - {selectappointment.age}</div>
                                </Col>
                                <Col >
                                <Divider orientation="right"orientationMargin={10}>Appointment Details</Divider>
                                  <div><SunOutlined /> - {selectappointment.appointmentday}</div>
                                  <div><ReconciliationOutlined /> - {new Date(selectappointment.appointmentdate).toLocaleDateString()}</div>
                                  <div><ClockCircleOutlined /> - {selectappointment.appointmenttime}</div>
                                  <div><ForkOutlined /> - {selectappointment.doctorname}</div>
                                  <div><QuestionOutlined />- {selectappointment.reason}</div>
                                  <div><WarningOutlined />- {selectappointment.symptoms}</div>
                                </Col>
                            </Row>
                          </Card>
                           
                        </>
                    )
                  )}
            </Modal>

            {/* edit appointment details form */}
            <Drawer
              title="Update Appointment Details"
              closable={{ 'aria-label': 'Close Button' }}
              placement="left" 
              onClose={onClose}
              open={edrawer}
            >
              <Form
                    form={form}
                    name="appointment_form"
                    onFinish={onFinish}
                    layout="vertical"
                    >
                    <Row  gutter={20}>
                        <Col xs={{span:14}} >
                            <Form.Item
                            name="patientname"
                            label="Patient Name"
                            rules={[{ required: true, message: 'Please input the patient name!' }]}
                        >
                            <Input />
                            </Form.Item>
                        </Col>
                        <Col  xs={{span:8}}>
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
                    <Row gutter={20}>
                        <Col xs={{ span: 10 }}>
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
                        <Col xs={{ span: 6}}>
                            <Form.Item
                                name="age"
                                label="Age"
                            >
                                <Input readOnly/>

                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="contact"
                        label="Contact number"
                        rules={[{ required: true, message: "Please enter your phone number" },{ pattern: /^[0-9]{10}$/, message: "Please enter a valid phone number" }]}
                        >
                            <Input/>

                    </Form.Item>
                 
                    <Row gutter={20}>
                        <Col xs={{ span: 10 }}>
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
                        <Col >
                            <div className='p-left m1'>
                                {selectDoc && 
                                    <Alert
                                    // message="Specialization in :"
                                    description={` ${selectDoc.specialization}`}
                                    type="info"
                                    // showIcon
                                    />
                                }
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={26}>
                        <Col xs={{ span: 11 }}>
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
                        <Col xs={{ span: 11 }}>
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
            </Drawer>

        </>
    )
}