import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CohortSummary from './components/CohortSummary/CohortSummary'
class App extends React.Component {

  render() {
    return (
    <div className='container'>
      <CohortSummary />
    </div>)
  }
}

ReactDOM.render(
  <App />, document.getElementById('app')
)
