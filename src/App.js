import React from "react";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <div>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          {/* Events Routes */}
          <Route exact path="/events">
            <Events />
          </Route>
          <Route exact path="/events/:eventId">
            <EventsDetails />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
