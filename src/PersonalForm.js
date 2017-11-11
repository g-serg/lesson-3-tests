import React, { Component } from 'react';
import Title from './Title';
import './PersonalForm.css';

export class PersonalForm extends Component {
  handleChangeForm = event => {
    const target = event.target;
    const { onChangeForm } = this.props;
    onChangeForm(target.name, target.value);
  };

  render() {
    return (
      <div>
        <Title>Персональная информация</Title>
        <div className="personal-form">
          <input name="firstName" onChange={this.handleChangeForm} />
          <input name="lastName" onChange={this.handleChangeForm} />
          <input name="email" onChange={this.handleChangeForm} />
        </div>
      </div>
    );
  }
}

export default PersonalForm;
