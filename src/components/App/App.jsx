import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../../routes';

function App() {
  return (
    <>
      <Switch>
        {routes.map(({ path, exact, component }) => {
          return (
            <Route key={path} path={path} exact={exact} component={component} />
          );
        })}
      </Switch>
    </>
  );
}

export default App;
