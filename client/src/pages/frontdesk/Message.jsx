import React,{useState,useEffect} from "react"
import axiosInstance from "../../apicalls"
export const Message = () => {
  
    const [messages,setMessages] =useState([])

    useEffect(()=>{
        getmessage()
    },[])
    const getmessage =async()=>{
        try {
            const response = await axiosInstance.get('/contact-us/message/view/all/message')
            console.log(response.data.data)
        } catch (error) {
            
        }
    }
    return(
        <><h1>message shows here</h1></>
    )
}
    
