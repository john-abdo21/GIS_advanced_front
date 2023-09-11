import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Test from "../components/Test";
import AllDataView from "../components/AllDataView";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={<Test />} />
        <Route exact path="/test" component={<Test />} />
        <Route exact path="/allData" component={<AllDataView />} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
