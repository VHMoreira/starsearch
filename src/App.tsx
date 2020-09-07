import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './shared/styles/global';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <AppProvider>
          <Routes />
        </AppProvider>
      </Router>
    </>
  );
}

export default App;
