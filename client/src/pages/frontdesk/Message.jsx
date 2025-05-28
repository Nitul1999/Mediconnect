import React,{useState,useEffect} from "react"
import axiosInstance from "../../apicalls"
import './Message.css'
import {
 MessageOutlined,UserOutlined,MailOutlined,PhoneOutlined
} from '@ant-design/icons';
import { Pagination,Input } from 'antd';
const { Search } = Input
export const Message = () => {
  
    const [messages,setMessages] =useState([])
    const [searchText, setSearchText] = useState('');
    const [filteredMessages, setFilteredMessages] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 5;

    useEffect(()=>{
        getmessage()
    },[])

     useEffect(() => {
    // Filter messages by name (case insensitive)
        const filtered = messages.filter(msg =>
        msg.name?.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredMessages(filtered);
        setCurrentPage(1); // Reset to first page on search
    }, [searchText, messages]);

    const getmessage =async()=>{
        try {
            const response = await axiosInstance.get('/contact-us/message/view/all/message')
            console.log(response.data.data)
            setMessages(response.data.data)
        } catch (error) {
            
        }
    }
    // Calculate the current messages to display
    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
    // Calculate total pages
    const totalPages = Math.ceil(messages.length / messagesPerPage);
    
    // Calculate total messages
     const totalMessages = messages.length;
    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const onSearch=(value)=>{
         setSearchText(value);
    }
    return(
        <div className="message">
            <div className="container">
                <h1 className="heading">Messages</h1>
                <Search
                    placeholder="Search by name"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    style={{ maxWidth: 400, marginBottom: 20 }}
                />
                <div className="message-list">
                    {currentMessages.map((msg, idx) => (
                    <div
                        key={idx || msg._id}
                        className="message-card"
                        style={{ animationDelay: `${idx * 0.15}s` }}
                    >
                        <div className="message-header">
                            <div className="name"> <UserOutlined /> - {msg.name}</div>
                            <div className="flex justify-spacebtn m1">
                                <div className="email"> <MailOutlined /> - {msg.email}</div>
                                <div className="contact"> <PhoneOutlined /> - {msg.contact}</div>
                            </div>                           
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
                     {currentMessages.length === 0 && (
                        <div style={{ textAlign: 'center', color: '#ccc', marginTop: 20 }}>
                        No messages found.
                        </div>
                    )}
                </div>
                 {/* Pagination Controls */}
                <div className="pagination">
                 {totalMessages > messagesPerPage && (
                    <div className="pagination" style={{ textAlign: 'center', marginTop: 20 }}>
                        <Pagination
                        current={currentPage}
                        pageSize={messagesPerPage}
                        total={totalMessages}
                        onChange={handlePageChange} 
                        showSizeChanger={false}
                        />
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
    
