import React from 'react';
import { Layout, Menu } from 'antd'; // Assuming you're using Ant Design for UI components
import { Link } from 'react-router-dom';

const { Sider, Content } = Layout;

export const PatientProfile =()=>{
    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="1">
                    <Link to="/patient/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/patient/appointments">Appointments</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/patient/medical-history">Medical History</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/patient/settings">Settings</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: '#fff',
                }}
            >
                <h1>Patient Profile</h1>
                {/* Add more profile details here */}
                <p>Here you can view and edit your profile information.</p>
            </Content>
        </Layout>
    </Layout>
    )
}