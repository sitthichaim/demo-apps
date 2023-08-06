import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import ContentSection from './../../ContentSection';

function Products() {
  const [data, setData] = useState([]);

  const productLoad = useCallback(() => {
    axios
      .post('/api/v1/react-apps', {
        pages: 'products',
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    productLoad();
  }, [productLoad]);
  return (
    <>
      <ContentSection {...data[0]} />
      <ContentSection {...data[2]} />
    </>
  );
}

export default Products;
