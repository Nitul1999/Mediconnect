import React,{ useEffect, useState }  from 'react'
import  axiosInstance  from '../../apicalls/index'
import {message} from 'antd'

export const Doctores = () => {
   
  const [doctores, setDoctores] = useState([]);


  useEffect(()=>{ 
    fetchDoctors();
  },[])

  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get('/employee/all/doctor');
      if (response.data.success) {
        message.success(response.data.message)
      }
      setDoctores(response.data.data);
    } catch (error) {
     message.error("Failed to fetch Doctors.");
    } 
  };
  

  return (
    <div>
       <h1>Doctors</h1>
      {doctores.length > 0 ? (
        <ul>
          {doctores.map((doctor) => (
            <li key={doctor._id}>
              <h2>{doctor.name}</h2>
              <p>Email: {doctor.email}</p>
              <p>Phone: {doctor.phone}</p>
              <p>Specialization: {doctor.specialization}</p>
              <p>Hospital: {doctor.hospitalName}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  )
}

