import { useState } from "react";
import SectionHeading from "../Components/SectionHeading/SectionHeading";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import productsImg from "../../assets/products-img.png";
import ProductsList from "./ProductsList/ProductsList";
import CreateProductModal from "./CreateProductModal/CreateProductModal";
function Products() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <>
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
              New Product
            </Button>
            {showCreateModal && (
              <CreateProductModal setIsShow={setShowCreateModal} />
            )}
          </Box>

          <Box flex={2} minWidth={300} maxWidth={400} p={2} margin="auto">
            <img src={productsImg} alt="Products" />
          </Box>
        </Box>
      </section>
      <section>
        <ProductsList />
      </section>
    </>
  );
}

export default Products;
