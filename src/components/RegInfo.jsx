import React from 'react';
import {Link} from 'react-router-dom';

const RegInfo = () => {
  return (
     <div>
      <nav style={{ padding: "20px", background: "#eee" }}>
        <Link to="/register">Register</Link> |{" "}
    {/*<Link to="/admin">Admin</Link> |{" "}
        <Link to="/user">User</Link> */}    
      </nav>
      </div>
  )
}

export default RegInfo