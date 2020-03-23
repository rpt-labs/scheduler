import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CohortSummary from './components/CohortSummary'
class App extends React.Component {

  componentDidMount() {
    this.getCurriculum('1086');
  }

  getCurriculum() {
    axios
      .get(`http://localhost:9001/curriculum/1086`)
      .then(response => {
        if (response && response.data) {
          console.log(response.data);
        }
      })
      .catch(error => {
        throw error;
      });
  }

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
