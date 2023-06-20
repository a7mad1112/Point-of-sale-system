import SideBar from "../Components/SideBar/SideBar";
import { Routers } from "../Routes/Routers";

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
