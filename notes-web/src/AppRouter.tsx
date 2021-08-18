import React from "react";
import { Switch, Route } from "react-router-dom";
import { Notes } from "./components/core/organisms/Notes/Notes";
import { Home } from "./components/core/pages/Home";

export const AppRouter = () => {
  return (
    <Switch>
      <Route path='/notes'>
        <Notes/>
      </Route>
      <Route path='/'>
        <Home/>
      </Route>
    </Switch>
  )
};
