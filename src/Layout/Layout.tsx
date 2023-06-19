import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { Routers } from "../Routes/Routers";

const Layout = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
