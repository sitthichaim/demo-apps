import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import ContentSection from './../../ContentSection';
import Pricing from '../../Pricing';

function Home() {
  const [data, setData] = useState([]);

  const homeLoad = useCallback(() => {
    axios
      .post('/api/v1/react-apps', {
        pages: 'homepage',
      })
      .then((res) => {
        console.log('res.data :>> ', res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    homeLoad();
  }, [homeLoad]);

  return (
    <>
      <ContentSection {...data[0]} />
      <ContentSection {...data[2]} />
      <ContentSection {...data[1]} />
      <Pricing />
      <ContentSection {...data[3]} />
    </>
  );
}

export default Home;
