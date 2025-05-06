import React, { useEffect, useState } from "react"; 
import { Layout, Menu,Spin, Card, Button, Typography, Tabs } from 'antd'; // Assuming you're using Ant Design for UI components
import { Link } from 'react-router-dom';
import  axiosInstance  from '../../apicalls/index'
import { jwtDecode } from "jwt-decode"
import { UserOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

export const PatientProfile =()=>{

    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("1");

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

    return (
       <>
        <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width="20%"
        style={{ background: "#fff", padding: 20, borderRight: "1px solid #f0f0f0" }}
      >
        {profileData && (
          <Card
            title="Profile"
            extra={<Button danger onClick={handleLogout}>Logout</Button>}
             variant="outlined"
          >
            <p><strong>Name:</strong> {profileData.name}</p>
            <p><strong>Conatct No:</strong> {profileData.phone ? profileData.phone.toString() : 'N/A'}</p>
            <p><strong>Email:</strong> {profileData.email ||'N/A'}</p>
            <p><strong>DOB:</strong> {new Date(profileData.dateofbirth).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {profileData.gender || 'N/A'}</p>
            <p><strong>City:</strong> {profileData.city||'N/A'}</p>
            <div>
                <Button>View More</Button>
                <Button>Update </Button>
            </div>       
          </Card>
        )}
      </Sider>

      <Layout style={{ padding: "24px", background: "#f9f9f9" }}>
        <Content>
          {/* <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            items={[
              {
                label: "Book Doctor Appointment",
                key: "1",
                children: <BookDoctorAppointment />,
              },
              {
                label: "View Previous Prescriptions",
                key: "2",
                children: <PreviousPrescriptions />,
              },
              {
                label: "View Lab Reports",
                key: "3",
                children: <LabReportHistory shouldFetch={activeTab === "3"} />,
              },
            ]}
          /> */}
        </Content>
      </Layout>
    </Layout>
       </>
    )
}