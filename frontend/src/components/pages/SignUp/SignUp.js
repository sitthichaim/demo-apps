import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import ContentSection from './../../ContentSection';

function SignUp() {
  const [data, setData] = useState([]);
  const signupLoad = useCallback(() => {
    axios
      .post(`/api/v1/react-apps`, {
        pages: 'signup',
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    signupLoad();
  }, [signupLoad]);
  return (
    <>
      <ContentSection {...data[0]} />
      <ContentSection {...data[2]} />
    </>
  );
}

export default SignUp;
