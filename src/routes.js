import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// pages 
import Home from "./pages/Home";

export default function Routes(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  )
}