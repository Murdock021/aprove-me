/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Route, Routes } from 'react-router-dom';
import { Home } from '@/view/pages/home';
import { HeaderNav } from '@/view/layouts/general/header.layout';
import PrivateRoute from '../context/PrivateRoute'; // Certifique-se de importar o PrivateRoute corretamente

const ClientRoutes = () => {
  console.log('ClientRoutes');
  return (
    <Routes>
      <Route
        path="home"
        element={
          <PrivateRoute
            element={
              <HeaderNav>
                <Home />
              </HeaderNav>
            }
          />
        }
      />
    </Routes>
  );
};
export default ClientRoutes;
