import Header from './Header';
import HomeScreen from './HomeScreen';
import Footer from './Footer';
import { Route, Routes } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Help from './Help';
import StartNow from './StartNow';
import Layout from './Layout';
import FaceAuth from './components/FaceAuth';
import EmailOtp from './components/EmailOTP';
import Payment from './components/Payment';
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import User from "./pages/User";
import RegInfo from './components/RegInfo';
import AdminLogin from './AdminLogin';
import UserLogin from './pages/UserLogin'
import  UserFaceAuth from './components/UserFaceAuth';
import UseremailOTP from './components/UseremailOTP';
import VerifierLogin from './pages/VerifierLogin';
import VerifierPortal from './pages/VerifierPortal';
import UserPortal from './pages/UserPortal';
import UserRegister from './pages/UserRegister';
import UserDashboard from './pages/UserDashboard';
import VerifierDashboard from './pages/VerifierDashboard';
import UserLookup from './pages/UserLookup';


import UserPayment from './components/UserPayment';

function App(){
  return(
    <>
   
    
   <Routes>
  <Route path="/" element={<Layout />}>

    <Route index element={<HomeScreen />} />
    
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="help" element={<Help />} />
    <Route path="startNow" element={<StartNow />} />
  
    <Route path="payment" element={<Payment />} />
    <Route path="reginfo" element={<RegInfo />} />

    <Route path="admin" element={<Admin />} />
    <Route path="user" element={<User />} />
    <Route path="adminLogin" element={<AdminLogin />} />
    <Route path="admin-login" element={<AdminLogin />} />
    
    <Route path="userfaceAuth" element={<UserFaceAuth />} />
    <Route path="User-EmailOTP-Verification" element={<UseremailOTP />} />


     <Route path="FaceAuth" element={<FaceAuth />}/ >
<Route path="EmailOTP" element={<EmailOtp />} />

    

     <Route path="user-Portal" element={<UserPortal/>}>
      <Route path="user-Login" element={<UserLogin/>} />
      <Route path="userRegister" element={<UserRegister />} />
    </Route>
    <Route path="user-dashboard" element={<UserDashboard/>}/>

    
    <Route path="verifier-Portal" element={<VerifierPortal />}>
    
      <Route path="verifier-Login" element={<VerifierLogin />} />
      <Route path="register" element={<Register />} />
      <Route path="verifier-dashboard" element={<VerifierDashboard/>}/>
      
    </Route>


<Route path="UserLookup" element={<UserLookup/>}/>



<Route path="UserPayment" element={<UserPayment/>}/>
  </Route>
</Routes>
   
   
   </>
  )
}
export default App;
