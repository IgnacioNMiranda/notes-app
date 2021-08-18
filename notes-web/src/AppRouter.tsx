import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Notes } from "./components/core/organisms/Notes/Notes";
import { Home } from "./components/core/pages/Home";
import { TokenContext } from "./context";

export const AppRouter = () => {
  const { token } = useContext(TokenContext);

  return (
    <Switch>
      <Route path='/notes' render={() => token ? <Notes/> : <Redirect to='/'/>}/>
      <Route path='/'>
        <Home/>
      </Route>
    </Switch>
  )
};
