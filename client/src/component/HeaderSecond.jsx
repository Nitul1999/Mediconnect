import React,{ useState } from 'react'
import{ Input, Drawer,Space,Select,Form,Button,message,Modal }from"antd";

//from login admi
import  axiosInstance  from '../apicalls/index'
const { Option } = Select;


export const HeaderSecond = () => {

     const [open, setOpen] = useState(false);
     const [openForgetform, setopenForgetform] = useState(false);
     const [form] =Form.useForm()
     const [verify,setVerify] =useState(false)

     const [role, setRole] = useState('Select Your Role');  //from login admin

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
      const forgetendpoint ={
        admin: '/admin/forget-password',
        employee:'/employee/forget-password'
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
                  message.error(error.response?.data?.message || "Please Select Your Correct Role");
              }
          
              
          }

      //forget password work
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
      const onSubmit =async(values)=>{
        try {
          const endpoint = forgetendpoint[role]
          const response = await axiosInstance.post(endpoint,values)
          if(response.data.success){
                message.success(response.data.message)
                window.location.href = "/signin"
          }else{
            message.error(response.data.message)
          }
          
        } catch (error) {
          message.error(error.response?.data?.message || "Something went wrong!");          
        }

      }
      const onSubmitFailed = async()=>{
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
                            <p className='text-center' onClick={showform}>Forget Password? <span className='text-md change-password'>Change Password</span> </p>

                         </Form>
                      </div>
                </Drawer>
            </div>
        </div>
        <Modal
          title="Reset Your Password"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={openForgetform}
          onCancel={handleCancel}
        >
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
              <Form.Item label="Selet Your Role" name="role">
                    <Select defaultValue={role} onChange={setRole}>
                        {/* <Option> Select Your Role</Option> */}
                        <Option value="admin">Admin</Option>
                        <Option value='employee'>Employee</Option>
                    </Select>
              </Form.Item>

              <Form.Item
               label="Email" name="email" rules={[{ required: true, message: "Please Enter Your Email" }]}
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
                  Submit
                </Button>
              </Form.Item>
          </Form>

        </Modal>

    </div>
  )
}
