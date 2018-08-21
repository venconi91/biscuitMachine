
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

class Oven extends Component {
  render() {
    const { temperature } = this.props;
    return (
      <Fragment>
        <div className={style.wrapper} />
        {temperature && <div className={style.tempWrapper}>{temperature} degrees</div>}
      </Fragment>
    );
  }
}

Oven.propTypes = {
  temperature: PropTypes.number
};

export default Oven;
