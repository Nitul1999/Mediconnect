import React, { useEffect, useState } from "react"; 
import { Layout, Menu,Spin, Card, Button, Typography, Tabs, message } from 'antd'; // Assuming you're using Ant Design for UI components
import  axiosInstance  from '../../apicalls/index'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom";
import { BookDoctorAppointment } from "../../component/patientcom/BookDoctorAppointment";
import { PreviousPrescriptions } from "../../component/patientcom/PreviousPrescriptions";
import { ViewAppointments } from "../../component/patientcom/ViewAppointments";

const { Sider, Content } = Layout;

export const PatientProfile =()=>{

    const navigate = useNavigate()
    const [profileData, setProfileData] = useState([]);
    const[appointment,setAppointment] =useState([])
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("1");
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const token = localStorage.getItem('token');
    const decodetoken  = jwtDecode(token);
    const userid = decodetoken.userid;
    useEffect(() => {
        if(!token){
            message.error('You are not logged in');
        }
       
        fetchProfile(userid);
        fetchappointments(userid);
      }, []);
      //profile fetching
      const fetchProfile = async (userid) => {
        try {
          
          const data  = await axiosInstance.get(`/person/person/${userid}`);
          setProfileData(data.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      };
      //appointments fetching
      const fetchappointments =React.useCallback(async(userid)=>{
        try {
            const data = await axiosInstance.get(`/person/view-all/appointment/${userid}`)
            if( data.data.success){
                setAppointment(data.data.appointments)
            }           
        } catch (error) {
            
        }
      },[userid])
    
      const handleLogout=()=>{
        localStorage.removeItem('token') // remove the token 
        navigate('/') // go to home page 
        window.location.reload() // reload the page
      }

      const handleTabChange = (key) => {
        setActiveTab(key);
      };
      const toggleSidebar = () => {
        setSidebarVisible(prev => !prev); // Toggle sidebar visibility
    };

    return (
        <Layout className="profile-d" style={{ minHeight: "100vh" }}>           
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
                <Content style={{ padding: "2px", background: "#f9f9f9", flex: 2 }}>
                    <Tabs
                        activeKey={activeTab}
                        onChange={handleTabChange}
                        items={[
                        {
                            label: "View Appointments",
                            key: "1",
                            children: <ViewAppointments appointments={appointment} userid={userid} refresh={fetchappointments}  />,
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