import React, { useState } from "react"

import { Button, Form, Input, Radio,DatePicker  } from 'antd';


export const Registration =()=>{
    const [form] = Form.useForm();
    const underlined = 'underlined'
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      };
    return (
        <div className="container">
            <div>

            </div>
        
            <div>
                <Form
                {...formItemLayout}
                form={form}
                variant={underlined}
                style={{ maxWidth: 800 }}
            >
            
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter Name!' }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Email Id" name="email" rules={[{ required: true, message: 'Please enter Email Id!' }, { type: 'email', message: 'Enter Vaild Email Id' }]}>
                <Input />
                </Form.Item>
                <Form.Item label="Contact No" name="phone" rules={[{ required: true, message: 'Please enter valid Contact No!' },{ pattern: /^[0-9]{10}$/,message: 'Contact No must be 10 digits!'}]}>
                <Input />
                </Form.Item>
                <Form.Item label="Gender">
                <Radio.Group>
                    <Radio value="male"> Male </Radio>
                    <Radio value="female"> Female </Radio>
                    <Radio value="other"> Other </Radio>
                </Radio.Group>
                </Form.Item>
                <Form.Item
                        label="DatePicker"
                        name="DatePicker"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
                </Form>
            </div>
      </div>
    )
}