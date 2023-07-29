import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFetch from "./useFetch";
import { cartsActions } from "../store/states/cartSlice";
import { CartType } from "../types/types";

const useFetchCarts = () => {
  const dispatch = useDispatch();
  const { response: cartsRes } = useFetch(
    "http://localhost:1337/api/carts1?pagination[limit]=-1&populate=*"
  );

  useEffect(() => {
    if (cartsRes?.data) {
      // Filter completed carts
      const allCarts: any = cartsRes.data.data;
      const filteredCarts = allCarts?.filter(
        (cart: CartType) => !cart.attributes.completed
      );
      dispatch(cartsActions.setCarts(filteredCarts));
    }
  }, [cartsRes, dispatch]);
};

export default useFetchCarts;
