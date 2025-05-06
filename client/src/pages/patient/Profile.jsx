import React, { useEffect, useState } from "react"; 
import { Layout, Menu,Spin, Card, Button, Typography, Tabs } from 'antd'; // Assuming you're using Ant Design for UI components
import { Link } from 'react-router-dom';
import  axiosInstance  from '../../apicalls/index'
import { jwtDecode } from "jwt-decode"
import { UserOutlined } from '@ant-design/icons';
import { BookDoctorAppointment } from "../../component/patientcom/BookDoctorAppointment";
import { PreviousPrescriptions } from "../../component/patientcom/PreviousPrescriptions";
import { ViewAppointments } from "../../component/patientcom/ViewAppointments";



const { Sider, Content } = Layout;

export const PatientProfile =()=>{

    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("1");
    const [sidebarVisible, setSidebarVisible] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const token = localStorage.getItem('token');
            if(!token){
                message.error('You are not logged in');
            }
            const decodetoken  = jwtDecode(token);
            const userid = decodetoken.userid; 
            
            const data  = await axiosInstance.get(`/person/person/${userid}`);
            setProfileData(data.data);
          } catch (error) {
            console.error("Error fetching profile:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchProfile();
      }, []);
    
      const handleLogout=()=>{

      }
      const handleTabChange = (key) => {
        setActiveTab(key);
      };
      const toggleSidebar = () => {
        setSidebarVisible(prev => !prev); // Toggle sidebar visibility
    };

    return (
        <Layout  style={{ minHeight: "100vh" }}>
            
                <Sider
                    className='user-profile-sider'
                    // width={sidebarVisible ? 270 : 0}
                    collapsed={!sidebarVisible}
                    collapsedWidth={0}
                    width={270}
                    style={{ background: "#fff",  padding: sidebarVisible ? 20 : 0, borderRight: "1px solid #f0f0f0", overflow: 'hidden',transition: 'all 0.3s ease', }}
                >
                    { profileData && (
                        <Card
                            title="Profile"
                            extra={<Button danger onClick={handleLogout}>Logout</Button>}
                            variant="UserOutlined"
                        >
                            <p><strong>Name:</strong> {profileData.name}</p>
                            <p><strong>Conatct No:</strong> {profileData.phone ? profileData.phone.toString() : 'N/A'}</p>
                            <p><strong>Email:</strong> {profileData.email ||'N/A'}</p>
                            <p><strong>DOB:</strong> {new Date(profileData.dateofbirth).toLocaleDateString()}</p>
                            <p><strong>Gender:</strong> {profileData.gender || 'N/A'}</p>
                            <p><strong>City:</strong> {profileData.city||'N/A'}</p>
                            <div>
                                <Button>View More</Button>
                                <Button>Update</Button>
                            </div>       
                        </Card>                    
                    )}
                </Sider>
          
            <Layout style={{ padding: "24px", background: "#f9f9f9" }}>
                    <Button className="toggle-sidebar-button" onClick={toggleSidebar} style={{ marginBottom: '16px' }}>
                        {sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
                    </Button>
                <Content style={{ padding: "24px", background: "#f9f9f9", borderBottom:"2px solid black", flex: 2 }}>
                    <Tabs
                        activeKey={activeTab}
                        onChange={handleTabChange}
                        items={[
                        {
                            label: "View Appointments",
                            key: "1",
                            children: <ViewAppointments />,
                        },
                        {
                            label: "View Previous Prescriptions",
                            key: "2",
                            children: <PreviousPrescriptions />,
                        },
                        {
                            label: "Book Doctor Appointment",
                            key: "3",
                            children: <BookDoctorAppointment shouldFetch={activeTab === "3"} />,
                        },
                        ]}
                    />
                </Content>
            </Layout>
        </Layout>
      
    )
}