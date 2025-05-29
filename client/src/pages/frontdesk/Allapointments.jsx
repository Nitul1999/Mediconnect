import React,{useState,useEffect} from "react"
import axiosInstance from "../../apicalls";

export const Allapointments = () => {

    const [appointments, setAppointments] = useState([]);
  

    const FetchallAppointment= async()=>{
        try {
            const response = await axiosInstance.get('/person/viewallappointments')
            setAppointments(response.data)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        FetchallAppointment();
    }, []);
    console.log(appointments)

    return(
        <>
            <h1>View All Appointment</h1>
        </>
    )
}