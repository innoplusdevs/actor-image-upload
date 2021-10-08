import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { ActorInfo } from "../components/ActorInfo/ActorInfo";
import { Home } from "../components/Home/Home";

export const AppRouter = () => {

  return (
    <Router>
      <div>
        <div>
          <Switch>
            <Route
              exact
              path='/home'
              component={Home}
            />

            <Route
              path='/actor-info'
              component={ActorInfo}
            />

            <Redirect to='/home' />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
