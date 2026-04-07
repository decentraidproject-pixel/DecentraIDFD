import React,{useEffect,useRef} from 'react'
import './Header.css'
import users from './assets/user.png'
import verifier from './assets/verifier.png';
import adminpic from './assets/admin.png'
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

function verify(){
  navigate('UserLookup')
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

<div className="homeContent" style={{backgroundColor:"#005b69", borderRadius:"30px"}}>

  <div className="left"  style={{backgroundColor:"black", borderRadius:"30px",marginLeft:"2px"}}>
    
    <h1 className="title">
      TrustLedger — Secure Digital Identity & Reputation Platform
    </h1>

    <p className="description">
      TrustLedger provides a secure digital identity system using biometric verification 
      and blockchain technology. Users register with identity and face authentication, 
      creating a tamper-proof identity record. The platform assigns a dynamic reputation 
      score to verify genuine users before granting access.
    </p>

    <button className="verify-btn" onClick={verify}>
      Click & Verify
    </button>

    <div className="icons">
      <span>📸 Face Auth</span>
      <span>⏱️ Fast Verification</span>
    </div>

  </div>

</div>


<div className="right">
  <div className="progress-container">
    
    <svg viewBox="0 0 200 200" className="progress-svg">
      
      <circle
        className="progress-ring-bg"
        cx="100"
        cy="100"
        r="80"
      />

      <circle
        className="progress-ring-circle"
        ref={circleRef}
        cx="100"
        cy="100"
        r="80"
      />

    </svg>

    <div className="percentage" ref={textRef}>0%</div>

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
    
<div className="card">

  {/* USER */}
  <div className="card-item card-user">
    <div className="icon-box">
      <img src={users} alt="user" />
      <p className="name">User</p>
    </div>

    <div className="content">
      <p>
        Build your digital identity. Earn trusted verification. 
        Strengthen your reputation.
      </p>
      <button className="btn" onClick={user}>Get Started</button>
    </div>
  </div>

  {/* VERIFIER */}
  <div className="card-item card-verifier">
    <div className="icon-box">
      <img src={verifier} alt="verifier" />
      <p className="name">Verifier</p>
    </div>

    <div className="content">
      <p>
        Verify identities. Issue trust approvals. 
        Strengthen the reputation network.
      </p>
      <button className="btn" onClick={verifierReg}>Get Started</button>
    </div>
  </div>

  {/* ADMIN */}
  <div className="card-item card-admin">
    <div className="icon-box">
      <img src={adminpic} alt="admin" />
      <p className="name">Admin</p>
    </div>

    <div className="content">
      <p>
        Control access. Verify organizations. 
        Safeguard network integrity.
      </p>
      <button className="btn" onClick={admin}>Get Started</button>
    </div>
  </div>

</div>
   

    </>
  )
}

export default HomeScreen
