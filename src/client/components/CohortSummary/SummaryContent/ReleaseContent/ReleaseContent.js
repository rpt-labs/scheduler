import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Confirm } from 'semantic-ui-react';

class ReleaseContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      result: ''
    };
  }

  show = () => this.setState({ open: true });

  handleConfirm = () => this.setState({ result: 'confirmed', open: false });

  handleCancel = () => this.setState({ result: 'cancelled', open: false });

  handleRelease = () => {
    const { url } = this.props;
    axios
      .patch(`http://localhost:9001/release/${url}`)
      .then((response) => {
        if (response && response.data) {
          // eslint-disable-next-line no-console
          console.log(response.data);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <Button onClick={this.show}>Release</Button>
        <Confirm
          open={open}
          onCancel={this.handleCancel}
          content="Confirm release?"
          size="mini"
          onConfirm={this.handleRelease}
        />
      </div>
    );
  }
}

export default ReleaseContent;

ReleaseContent.propTypes = {
  url: PropTypes.string.isRequired
};
