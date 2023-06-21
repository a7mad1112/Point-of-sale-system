import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loader/Loader";
import { productsActions } from "../../store/states/productsSlice";

function Products() {
  const { response } = useFetch(
    "http://localhost:1337/api/products1?populate=*"
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsActions.setProducts(response.data.data));
    // console.log(response.data.data)
  }, [response, dispatch]);

  if (response.loading)
    return (
      <div className="loading-container">
        <Loader />
      </div>
    );

  return (
    <>
      <section></section>
    </>
  );
}

export default Products;
