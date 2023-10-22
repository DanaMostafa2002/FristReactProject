import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const encodedToken = localStorage.getItem('userToken');
    
    if (encodedToken) {
      const decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
    }
  }, []);

  return (
    <>
      <h1>Hello {userData?.name}!</h1>
   
    </>
  );
}
