import { Outlet, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function UserPortal() {
   
    const navigate=useNavigate();
    function login(){
       navigate('user-Login')
    }
   function register() {
  window.location.href = "https://decentra-idfd.vercel.app/verifier-Portal/register";
}
  return (

    <div>
      <h2 style={{color:"white"}}>User Portal</h2>
      <button onClick={login} >Login</button>
      <button onClick={register}>Register</button>
      <Outlet />
    </div>
  );
}

export default UserPortal;
