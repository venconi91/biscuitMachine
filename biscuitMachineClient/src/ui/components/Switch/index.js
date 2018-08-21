
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './style.css';

class Switch extends Component {
  changeState(newState) {
    return () => {
      this.props.onSwitchChange(newState);
    };
  }
  render() {
    const { state } = this.props;
    return (
      <div className={classnames(style.wrapper, style[state])}>
        <div onClick={this.changeState('off')}>off</div>
        <div onClick={this.changeState('pause')}>paused</div>
        <div onClick={this.changeState('on')}>on</div>
      </div>
    );
  }
}

Switch.propTypes = {
  state: PropTypes.string.isRequired,
  onSwitchChange: PropTypes.func.isRequired
};

export default Switch;
