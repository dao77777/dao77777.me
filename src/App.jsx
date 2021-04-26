import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { HomeLink } from "./components/HomeLink";
import { Article } from "./views/Article";
import { Blog } from "./views/Blog";
import { Archive } from "./views/Archive";
import { Category } from "./views/Category";
import { Home } from "./views/Home";
import { Tag } from "./views/Tag";

function App() {
  return (
    <div className="App">
      <HomeLink></HomeLink>
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/article" component={Article}></Route>
        <Route path="/blog" component={Blog}></Route>
        <Route path="/archive" component={Archive}></Route>
        <Route path="/category" component={Category}></Route>
        <Route path="/tag" component={Tag}></Route>
        <Redirect to="/home"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
