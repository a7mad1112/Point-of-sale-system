import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryActions } from '../store/states/categoriesSlice';

const useFetchCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories.categories);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch categories if not available
      if (!categories) {
        try {
          const categoriesRes = await fetch(
            "http://localhost:1337/api/categories1?pagination[limit]=-1"
          );
          const categoriesData = await categoriesRes.json();
          dispatch(categoryActions.setCategories(categoriesData.data));
        } catch (error) {
          throw new Error("Failed to fetch categories");
        }
      }
    };

    fetchData();
  }, [categories, dispatch]);
};

export default useFetchCategories;
