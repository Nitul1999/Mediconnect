
import { Table,Typography, Empty, Spin } from "antd";
const { Title } = Typography;

export const ViewAppointments =({appointmentList })=>{
    
    // const appointmentList = Array.isArray(appointments) ? appointments : [];
   
    const columns = [
        {
          title: 'Patient Name',
          dataIndex: 'patientname',
          key: 'patientname',
          responsive: ['md'],
          render: text => text || 'N/A',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
          responsive: ['md'],
          render: text => text || 'N/A',
        },
        {
          title: 'Date of Birth',
          dataIndex: 'dob',
          key: 'dob',
          responsive: ['lg'],
          render: dob => (dob ? new Date(dob).toLocaleDateString() : 'N/A'),
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          responsive: ['lg'],
          render: age => (age ?? 'N/A'),
        },
        {
          title: 'Contact',
          dataIndex: 'contact',
          key: 'contact',
          responsive: ['lg'],
          render: contact => (contact ? contact.toString() : 'N/A'),
        },
        {
          title: 'Appointment Date',
          dataIndex: 'appointmentdate',
          key: 'appointmentdate',
          sorter: (a, b) => new Date(a.appointmentdate) - new Date(b.appointmentdate),
          defaultSortOrder: 'ascend',
          render: date => (date ? new Date(date).toLocaleDateString() : 'N/A'),
        },
        {
          title: 'Appointment Day',
          dataIndex: 'appointmentday',
          key: 'appointmentday',
          responsive: ['md'],
          render: text => text || 'N/A',
        },
        {
          title: 'Appointment Time',
          dataIndex: 'appointmenttime',
          key: 'appointmenttime',
          responsive: ['sm'],
          render: text => text || 'N/A',
        },
        {
          title: 'Doctor Name',
          dataIndex: 'doctorname',
          key: 'doctorname',
          render: text => text || 'N/A',
        },
        {
          title: 'Reason',
          dataIndex: 'reason',
          key: 'reason',
          responsive: ['lg'],
          render: text => text || 'N/A',
        },
        {
          title: 'Symptoms',
          dataIndex: 'symptoms',
          key: 'symptoms',
          responsive: ['lg'],
          render: text => text || 'N/A',
        },
      ];
    
      if (!appointmentList) {
        return <Empty description="No appointments found" style={{ padding: 24 }} />;
      }
    return(
        <>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
                View All Appointment Tab
            </Title>
                <Table
                    dataSource={appointmentList}
                    columns={columns}
                    rowKey={record => record._id || record.appointmentcreatedate || Math.random()}
                    pagination={{ pageSize: 6, showSizeChanger: true }}
                    scroll={{ x: 'max-content' }}
                    bordered
                />
        </>
    )
}