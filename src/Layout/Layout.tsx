import { Route, Routes } from "react-router-dom";
import SideBar from "../Components/SideBar/SideBar";
import { Routers } from "../Routes/Routers";
import Login from "../pages/Login/Login";
import Protected from "../IsProtected/Protected";
import NotProtected from "../IsProtected/NotProtected";

const Layout = () => {
  const side = (
    <SideBar>
      <Routers />
    </SideBar>
  );
  const login = (
    <NotProtected>
      <Login />
    </NotProtected>
  );
  return (
    <>
      <Routes>
        <Route path="/login" element={login} />
        <Route path="/*" element={<Protected>{side}</Protected>} />
      </Routes>
    </>
  );
};

export default Layout;
