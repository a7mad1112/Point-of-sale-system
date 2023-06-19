import Footer from "../Components/Footer/Footer";
import SideBar from "../Components/SideBar/SideBar";
import { Routers } from "../Routes/Routers";
import Box from "@mui/material/Box";

const Layout = () => {
  return (
    <>
      <SideBar>
        <Routers />
      </SideBar>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
