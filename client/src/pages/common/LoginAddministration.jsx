import React,{ useState }  from 'react'
import {Form,Input,Button, message,Select} from 'antd';
import  axiosInstance  from '../../apicalls/index'
const { Option } = Select;

export const LoginAddministration = () => {
    const [role, setRole] = useState('admin'); 

       const endpoints ={
                admin: '/admin/login',
                doctor:'/employee/login',
                labtech:'/employee/login'
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
        <div className="form-container  flex justify-center mt-1 ">
            <div className="form">
                <div className="form-heading">
                    <h2 className='text-center'>Login</h2>
                </div>
                <div className="form-element w-3">
                    <Form layout='vertical' name='login' onFinish={onfinish}>
                         <Form.Item label="Selet Your Role" name="role">
                                <Select defaultValue={role} onChange={setRole}>
                                    <Option value="admin">Admin</Option>
                                     <Option value="doctor">Doctor</Option>
                                    <Option value="labtech">Lab-Technician</Option>
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
            </div>
        </div>
    </div>
  )
}
