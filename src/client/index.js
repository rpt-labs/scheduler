import React from 'react';
import { Container } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import CohortSummary from './components/CohortSummary/CohortSummary';

// use this to login through okta
// import App from './components/App';

const App = () => (
  <Container style={{ marginTop: '50px' }}>
    <CohortSummary />
  </Container>
);

ReactDOM.render(<App />, document.getElementById('app'));
