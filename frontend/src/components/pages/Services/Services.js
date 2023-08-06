import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import ContentSection from './../../ContentSection';
import Pricing from '../../Pricing';

function Services() {
  const [data, setData] = useState([]);

  const loadServices = useCallback(() => {
    axios
      .post('/api/v1/react-apps', {
        pages: 'services',
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);
  return (
    <>
      <Pricing />
      <ContentSection {...data[0]} />
      <ContentSection {...data[2]} />
    </>
  );
}

export default Services;
