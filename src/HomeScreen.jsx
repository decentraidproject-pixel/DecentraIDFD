import React,{useEffect,useRef} from 'react'
import './Header.css'
import user from './assets/user.png'
import verifier from './assets/verifier.png';
import admin from './assets/admin.png'
import { useNavigate } from 'react-router-dom';
import { FaUserCheck, FaEnvelope, FaStar, FaShieldAlt, FaLock, FaChartLine } from "react-icons/fa";

const HomeScreen = () => {
  const navigate=useNavigate();
  const circleRef=useRef(null);
  const textRef=useRef(null);


const features = [
  {
    icon: <FaUserCheck />,
    title: "Face Verification",
    description: "Confirms the real user by matching the registered face during login.",
  },
  {
    icon: <FaEnvelope />,
    title: "Email OTP Authentication",
    description: "Provides one-time password verification for secure account access.",
  },
  {
    icon: <FaStar />,
    title: "Reputation Score System",
    description: "Maintains a trust score based on successful and failed login attempts.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Fraud & Fake Account Prevention",
    description: "Blocks suspicious users when verification repeatedly fails.",
  },
  {
    icon: <FaLock />,
    title: "Secure Identity Access",
    description: "Only verified users can enter the system and view protected data.",
  },
  {
    icon: <FaChartLine />,
    title: "Activity Monitoring",
    description: "Tracks login history and verification attempts for transparency.",
  },
];

function verifierReg(){
 navigate('FaceAuth')
}

function admin(){
 navigate('admin-login')
}
function user(){
 navigate('UserfaceAuth')
}

  function started(){
    const c=circleRef.current;
    const text=textRef.current;
    if(!c || !text) return;
   
    
    const r=70;
    const circumference=2*Math.PI*r;
    const target=80;
    
    c.style.strokeDasharray = circumference;
    c.style.strokeDashoffset=circumference;

    let per=0;
    const interval=setInterval(() => {
      if(per>=target){
        clearInterval(interval);
        return
      }else{
        const offset=circumference-(per/100 * circumference);
        c.style.strokeDashoffset=offset +1;
        per++;
        text.textContent=per+"%";
      }
    }, 15);

  }


  useEffect(()=>{
    started()
  },[]);

  return (
    <>
<div className='homeContent' style={{backgroundColor:"black"}}>  
<div className='left'>
<p className='title' >TrustLedger — Secure Digital Identity & Reputation Verification Platform</p>
<p className='description'>TrustLedger provides a secure digital identity system using biometric verification and blockchain technology.
Users register with their identity and face authentication, creating a tamper-proof identity record.
The platform assigns a dynamic reputation score that helps applications verify whether a user is genuine before granting access.</p>
<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
  <p className="titleimg">📸</p>
  <p className="titleimg">⏱️</p>
</div>
</div>
<div className='right' >
  <div>
     <svg width={200} height={170}>
      <circle 
      
         className='progress-ring-bg'
         cx={100} cy={80} r={70}
      />
      <circle className='progress-ring-circle'
      ref={circleRef}
      cx={100} cy={80} r={70}/>
     </svg>
     <div className='percentage' ref={textRef}>0%</div>
     
  </div>

</div>

</div> 


 <section className="features-section">
      <h2>Key Features — TrustLedger</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
    

    <div className='card'>
       <div className='item'>
        <div className='left'>
        <p className='name'>
          User
        </p>
          <img src={user} alt='user'  className='img' style={{width: "200px",height:"210px"}}/>
          </div>
           <div className='right'>
          <p style={{width: "200px", color:'white'}}>Build your digital identity. Earn trusted verification. Strengthen your reputation.</p>
          <button className='btn' onClick={user}>Get Started</button>
       </div>
       
       </div>

        

       <div className='item1'>
        <div className='left'>
        <p className='name'>
          Verifier
        </p>
          <img src={verifier} alt='user' style={{width: "200px"}} className='img1'/>
        </div>  
           <div className='right'>
          <p style={{width: "200px", color:'white'}}>Verify identities. Issue trust approvals. Strengthen the reputation network.</p>
          <button className='btn2' onClick={verifierReg}>Get Started</button>
       </div>
       </div>

       <div className='item2'>
        <div className='left'>
        <p className='name'>
          Admin
        </p>
          <img src={admin} alt='user' style={{width: "170px", marginLeft:"25px"}}/>
          </div>
           <div className='right'>
          <p style={{width: "200px", color:'white',marginLeft:'30px'}}>Control access. Verify organizations. Safeguard network integrity.</p>
          <button className='btn3' onClick={admin} >Get Started</button>
       </div>
       </div>

      
    </div>
 
    </>
  )
}

export default HomeScreen