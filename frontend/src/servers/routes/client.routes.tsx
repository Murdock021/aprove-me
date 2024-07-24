/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Route, Routes } from "react-router-dom";
import { Home } from "@/view/pages/home";
import { HeaderNav } from "@/view/layouts/general/header.layout";
import SettingsLayout from "@/view/layouts/signup/signup.layout";
import SettingsAccountPage from "@/view/pages/signup";

const ClientRoutes = () => {
  console.log("ClientRoutes");
  return (
    <Routes>
      <Route
        path="home"
        element={
          <Routes>
            <Route index element={
              <HeaderNav>
                <Home />
              </HeaderNav>
            } />
          </Routes>
        }
      />
      <Route
        path="signup"
        element={
          <Routes>
            <Route index element={
              <SettingsLayout>
                <SettingsAccountPage />
              </SettingsLayout>
            } />
          </Routes>
        }
      />
    </Routes>
  );
};
export default ClientRoutes;
