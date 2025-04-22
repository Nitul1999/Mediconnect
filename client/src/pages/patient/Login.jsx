import React from 'react'
import { Link,useNavigate  } from "react-router-dom";
import {Form,Input,Button, message} from 'antd';
import  axiosInstance  from '../../apicalls/index'

export const Login = () => {
    const navigate = useNavigate()

    const onfinish= async(values) =>{
        console.log(values)
        try {
        const response = await axiosInstance.post("/person/login",values) 
            if(response.data.success){
                message.success(response.data.message)
                localStorage.setItem('token', response.data.data)
                navigate('/')
                window.location.reload()
                }else{
                    message.error(response.data.message)      
                }
            } catch (error) {
                message.error(error.response?.data?.message || "Something went wrong!");
            }      
    }
 
  return (
    <div>
        <div className="flex justify-center item-center">
            <div className="form">
                <div className="form-heading">
                    <h2 className='text-center'>Login</h2>
                </div>
                <div className="form-element w-3 ">
                    <Form layout='vertical' name='login' onFinish={onfinish}>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please Enter Your Email" }]}>
                                <Input type="email" placeholder="Enter your Email" />
                            </Form.Item>
                             <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please Enter Your Password" }]}>
                                <Input type="password" placeholder="Enter your Password" />
                            </Form.Item>
                            <Form.Item  className='flex justify-center' >
                                <Button type='primary'htmlType="submit"  >
                                    Login
                                </Button>
                            </Form.Item>

                            <p className='text-center text-md '>Don't have an Account ? <Link to="/signup" className='log-sign'>Sign Up</Link></p>
                            

                    </Form>
                </div>
            </div>
        </div>
    </div>
  )
}
