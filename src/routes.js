import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// pages 
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";

export default function Routes(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/workspace" component={Workspace} />
      </Switch>
    </Router>
  )
}