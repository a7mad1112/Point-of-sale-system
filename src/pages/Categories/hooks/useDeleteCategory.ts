import { useState } from "react";
import useDelete from "../../../hooks/useDelete";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/states/categoriesSlice";

const useDeleteCategory = (URL: string) => {
  const { deleteData } = useDelete(URL);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await deleteData();
    // after delete the item, we need te reset our state
    const URL = "http://localhost:1337/api/categories1?pagination[limit]=-1";
    try {
      const res = await fetch(URL);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      dispatch(categoryActions.setCategories(data.data));
    } catch (error) {
      throw new Error("Failed to post data");
    }
  };

  return { handleDelete };
  // const [response, setResponse] = useState({
  //   loading: false,
  //   error: null,
  //   data: null,
  // });
};

export default useDeleteCategory;
