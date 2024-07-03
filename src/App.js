import { Route, Routes } from "react-router-dom";

import "./App.scss";
import MainLayout from "./layouts/MainLayout";
import { publicRoutes } from "./routes";

function App() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                route.mainLayout ? (
                  <MainLayout search={route.path === "/search"}>
                    <Page />
                  </MainLayout>
                ) : (
                  <Page />
                )
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
