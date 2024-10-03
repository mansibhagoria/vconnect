import React, { useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
// import Admin from './admin';
// import Manage from './Manage';
import Home from './components/Home/Home'; 

const PrivateRoute = ({ path, exact }) => {
  const token = Cookies.get('token');
  const history = useHistory();
  const [admin, setAdmin] = useState(false);

  const verifyAdmin = async () => {
    try {
      const response = await fetch('http://localhost:8800/admin/checkAdmin', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        history.push('/Unauthorized');
      } else {
        setAdmin(true);
      }
    } catch (error) {
      console.error('Error verifying admin:', error);
      history.push('/Unauthorized');
    }
  };

  useEffect(() => {
    if (!token) {
      history.push('/Unauthorized');
    }
    // if (token) {
    //   verifyAdmin();
    // }
  }, [token, history]);

  return token ? (
    <Route path={path} exact={exact}>
      <Home/>
    </Route>
  ) : (
    <Redirect to="/Unauthorized" />
  );
};

export default PrivateRoute;
