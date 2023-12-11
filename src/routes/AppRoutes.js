import { Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Chat from "../Chat/Chat";
import Users from "../Users/Users";
import Products from "../Products/Products";
import History from "../History/History";
import Login from "../Login/Login";
import NewProduct from "../New/NewProduct";
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/chat" component={Chat} />
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/products" component={Products} />
        <PrivateRoutes path="/history" component={History} />
        <PrivateRoutes path="/new" component={NewProduct} />
        <Route path="/login" component={Login} />
        <PrivateRoutes exact path="/" component={Home}></PrivateRoutes>
        <Route path="*">404 not found</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
