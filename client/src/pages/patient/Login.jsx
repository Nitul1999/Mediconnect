import React,{useState} from 'react'
import { Link,useNavigate  } from "react-router-dom";
import {Form,Input,Button,message,Modal} from 'antd';
import  axiosInstance  from '../../apicalls/index'

export const Login = () => {

    const navigate = useNavigate()
    const [openForgetform, setopenForgetform] = useState(false);
    const [verify,setVerify] =useState(false)
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');

    const onfinish= async(values) =>{
        console.log(values)
        try {
        const response = await axiosInstance.post("/person/login",values) 
            if(response.data.success){
                message.success(response.data.message)
                localStorage.setItem('token', response.data.data)
                navigate('/make-appointment')
                window.location.reload()
                }else{
                    message.error(response.data.message)      
                }
            } catch (error) {
                message.error(error.response?.data?.message || "Something went wrong!");
            }      
    }
 
    const handleCancel = () => {
        setopenForgetform(false);
      };
      const showform =()=>{
        setopenForgetform(true);
      }
    const onValuesChange = (_, values) => {
    const { password, cpassword } = values;
        setVerify(password && cpassword && password === cpassword);
    };
    
    const onSubmitFailed=()=>{
    message.error('Invalid credentials')
    }
    
    const sendOTP=async(values)=>{
        try {
            setEmail(values.email)
            const response = await axiosInstance.post("/person/forgot-password/otp-request",values)
            
            message.success(response.data.message);
            setStep(2);          
        } catch (error) {
                message.error(error.response?.data?.message || "Failed to send OTP");
        }
    }

    const onSubmit=async(values)=>{
        console.log(email)
        try {
           const response= await axiosInstance.post("/person/forgot-password/reset-password",
            {email,otp:values.otp,password:values.password})

            message.success(response.data.success ||"Password Reset Successfully..");
            setopenForgetform(false)
            setStep(1)
        } catch (error) {
            message.error(error.response?.data?.message || "OTP verification failed");
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
                            <p className='text-center text-md mouse-pointer' onClick={showform}>Forget Password!</p>
                            <p className='text-center text-md '>Don't have an Account ? <Link to="/signup" className='log-sign'>Sign Up</Link></p>
                            

                    </Form>
                </div>
            </div>
        </div>

        <Modal
          title="Reset Your Password"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={openForgetform}
          onCancel={()=>{ handleCancel(); setStep(1); }}
          footer={null}
        >
          {step===1 ? (
            <Form onFinish={sendOTP}>
                <Form.Item
                    label="Email" name="email" rules={[{ required: true, message: "Please Enter Your Email" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Send OTP</Button>
                </Form.Item>
            </Form>
          ):(
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 13 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              onFinishFailed={onSubmitFailed}
              autoComplete="off"
              onValuesChange={onValuesChange}
          >

              <Form.Item
               label="OTP" name="otp" rules={[{ required: true, message: "Please Enter Your OTP" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="password"
                rules={[{ required: true, message: 'Enter your new password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Comfirm Password"
                name="cpassword"
                dependencies={['password']}
                rules={[{ required: true, message: 'Please enter your password again!' },
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

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" disabled={!verify}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          )}
           

        </Modal>
    </div>
  )
}
