import React from 'react';
import { BrowserHistory, Action, Location } from 'history';
import { Router } from 'react-router-dom';

interface CustomRouterProps {
  basename?: string;
  children?: React.ReactNode;
  history: BrowserHistory;
}

interface CustomRouterState {
  action: Action;
  location: Location;
}

export default function CustomBrowserRouter(props: CustomRouterProps) {
  const { basename, children, history } = props;
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
}
