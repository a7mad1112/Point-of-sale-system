import { useState, useEffect } from "react";
import SectionHeading from "../Components/SectionHeading/SectionHeading";
import { Box, Button } from "@mui/material";
import categoriesImg from "../../assets/ProductCategoryDiagram.png";
import "./categories.css";
import CreateCategoryModal from "./components/CreateCategoryModal/CreateCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesType } from "../../types/types";
import CatCard from "./components/CatCard/CatCard";
import useFetch from "../../hooks/useFetch";
import { categoryActions } from "../../store/states/categoriesSlice";
import Loader from "../Components/Loader/Loader";
const Categories = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const categories: CategoriesType = useSelector(
    (state: any) => state.categories.categories
  );
  const dispatch = useDispatch();
  // fetch categories
  const { response: categoriesRes } = useFetch(
    "http://localhost:1337/api/categories1?pagination[limit]=-1"
  );
  useEffect(() => {
    dispatch(categoryActions.setCategories(categoriesRes.data.data));
  }, [categoriesRes, dispatch]);
  // if loading, show spinner
  const isLoading: Boolean = useSelector(
    (state: any) => state.isLoading.isLoading
  );
  const spinner = (
    <div className="loading-container">
      <Loader />
    </div>
  );
  if (isLoading) return spinner;

  return (
    <>
      <section>
        <SectionHeading position="left" text="Categories" />
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          <Box flex={1} minWidth={300} margin="auto" p={2}>
            <p>
              The Product Categories Page showcases the existing categories in
              the system, allowing you to efficiently organize and manage your
              product catalog. Easily view, add, update, or delete categories to
              ensure a streamlined and well-structured inventory.
            </p>
            <Button
              onClick={() => setShowCreateModal(true)}
              sx={{
                my: 4,
                backgroundColor: "var(--yellow-color)",
                color: "#FFFFFF",
                fontWeight: "bold",
                transition: "0.3s",
                "&:hover": {
                  opacity: 0.8,
                  backgroundColor: "var(--yellow-color)",
                  transform: "translateY(-2px)",
                },
              }}
              variant="contained"
            >
              New Category
            </Button>
          </Box>

          <Box flex={2} minWidth={300} maxWidth={400} p={2} margin="auto">
            <img src={categoriesImg} alt="Categories" />
          </Box>
        </Box>
        {showCreateModal && (
          <CreateCategoryModal setIsShow={setShowCreateModal} />
        )}
      </section>
      <section>
        <Box flex={1} minWidth={300} margin="auto" p={2} pb={4}>
          <SectionHeading position="center" text="Categories" />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          {!categories?.length ? (
            <p>
              Oops! It seems that no categories have been added yet. Don't
              worry, you can easily add new categories to your system to
              organize your products more effectively. Just click the "Add
              Category" button to get started and enhance your inventory
              management.
            </p>
          ) : (
            categories.map((cate) => <CatCard key={cate.id} category={cate} />)
          )}
        </Box>
      </section>
    </>
  );
};

export default Categories;
