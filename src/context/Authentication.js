import React, { useEffect, useState } from 'react';
import Login from '../app/login/Login';
import Spinner from '../app/shared/Spinner';
import axios_instance from '../libs/axiosInstance';
import useAuthContext from './AuthContext';
import useMeContext from './MeContext';

const Authentication = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [me, setMe] = useMeContext();
  const [token, setToken] = useAuthContext();

  useEffect(() => {
    const access_token = localStorage.getItem('token');

    if (access_token) {
      axios_instance.get('/me', {
        params: {
          remember_token: access_token
        }
      }).then((data) => {
        setToken(access_token)
        setMe(data.data)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) return <Spinner />

  if (!token) return <div className='mt-5'><Login /></div>

  return <>{props.children}</>
}

export default Authentication;