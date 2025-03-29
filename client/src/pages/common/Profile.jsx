import React, { useEffect, useState }  from 'react'
import  axiosInstance  from '../../apicalls/index'
import { jwtDecode } from "jwt-decode";
import { message } from "antd";
import Profilecomponent from "../../component/ProfileComp"


export const Profile = () => {

    const [userprofile, setuserprofile]=useState(null);

    useEffect(() => {
        const fetchdata = async()=>{
                try {
                    const token = localStorage.getItem('token'); //get the token from local store which is store when user logged in
                    if(!token){
                        message.error('You are not logged in');
                    }
                    const decodetoken = jwtDecode(token) // decode the token using jwt-decode 
                    const userid = decodetoken.userid;  // extract the useriD from token
                    const userRole = decodetoken.role; // extract the user role from token
                    
                    
                    //creating end point for user role
                    const endpoint ={
                            admin:`/admin/profile/view/${userid}`,
                            doctor:`/employee/profile/view/${userid}`,
                            labtech:`/employee/profile/view/${userid}`
                    }

                     if (!endpoint[userRole]) {
                            message.error('Invalid user role');
                            return; // Exit if the role is not valid
                        }
                    //const response = await axiosInstance.get(`/admin/profile/view/${userid}`)
                    const response = await axiosInstance.get(endpoint[userRole]) // calling the endpoint based on user role
                    setuserprofile(response.data.data)
                    console.log(response.data.data)
                } catch (error) {
                    message.error("Failed to fetch user data");
                }
         }
         fetchdata()
    }, [])

  return (
    <div className='flex justify-center p2'> 
        {userprofile && < Profilecomponent data={userprofile} />}
    </div>
  )
}
