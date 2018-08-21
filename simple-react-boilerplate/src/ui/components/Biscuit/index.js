import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './style.css';

const biscuitStateToClassName = {
  extruded: style.extruded,
  stamped: style.stamped,
  baked: style.baked
};

class Biscuit extends Component {
  render() {
    const biscuitStateClassname = biscuitStateToClassName[this.props.state];
    return (
      <div className={classnames(style.biscuit, biscuitStateClassname)} />
    );
  }
}

Biscuit.propTypes = {
  state: PropTypes.string.isRequired
};

export default Biscuit;
