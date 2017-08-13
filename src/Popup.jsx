import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { red400, red100 } from 'material-ui/styles/colors';

export default class Popup extends Component {
  constructor(props) {
    super();
    this.state = {
      items: props.items,
    };
    this.changeItem = this.changeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.saveItems = this.saveItems.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      items: this.props.items,
    });
  }

  changeItem = (type, value, id) => {
    const updatedItems = this.state.items.map(item => {
      if (item.id === id) {
        const preservedData = type === 'name' ? 'qty' : 'name';
        return {
          id: item.id,
          [type]: value,
          [preservedData]: item[preservedData],
        };
      }
      return item;
    });

    this.setState({
      items: updatedItems,
    });
  }

  addItem = () => {
    this.setState(prevState => ({
      items: [...prevState.items, {
        id: uuidv4(),
        name: '',
        qty: 0,
      }],
    }));
  };

  deleteItem = (id) => {
    const updatedItems = this.state.items.filter(item => {
      if (item.id !== id) {
        return item;
      }
    });

    this.setState({
      items: updatedItems,
    });
  }

  saveItems = () => {
    this.props.onSave(this.state.items);
  }

  render() {
    const style = {
      title: {
        backgroundColor: '#EEEEEE',
      },
      closeIcon: {
        cursor:'pointer',
        float:'right',
        marginTop: '5px',
        width: '20px',
      },
      dialogButtons: {
        textAlign: 'left',
      },
      cancelButton: {
        marginLeft: '10px',
      },
      flexBox: {
        display: 'inline-flex',
        alignItems: 'center',
      },
      selectField: {
        customWidth: {
          width: 150,
        },
      },
      textField: {
        marginLeft: '20px',
      },
      deleteIcon: {
        cursor:'pointer',
        borderRadius: '50%',
        marginLeft: '20px',
        lineHeight: '28px',
        textAlign: 'center',
        color: '#EF5350',
        backgroundColor: '#FFCDD2',
        height: '28px',
        width: '28px',
      },
    };

    const actions = [
      <RaisedButton
        label="Сохранить"
        primary={true}
        onTouchTap={this.saveItems}
      />,
      <RaisedButton
        label="Отмена"
        primary={true}
        keyboardFocused={true}
        style={style.cancelButton}
        onTouchTap={this.props.onClose}
      />,
    ];

    const savedItems = this.state.items.map(item => {
      return (
        <div key={item.id} style={style.flexBox}>
          <SelectField
            value={item.name}
            onChange={(event) => this.changeItem('name', event.target.innerText, item.id)} >
            <MenuItem value={'Single'} primaryText="Single" />
            <MenuItem value={'Twin'} primaryText="Twin" />
            <MenuItem value={'Triple'} primaryText="Triple" />
            <MenuItem value={'Quadro'} primaryText="Quadro" />
          </SelectField>
          <TextField
            name="qty"
            type="number"
            min="0"
            style={style.textField}
            value={item.qty}
            onChange={(event) => this.changeItem('qty', event.target.value, item.id)} />
          <CloseIcon style={style.deleteIcon} onClick={() => this.deleteItem(item.id)}/>
        </div>
      );
    });

    return (
      <Dialog
        title={<div>Структура номеров <CloseIcon onClick={this.props.onClose} style={style.closeIcon} /></div>}
        titleStyle={style.title}
        actions={actions}
        actionsContainerStyle={style.dialogButtons}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.onClose}
        autoScrollBodyContent={true}>
        {savedItems}
        <br />
        <FlatButton
          label="Добавить"
          primary={true}
          onClick={this.addItem} />
      </Dialog>
    );
  }

}
