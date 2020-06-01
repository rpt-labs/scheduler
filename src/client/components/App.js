import React, { Component } from 'react';

// components
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import CohortSummary from './CohortSummary/CohortSummary';
import Login from './auth/Login';

const { OKTA_BASE_URL } = process.env;
const { OKTA_CLIENT_ID } = process.env;
const { OKTA_URL } = process.env;

/*
  eslint no-underscore-dangle: ["error", { "allowAfterThis": true }]
*/

function onAuthRequired({ history = [] }) {
  history.push('/login');
}

export default class App extends Component {
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Router>
        <Security
          issuer={OKTA_URL}
          clientId={OKTA_CLIENT_ID}
          redirectUri={`${window.location.origin}/implicit/callback`}
          onAuthRequired={onAuthRequired}
        >
          <div>
            <Container>
              <SecureRoute path="/" exact component={CohortSummary} />
              <Route path="/login" render={() => <Login baseUrl={OKTA_BASE_URL} />} />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </Container>
          </div>
        </Security>
      </Router>
    );
  }
}
