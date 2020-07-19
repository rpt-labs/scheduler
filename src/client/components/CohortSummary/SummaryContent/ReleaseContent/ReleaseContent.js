import React, { Component } from 'react';
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

  render() {
    const { open, result } = this.state;

    return (
      <div>
        {console.log('result', result)}
        <Button onClick={this.show}>Release</Button>
        <Confirm open={open} onCancel={this.handleCancel} content="Confirm release?" onConfirm={this.handleConfirm} />
      </div>
    );
  }
}

export default ReleaseContent;
