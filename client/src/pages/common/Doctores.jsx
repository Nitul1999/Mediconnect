import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Row,
  Spin,
  message,
  Typography,
  Divider,
  Input,
  Select
} from 'antd';
import  axiosInstance  from '../../apicalls/index'

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

export const Doctores = () => {
   
  const [doctors, setDoctores] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

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
      setFilteredDoctors(response.data.data);
      setTimeout(() => {
      setLoading(false);
    }, 3000);
    } catch (error) {
     message.error("Failed to fetch Doctors.");
    }finally {
    setLoading(false); // ✅ Ensure loading is turned off
  }
  };
  useEffect(() => {
  filterDoctors(searchValue, selectedSpecialization);
}, [searchValue, selectedSpecialization]);


   const handleSearch = (value) => {
    setSearchValue(value);
    filterDoctors(value, selectedSpecialization);
  };

  const handleSpecializationChange = (value) => {
    setSelectedSpecialization(value);
    filterDoctors(searchValue, value);
  };

  const filterDoctors = (search, specialization) => {
    let result = [...doctors];

    if (specialization) {
      result = result.filter((doc) => doc.specialization.toLowerCase() === specialization.toLowerCase());
    }

    if (search) {
      result = result.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredDoctors(result);
  };

  const specializationOptions = [...new Set(doctors.map((doc) => doc.specialization))];

  if (loading) return <Spin fullscreen />;
  

  return (
    <div className=' flex justify-center'>
        <div className='p3 width-90'>
          <Title level={2} style={{ marginBottom: '20px',textAlign:'center' }}>Doctor List</Title>
          <Divider style={{ margin: '10px' }} />
          <Row gutter={[16, 16]} style={{ margin: '20px' }}>
            <Col xs={24} sm={16}>
              <Search
                placeholder="Search by name"
                allowClear
                enterButton="Search"
                value={searchValue}
                onSearch={handleSearch}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Col>
            <Col xs={16} sm={8}>
              <Select
                placeholder="Filter by specialization"
                style={{ width: '100%' }}
                allowClear
                value={selectedSpecialization || undefined}
                onChange={handleSpecializationChange}
              >
                <Option value="">Show All</Option>
                {specializationOptions.map((spec, index) => (
                  <Option key={index} value={spec}>
                    {spec}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <div className='flex flex-wrap flex-row gap-2 item-center justify-center '>
          
            {filteredDoctors.map((doctor) => (
             
              
                <Card className='hover-items'
                 title={
                 <div style={{ textAlign: 'center' }}>
                   {doctor.name.toUpperCase()}
                 </div>}
                
                  bordered
                  hoverable
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    height: '100%',
                    width:'340px'
                  }}
                >                
                    <Text> <strong>Email</strong>:  {doctor.email}</Text>  <br />             
                    <Text><strong> Specialization</strong>: {doctor.specialization}</Text>
                
                  <Divider style={{ margin: '10px 0' }} />

                  <Text strong>Timetable:</Text>
                  <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                    {doctor.timetable.slice(0, 2).map((slot) => (
                      <li key={slot._id}>
                        {slot.day}: {slot.timing}
                      </li>
                    ))}
                    {doctor.timetable.length > 2 && <li>+ more</li>}
                  </ul>
                </Card>             
            ))}
         
          </div>
        </div>
    </div>
  );
}

