import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApprovalPage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  
  console.log("hello");
  if(userData.approval === null)
  {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h1>Not yet authorized</h1>
        </div>
      );
  }

  if(userData.approval === false)
  {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h1>Your Request has been denied</h1>
        </div>
      );
  }
};

export default ApprovalPage;