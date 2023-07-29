import { InputAdornment, Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReactPaginate from "react-paginate";
import SectionHeading from "../Components/SectionHeading/SectionHeading";
import cashierImg from "../../assets/Cashier.png";
import { CartsType, CategoriesType, Products } from "../../types/types";
import { useSelector } from "react-redux";
import CartCard from "./Components/CartCard/CartCard";
import { useState, ChangeEvent } from "react";
import CreateCartModal from "./Components/CreateCartModal/CreateCartModal";
import ProductCard from "./Components/ProductCard/ProductCard";
import AddToCartModal from "./Components/AddToCartModal/AddToCartModal";
import "./home.css";
import useFetchProducts from "../../hooks/useFetchProducts";
import useFetchCategories from "../../hooks/useFetchCategories";
import useFetchMeasures from "../../hooks/useFetchMeasures";
import useFetchCarts from "../../hooks/useFetchCarts";
import Loader from "../Components/Loader/Loader";
function Home() {
  useFetchCarts();
  // fetch categories, products and measures if not fetched
  useFetchProducts();
  useFetchCategories();
  useFetchMeasures();
  const carts: CartsType = useSelector((state: any) => state.carts.carts);
  const products: Products = useSelector(
    (state: any) => state.products.products
  );
  const categories: CategoriesType = useSelector(
    (state: any) => state.categories.categories
  );
  // state for create cart modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  // filter products

  // for add to cart modal
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(-1);
  // function to handle search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim().toLowerCase());
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value);
  };

  const filteredProducts = products?.filter((product) => {
    const productName = product.attributes.name.toLowerCase();
    let categoryMatch: boolean;
    if (
      selectedCategoryId === "all" ||
      product.attributes.category.data?.id === +selectedCategoryId
    )
      categoryMatch = true;
    else categoryMatch = false;

    const searchTermMatch =
      searchTerm === "" || productName.includes(searchTerm);

    return categoryMatch && searchTermMatch;
  });

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 8;
  const visitedPage = pageNumber * productPerPage;
  const productsToShow = filteredProducts?.slice(
    visitedPage,
    visitedPage + productPerPage
  );
  const pageCount = Math.ceil(filteredProducts?.length / productPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  
  // loading
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
              <ul className="cart-ul">
                <li>
                  Create Carts: &nbsp;
                  <span>
                    Initiate new carts for different customers or transactions,
                    each with a unique identifier. This allows you to handle
                    multiple transactions simultaneously.
                  </span>
                </li>
                <li>
                  Edit Carts: &nbsp;
                  <span>
                    Modify the contents of each cart as needed. Add or remove
                    products, adjust quantities, and update cart details to
                    accurately reflect the customer's purchase.
                  </span>
                </li>
                <li>
                  Delete Carts: &nbsp;
                  <span>
                    Remove unnecessary or abandoned carts from the system to
                    keep your workspace organized and focused on active
                    transactions.
                  </span>
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
      <section>
        <SectionHeading position="center" text="Our Products" />
        <Box
          marginTop={6}
          marginBottom={6}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          <Box flex={1} minWidth={300} margin="auto" p={2}>
            {/* search element */}
            <TextField
              variant="outlined"
              color="secondary"
              size="small"
              label="I'm Looking for..."
              type="search"
              fullWidth
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* categories for slice */}
          <Box flex={1} minWidth={300} margin="auto" p={2}>
            <select
              style={{ width: "100%", border: "1px solid #eee" }}
              onChange={handleSelect}
            >
              <option value="all">All Categories</option>
              {categories?.map((cat) => (
                <option value={cat.id} key={cat.id}>
                  {cat.attributes.name}
                </option>
              ))}
            </select>
          </Box>
        </Box>

        {/* products cards */}
        <div className="products-container">
          {productsToShow?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setShowAddToCartModal={setShowAddToCartModal}
              setSelectedProductId={setSelectedProductId}
            />
          ))}
        </div>
        <div>
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={changePage}
            previousLabel="Prev"
            nextLabel="Next"
            containerClassName="paginationBtns"
            activeClassName="active_pagination"
          />
        </div>
        {showAddToCartModal && (
          <AddToCartModal
            setIsShow={setShowAddToCartModal}
            selectedProductId={selectedProductId}
          />
        )}
      </section>
    </>
  );
}

export default Home;
