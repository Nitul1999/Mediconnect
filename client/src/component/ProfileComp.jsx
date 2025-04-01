import React,{ useState }  from 'react'
import { useNavigate } from "react-router-dom";
import  axiosInstance  from '../apicalls/index'
import { EditOutlined, EllipsisOutlined,LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { List, Card,Typography,Drawer,Space, Button,Col,Row, Form,Input, message } from "antd";
const { Title, Text } = Typography;


 const ProfileComp = ({data}) => {
      const [open, setOpen] = useState(false);
      const [form] = Form.useForm();
      const navigate = useNavigate()
      const showDrawer = () => {
                                  form.setFieldsValue(data);
                                  setOpen(true);
      };
      const onClose = () => {
                              setOpen(false);
      };
      const userrole = data.emptype
      const endpoint ={
            admin:`/admin/profile/update/${data._id}`,
            doctor:`/employee/profile/update/${data._id}`,
            labtech:`/employee/profile/update/${data._id}`
      }
      const onFinish = async(values)=>{
        console.log(values)
              try {
                const token = localStorage.getItem('token')
                if(!token){
                  message.error('You are not logged in')
                }
              
                if (!endpoint[userrole]) {
                    message.error('Invalid endpoint');
                    return; 
                }
                const response = await axiosInstance.patch(endpoint[userrole],values)
                if(response.data.success){
                    message.success(response.data.message)
                    window.location.reload()

                }else{
                    message.error(response.data.message)       
                }

              } catch (error) {
                message.error(error.response?.data?.message || "Something went wrong!");
              }
      }

      const logout = async(e)=>{
        localStorage.removeItem('token') // remove the token 
        navigate('/') // go to home page 
        window.location.reload() // reload the page
      }
      
  return (
    <div className=''>
      <div className=''>
       <Card 
          style={{ width: '30rem' }}
          actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" onClick={showDrawer} />,
          // <EllipsisOutlined key="ellipsis" />,
          <LogoutOutlined key="logout" onClick={logout} />
        ]} >
            <Title level={2}>Profile</Title>
            <div className='p1' style={{width:'100%'}}>
                <Text className='p1' strong> Name:</Text>  {data.name}
                <Text className='p1'strong>Email:</Text> {data.email} <br />
                <Text className='p1' strong>Phone:</Text> {data.phone}
                <Text className='p1' strong>Address:</Text> {data.address}<br />            
                <Text className='p1' strong>Hospital Name:</Text> {data.hospitalName}
                <Text className='p1' strong>Employee Type:</Text> {data.emptype}<br />
            </div>
            <div className='p1'>
              {(data.emptype ==='doctor' || data.emptype==='labtech') &&(
                <>
                    <Text className='p1'  strong>Registration No:</Text> {data.registrationNo}<br />
                    <Text className='p1' strong>Specialization:</Text> {data.specialization}<br />
                    <Title level={4}>Timetable</Title>
                    {data.timetable.length > 0 ? (
                        <List
                            bordered
                            dataSource={data.timetable}
                            renderItem={slot => (
                                <List.Item>
                                    {slot.day}: {slot.timing}
                                </List.Item>
                            )}
                        />
                    ) : (
                        <Text>No timetable available.</Text>
                    )}
                </>)}
            </div>
        </Card>  
      </div>
          <Drawer
              title="Update Details"
              width={520}
              onClose={onClose}
              open={open}
              styles={{
                body: {
                  paddingBottom: 80,
                },
              }}
                extra={
                  <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={form.submit} type="primary">
                     Update
                    </Button>
                  </Space>
                }
              >
            <Form form={form}  layout="vertical" initialValues={data} onFinish={onFinish}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Name"
                    >
                      <Input placeholder="Please enter user name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      
                    >
                      <Input
                        style={{ width: '100%' }}
                        placeholder="Please enter email"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="phone"
                      label="Phone Number"
                      rules={[{ pattern: /^[0-9]{10}$/, message: "Please enter a valid phone number" }]}
                    >
                      <Input placeholder="Please enter Phone No" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="address"
                      label="Address"                      
                    >
                      <Input
                        placeholder="Please enter Address"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="hospitalName"
                      label="Hostpital Name"
                    >
                      <Input placeholder="Please enter Hostpital Name" />
                    </Form.Item>
                  </Col>
                </Row>
            {(data.emptype==='doctor'|| data.emptype==='labtech')&&(
              <>
               <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="registrationNo"
                      label="Registration No"
                    >
                      <Input placeholder="Please enter Registration No" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="specialization"
                      label="Specialization"
                      
                    >
                      <Input
                        placeholder="Please enter Specialization"
                      />
                    </Form.Item>
                  </Col>
                </Row>

              </>
            )}
               
            </Form>
            
          </Drawer>
    </div>
  )
}


export default ProfileComp;