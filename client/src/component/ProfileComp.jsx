import React,{ useState }  from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { List, Card,Typography,Drawer,Space, Button,Col,Row, Form,Input } from "antd";
const { Title, Text } = Typography;

 const ProfileComp = ({data}) => {
      const [open, setOpen] = useState(false);
      const [form] = Form.useForm();
      const showDrawer = () => {
         form.setFieldsValue(data);
        setOpen(true);
      };
      const onClose = () => {
        setOpen(false);
      };
  return (
    <div className=''>
      <div className=''>
       <Card
          style={{ width: '30rem' }}
          actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" onClick={showDrawer} />,
          <EllipsisOutlined key="ellipsis" />,
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
                    <Button onClick={onClose} type="primary">
                     Update
                    </Button>
                  </Space>
                }
              >
            <Form layout="vertical" initialValues={data}>
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
                      name=" registrationNo"
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