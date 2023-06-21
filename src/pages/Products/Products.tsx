import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loader/Loader";
import { productsActions } from "../../store/states/productsSlice";
import SectionHeading from "../Components/SectionHeading/SectionHeading";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import productsImg from "../../assets/products-img.png";
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
    <section>
      <SectionHeading position="left" text="Products" />
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
            Effortlessly manage your product inventory on the Products Page.
            View, update, and delete existing products to keep your inventory
            organized and accurate. Take control of your inventory before
            creating new products.
          </p>
          <Button
            // onClick={() => setShowCreateModal(true)}
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

        <Box flex={2} minWidth={300} maxWidth={400} p={2} margin="auto">
          <img src={productsImg} alt="Products" />
        </Box>
      </Box>
    </section>
  );
}

export default Products;
