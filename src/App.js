import React, { Component } from 'react';
import './App.css';
import './App.scss';
import Step from './Step';
import PersonalForm from './PersonalForm';
import CardForm from './CardForm';

const stepTitles = ['Personal information', 'Card information', 'Finish'];

const stepsCfg = [
  //isSelected, isClickable
  [[true, false], [false, false], [false, false]],
  [[false, true], [true, false], [false, false]],
  [[false, true], [false, true], [true, false]]
];

class App extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    isTimeOver: false
  };

  handleTabClick = step => {
    this.setState({ step: step });
  };

  handleChangeForm = (name, value) => {
    let newState = { ...this.state };
    newState[name] = value;
    this.setState(newState);
  };

  handleClickNextForm = () => {
    this.setState(state => ({ step: state.step + 1 }));
  };

  handleChangeTimeOver = isTimeOver => {
    this.setState({ isTimeOver });
  };

  isFormCommitable = () => {
    const { step, firstName, lastName, email, cardNumber } = this.state;
    switch (step) {
      case 1:
        return (
          firstName !== '' &&
          lastName !== '' &&
          email !== '' &&
          email.indexOf('@') !== -1
        );
      case 2:
        return cardNumber.length === 16;
      default:
        return false;
    }
  };

  renderForm = () => {
    const { step, firstName, lastName, email, cardNumber } = this.state;
    switch (step) {
      case 1:
        return (
          <PersonalForm
            firstName={firstName}
            lastName={lastName}
            email={email}
            onChangeForm={this.handleChangeForm}
          />
        );
      case 2:
        return (
          <CardForm
            cardNumber={cardNumber}
            onChangeForm={this.handleChangeForm}
            onChangeTimeOver={this.handleChangeTimeOver}
          />
        );
      default:
        return 'Поздравляем!';
    }
  };

  render() {
    const { step, isTimeOver } = this.state;
    const stepCfg = stepsCfg[step - 1] || stepsCfg[0]; //fix for test step > 3
    const buttonDisable = !this.isFormCommitable() || isTimeOver;

    return (
      <div className="container">
        <div className="tab-panel">
          {stepCfg.map(([isSelected, isClickable], index) => {
            const text = stepTitles[index];
            return (
              <Step
                key={text}
                onClick={this.handleTabClick}
                number={index + 1}
                isSelected={isSelected}
                isClickable={isClickable}
              >
                {text}
              </Step>
            );
          })}
        </div>
        <div className="form-content">{this.renderForm()}</div>
        {step < 3 || true ? (
          <div className="button-panel">
            <button
              text=""
              className="button-next"
              onClick={this.handleClickNextForm}
              disabled={buttonDisable}
            >
              Далее
            </button>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default App;
