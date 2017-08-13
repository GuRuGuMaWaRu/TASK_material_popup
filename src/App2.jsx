import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import Popup from './Popup';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      items: [
        {
          id: 1,
          name: 'Twin',
          qty: 22,
        },
        {
          id: 2,
          name: 'Triple',
          qty: 12,
        },
        {
          id: 3,
          name: 'Quadro',
          qty: 4,
        },
      ],
    };
  }

  handleOpen = () => this.setState({open: true});

  handleClose = () => this.setState({open: false});

  handleSave = (items) => this.setState({
    items: items,
    open: false,
  });

  render() {
    const style = {
      margin: 12,
    };

    return (
      <div className="App">
        <div className="App-intro">
          <RaisedButton
            label="Popup Dialog"
            primary={true}
            onTouchTap={this.handleOpen}
            style={style} />
        </div>

        <Popup
          onClose={this.handleClose}
          onSave={this.handleSave}
          open={this.state.open}
          items={this.state.items} />
      </div>
    );
  }
}

export default App;
