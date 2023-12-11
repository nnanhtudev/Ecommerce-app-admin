import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header/Header";

import Menu from "./Menu/Menu";
import { AuthContext, AuthContextProvider } from "./Context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./Context/UserContext";
import { InfinitySpin } from "react-loader-spinner";
function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <>
            <div
              id="main-wrapper"
              data-theme="light"
              data-layout="vertical"
              data-navbarbg="skin6"
              data-sidebartype="full"
              data-sidebar-position="fixed"
              data-header-position="fixed"
              data-boxed-layout="full"
            >
              <Header />
              <Menu />
              {user && user.isLoading ? (
                <>
                  <div className="loading-container">
                    <InfinitySpin width="200" color="#4fa94d" />
                    <div>Loading data ...</div>
                  </div>
                </>
              ) : (
                <>
                  <AppRoutes />
                </>
              )}
            </div>
          </>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
