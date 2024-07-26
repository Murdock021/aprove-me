import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./view/pages/login";
import { ClientRoutes } from "./servers/routes";

function App() {
  return (
    <div className="bg-background">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <ClientRoutes />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
