import { useState, useEffect } from "react";
import SectionHeading from "../Components/SectionHeading/SectionHeading";
import { Box, Button, Grid } from "@mui/material";
import categoriesImg from "../../assets/ProductCategoryDiagram.png";
import "./categories.css";
import CreateCategoryModal from "./components/CreateCategoryModal/CreateCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesType } from "../../types/types";
import CatCard from "./components/CatCard/CatCard";
import useFetch from "../../hooks/useFetch";
import { categoryActions } from "../../store/states/categoriesSlice";
const Categories = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const categories: CategoriesType = useSelector(
    (state: any) => state.categories.categories
  );
  const { response } = useFetch("http://localhost:1337/api/categories1");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(categoryActions.setCategories(response.data.data));
  }, [response, dispatch]);
  if (response.loading) return <h1>Loading</h1>;

  // if (response.data) console.log(response.data.data);

  return (
    <>
      <section>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Box flex={1} minWidth={300} margin="auto" p={2}>
            <SectionHeading position="left" text="Categories" />
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
              Create Category
            </Button>
          </Box>

          <Box flex={2} minWidth={300} p={2} margin="auto">
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
        <Grid container spacing={2}>
          {categories?.slice(0, 3).map((cate) => (
            <CatCard key={cate.id} category={cate} />
          ))}
        </Grid>
      </section>
    </>
  );
};

export default Categories;
