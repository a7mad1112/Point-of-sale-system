import { useState } from "react";
import SectionHeading from "../Components/SectionHeading/SectionHeading";
import { Box, Button } from "@mui/material";
import categoriesImg from "../../assets/ProductCategoryDiagram.png";
import "./categories.css";
import CreateCategoryModal from "../Components/CreateCategoryModal/CreateCategoryModal";
const Categories = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
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
            The Product Categories Page showcases the existing categories in the
            system, allowing you to efficiently organize and manage your product
            catalog. Easily view, add, update, or delete categories to ensure a
            streamlined and well-structured inventory.
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
      {
        showCreateModal && <CreateCategoryModal setIsShow={setShowCreateModal}/>
      }
    </section>
  );
};

export default Categories;
