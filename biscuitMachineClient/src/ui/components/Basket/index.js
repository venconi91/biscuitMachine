
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

class Basket extends Component {
  render() {
    const { readyBiscuits } = this.props;
    return (
      <div className={style.wrapper}>
        {readyBiscuits} biscuits are ready
      </div>
    );
  }
}

Basket.propTypes = {
  readyBiscuits: PropTypes.number.isRequired
};

export default Basket;
