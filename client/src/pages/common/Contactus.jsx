import React from 'react';
import  axiosInstance  from '../../apicalls/index'
import '../../stylesheet/threed.css'
import {
  FacebookOutlined,InstagramFilled,XOutlined
} from '@ant-design/icons';
import { Button,  Form, Input,message } from "antd";

export const Contactus = () => {
    const onFinish= async(values)=>{
        try {
            const response = await axiosInstance.post('contact-us/message/post-message',values)
            if(response.data.success){
                message.success(response.data.message)
            }
        } catch (error) {
            message.error("Try again")
        }
    }
    return(
        <div>
            <div className='flex justify-center ' style={{width:'100%'}}>
                <div className=' flex flex-row  flex-wrap justify-spacebtn m2'>
                    <div className='itmes-center-div'>
                        <div className='items-follow '>
                            <p> Follow us on</p>
                            <ul className=''>
                                <li><FacebookOutlined /></li>
                                <li><InstagramFilled /></li>
                                <li><XOutlined /></li>
                            </ul>
                        </div>
                    </div>
                    <div className='itmes-center-div' >
                    <div>
                        <h2 style={{textAlign:'center',fontFamily:'monospace'}}>Get in Touch with us</h2>
                        <Form className='design-three-d p2'
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 19 }}
                            style={{ maxWidth: 900 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                        
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                >
                                <Input />
                            </Form.Item>
                        
                            <Form.Item
                                label="Contact no"
                                name="contact"
                                rules={[ { required: true, message: 'Please input your phone number!' },
                                        { pattern: /^[0-9]{10}$/, message: 'Phone number must be exactly 10 digits!' }]}
                                >
                                <Input />
                            </Form.Item>
                        
                            <Form.Item
                                label="Message"
                                name="message">
                                <Input.TextArea/>
                            </Form.Item>
                    
                           

                            <Form.Item label={null} >
                                <Button type="primary" htmlType="submit">
                                    Send Message
                                </Button>
                            </Form.Item>
                        </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}