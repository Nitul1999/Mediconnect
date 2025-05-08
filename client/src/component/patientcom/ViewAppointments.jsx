import  axiosInstance  from '../../apicalls/index'
import { Table,Typography, Empty, Spin,Button,message } from "antd";
const { Title } = Typography;
import jsPDF from "jspdf"; // Ensure jsPDF is imported
export const ViewAppointments =({appointments,userid,refresh})=>{

    const appointmentList = appointments || [];
    const handleDelete=async(record)=>{
          try {
            const response = await axiosInstance.patch(`/person/appointmnet/${userid}/delete/${record._id}`)
            if(response.data.success){
              message.success(response.data.message);
              refresh()
            }
            
          } catch (error) {
          }      
      }
    
      const handleDownload=async(record)=>{
        const doc = new jsPDF();
        // Create a container div for HTML content
        const container = document.createElement('div');
        container.style.width = '600px';  // control width for formatting
        // Build HTML content: Hospital header + appointment details in table
        container.innerHTML = `
          <div style="text-align:center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom:20px;">
            <h1 style="margin:0; font-family: Arial, sans-serif; color: #00529B;">My Hospital Name</h1>
            <p style="margin:0; font-family: Arial, sans-serif; font-size: 14px; color: #333;">123 Health Street, Medic City</p>
            <p style="margin:0; font-family: Arial, sans-serif; font-size: 12px; color: #666;">Phone: (123) 456-7890 | Email: info@myhospital.com</p>
          </div>
           <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
        <tbody>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Patient Name</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${record.patientname || 'N/A'}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Gender</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${record.gender || 'N/A'}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Contact</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${record.contact ? record.contact.toString() : 'N/A'}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Appointment Date</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${record.appointmentdate ? new Date(record.appointmentdate).toLocaleDateString() : 'N/A'}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Appointment Day</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${record.appointmentday || 'N/A'}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Appointment Time</th>
             <td style="border: 1px solid #ddd; padding: 8px;">${record.appointmenttime || 'N/A'}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Doctor Name</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${record.doctorname || 'N/A'}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Reason</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${record.reason || 'N/A'}</td>
          </tr>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #337aff; color: white; text-align:left;">Symptoms</th>
            <td style="border: 1px solid #ddd; padding: 8px;">${record.symptoms || 'N/A'}</td>
          </tr>
        </tbody>
      </table>
    `;
    document.body.appendChild(container);
    // Convert HTML to PDF (async)
    await doc.html(container, {
      callback: function (doc) {
        doc.save(`${record.patientname || "appointment"}_details.pdf`);
        document.body.removeChild(container);
      },
      x: 10,
      y: 10,
      width: 180, // allow some padding for margins
    });
      }

    const columns = [
        {
          title: 'Patient Name',
          dataIndex: 'patientname',
          key: 'patientname',
          responsive: ['md'],
          render: text => text || 'N/A',
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 2 }}>
              <input
                placeholder="Search patient"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={confirm}
                style={{ width: 188, marginBottom: 8, display: 'block',padding:4 }}
              />
              <Button
                type="primary"
                onClick={confirm}
                // icon="🔍"
                size="small"
                style={{ width: 90, marginRight: 8 }}
              >
                Search
              </Button>
              <Button onClick={() => {
                        clearFilters();
                        confirm();
                      }} size="small" style={{ width: 80 }}>
                Reset
              </Button>
            </div>
          ),
          filterIcon: (filtered) => (
            <span role="img" aria-label="search" style={{ color: filtered ? '#337aff' : undefined }}>
              🔍
            </span>
          ),
          onFilter: (value, record) =>
            (record.patientname || '').toString().toLowerCase().includes(value.toLowerCase()),
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
          responsive: ['md'],
          render: text => text || 'N/A',
        },
        // {
        //   title: 'Age',
        //   dataIndex: 'age',
        //   key: 'age',
        //   responsive: ['lg'],
        //   render: age => (age ?? 'N/A'),
        // },
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
        {
          title: 'Appointment Action',
          key: 'action',
          render: (_, record) => (
            <div style={{ gap:'2px' }}>
              <Button
                type="link"
              
                onClick={() => handleEdit(record)}
                style={{ marginRight: 8 }}
              >
                Edit
              </Button>
              <Button
                type="link"
              
                onClick={() => handleView(record)}
                style={{ marginRight: 8 }}
              >
                View
              </Button>
              <Button
                type="link"
                
                onClick={() => handleDownload(record)}
                style={{ marginRight: 8 }}
              >
                Download
              </Button>
              <Button
                type="link"
               
                onClick={() => handleDelete(record)}
                style={{ color: 'red' }}
              >
                Delete
              </Button>
            </div>
          ),
        },
        {
          title: 'Report',
        }
      ];
    
      if (!appointmentList || appointmentList.length === 0) {
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