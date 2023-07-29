import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from './useFetch';
import { productsActions } from '../store/states/productsSlice';

const useFetchProducts = () => {
  const dispatch = useDispatch();
  const { response: productsRes } = useFetch(
    "http://localhost:1337/api/products1?pagination[limit]=-1&populate=*"
  );

  useEffect(() => {
    if (productsRes?.data) {
      dispatch(productsActions.setProducts(productsRes.data.data));
    }
  }, [productsRes, dispatch]);
};

export default useFetchProducts;
