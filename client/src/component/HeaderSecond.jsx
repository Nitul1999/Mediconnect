import React,{ useState } from 'react'
import{ Input, Drawer,Space,Select,Form,Button,message  }from"antd";

//from login admi
import  axiosInstance  from '../apicalls/index'
const { Option } = Select;


export const HeaderSecond = () => {
    const [open, setOpen] = useState(false);

     const [role, setRole] = useState('admin');  //from login admin

      const showDrawer = () => {
        setOpen(true);
      };
      const onClose = () => {
        setOpen(false);
      };
     const endpoints ={
                admin: '/admin/login',
                employee:'/employee/login'
            }
    const onfinish= async(values) =>{
            try {
                 const endpoint = endpoints[role];
                 const response = await axiosInstance.post(endpoint,values) 
        
                if(response.data.success){
                message.success(response.data.message)
                localStorage.setItem('token', response.data.data)
                window.location.href = "/"
                }else{
                    message.error(response.data.message) 
                    window.location.href ='/login'            
                }
            } catch (error) {
                message.error(error.response?.data?.message || "Something went wrong!");
            }
        
            
        }

  return (
    <div>
        <div className="opening flex justify-end p1-bottom">
            <div>
              
                <Button type="primary" onClick={showDrawer}>
                  Login For Administrative
                </Button>
                <Drawer
                    title="Login"
                    width={420}
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
                      </Space>
                    }
                    >
                      <div className="form-element">
                        <Form layout='vertical' name='login' onFinish={onfinish}>
                         <Form.Item label="Selet Your Role" name="role">
                                <Select defaultValue={role} onChange={setRole}>
                                    <Option value="admin">Admin</Option>
                                    <Option value='employee'>Employee</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please Enter Your Email" }]}>
                                <Input type="email" placeholder="Enter your Email" />
                            </Form.Item>
                             <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please Enter Your Password" }]}>
                                <Input type="password" placeholder="Enter your Password" />
                            </Form.Item>
                            <Form.Item className='flex justify-center'>
                                <Button type='primary'htmlType="submit" >
                                    Login
                                </Button>
                            </Form.Item>

                         </Form>
                        </div>
                    </Drawer>
            </div>
        </div>
    </div>
  )
}
