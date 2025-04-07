
import './App.css';
import {  Routes,Route,BrowserRouter } from "react-router-dom";
import '@ant-design/v5-patch-for-react-19';
import'./stylesheet/alignment.css'
import './stylesheet/textelement.css'
import './stylesheet/list.css'
import './stylesheet/them.css'
import './stylesheet/otherdesign.css'
import {Home } from './component/Home';
import { Navbar } from './component/Navbar';
import { Header } from './component/Header';
import { Addemployees } from './pages/admin/addemployee';
import EmployeeList from './pages/admin/EmployeeList'; 
import { jwtDecode } from "jwt-decode";
import { HeaderSecond } from './component/HeaderSecond';
// import { LoginAddministration } from './pages/common/LoginAddministration';
import { Login } from './pages/patient/Login';
import { Profile } from './pages/common/Profile';
import { Footer } from './component/Footer';
import { Registration } from './pages/patient/Registration';
import { Doctores } from './pages/common/Doctores';

function App() {

  // Function to get user role from token
  const getUserRole = () => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded.role)

        return decoded.role; // Adjust this based on your token structure
      } catch (error) {
        console.error("Token decoding failed:", error);
        return null;
      }
    }
    return null;
  };
  const userRole = getUserRole() || 'guest'; // Default to 'guest' if no role found
  
  return (
   <BrowserRouter>
    <Header/>
    <HeaderSecond/>
    <Navbar role={userRole} />
      <Routes>
        <Route path='/' element={<Home />} />  
        {/* <Route path ='/login' element={<LoginAddministration /> }/> */}
        <Route path='/profile' element={ <Profile />} />
        <Route path='/signin' element ={ <Login />}/>
         <Route path ='/signup' element={<Registration />} />
        <Route path='/add-employee' element={< Addemployees/> }/>
        <Route path='/employees' element={<EmployeeList/>}/>
        <Route path='/doctors' element={<Doctores />}/>
      </Routes>
      <Footer />
   </BrowserRouter>
  );
}

export default App;
