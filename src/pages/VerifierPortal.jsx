import { Outlet, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function VerifierPortal() {
   
    const navigate=useNavigate();
    function login(){
       navigate('Verifier-Login')
    }
    function register(){
        navigate('register')
    }
  return (

    <div>
      <h2 style={{color:"white"}}>Verifier Portal</h2>
      <button onClick={login} >Login</button>
      <button onClick={register}>Register</button>
      <Outlet />
    </div>
  );
}

export default VerifierPortal;