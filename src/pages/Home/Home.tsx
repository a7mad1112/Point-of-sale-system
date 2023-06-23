import { Box, Button } from "@mui/material";
import SectionHeading from "../Components/SectionHeading/SectionHeading";
import cashierImg from "../../assets/Cashier.png";
import { CartsType } from "../../types/types";
import { useSelector } from "react-redux";
import CartCard from "./Components/CartCard/CartCard";
import { useState } from "react";
import CreateCartModal from "./Components/CreateCartModal/CreateCartModal";
function Home() {
  const carts: CartsType = useSelector((state: any) => state.carts.carts);
  // state for create cart modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  return (
    <>
      <section>
        <SectionHeading position="left" text="Cart Management" />
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          <Box flex={1} minWidth={300} margin="auto" p={2}>
            <article>
              <p>
                As a cashier, you have the ability to create and manage multiple
                carts, providing you with a flexible and efficient checkout
                process. Here are the key features and actions available to you:
              </p>
              <ul>
                <li>
                  Create Carts: Initiate new carts for different customers or
                  transactions, each with a unique identifier. This allows you
                  to handle multiple transactions simultaneously.
                </li>
                <li>
                  Edit Carts: Modify the contents of each cart as needed. Add or
                  remove products, adjust quantities, and update cart details to
                  accurately reflect the customer's purchase.
                </li>
                <li>
                  Delete Carts: Remove unnecessary or abandoned carts from the
                  system to keep your workspace organized and focused on active
                  transactions.
                </li>
              </ul>

              <p>
                By leveraging these cart management capabilities, you can
                streamline your point-of-sale operations, provide personalized
                service to customers, and ensure smooth and accurate checkouts.
              </p>
            </article>
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
              New Cart
            </Button>
          </Box>

          <Box flex={2} minWidth={300} maxWidth={400} p={2} margin="auto">
            <img style={{ width: "100%" }} src={cashierImg} alt="cashier-img" />
          </Box>
        </Box>
        {showCreateModal && <CreateCartModal setIsShow={setShowCreateModal} />}
      </section>
      <section>
        <SectionHeading position="center" text="Carts" />
        <Box flex={1} minWidth={300} margin="auto" p={2} pb={4}></Box>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          {!carts?.length ? (
            <p>
              Oops! It seems that no categories have been added yet. Don't
              worry, you can easily add new categories to your system to
              organize your products more effectively. Just click the "Add
              Category" button to get started and enhance your inventory
              management.
            </p>
          ) : (
            carts.map((cart) => <CartCard key={cart.id} cart={cart} />)
          )}
        </Box>
      </section>
    </>
  );
}

export default Home;
