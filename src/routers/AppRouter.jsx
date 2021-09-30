import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

import { ActorInfo } from "../components/ActorInfo/ActorInfo";
import { UploadImage } from "../components/UploadImage/UploadImage";

export const AppRouter = () => {

  return (
    <Router>
      <div>
        <div>
          <ul>
            <li>
              <Link to="/upload-image">Upload Image</Link>
            </li>
            <li>
              <Link to="/actor-info">Actor Info</Link>
            </li>
          </ul>
        </div>

        <div>
          <Switch>
            <Route
              exact
              path='/upload-image'
              component={UploadImage}
            />

            <Route
              path='/actor-info'
              component={ActorInfo}
            />

            <Redirect to='/upload-image' />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
