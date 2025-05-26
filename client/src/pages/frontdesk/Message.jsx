import React,{useState,useEffect} from "react"
import axiosInstance from "../../apicalls"
import './Message.css'
import {
 MessageOutlined,UserOutlined,MailOutlined,PhoneOutlined
} from '@ant-design/icons';
export const Message = () => {
  
    const [messages,setMessages] =useState([])

    useEffect(()=>{
        getmessage()
    },[])
    const getmessage =async()=>{
        try {
            const response = await axiosInstance.get('/contact-us/message/view/all/message')
            console.log(response.data.data)
            setMessages(response.data.data)
        } catch (error) {
            
        }
    }
    return(
        <div className="message">
            <div className="container">
                <h1 className="heading">Messages</h1>
                <div className="message-list">
                    {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className="message-card"
                        style={{ animationDelay: `${idx * 0.15}s` }}
                    >
                        <div className="message-header">
                            <div className="name"> <UserOutlined /> - {msg.name}</div>
                            <div className="email"> <MailOutlined /> - {msg.email}</div>
                            <div className="contact"> <PhoneOutlined /> - {msg.contact}</div>
                        </div>
                        
                        <div className="message-text"> <MessageOutlined />  - 
                            - {msg.message && msg.message.length > 0 ? (
                                msg.message
                            ) : (
                                <div style={{color:'green'}}>No message provided.</div>
                            )}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
    
