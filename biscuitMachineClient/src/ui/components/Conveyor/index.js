
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Biscuit from './../Biscuit';
import style from './style.css';

class Conveyor extends Component {
  renderBiscuitsOnConveyor(biscuit, i) {
    return (
      <div key={i} className={style.biscuitWrapper}>
        {biscuit && <Biscuit state={biscuit.state} />}
      </div>
    );
  }
  render() {
    const { biscuits } = this.props;
    return (
      <div className={style.wrapper}>
        <div className={style.biscuits}>
          {biscuits.map((b, i) => this.renderBiscuitsOnConveyor(b, i))}
        </div>
        <div className={style.conveyor} />
      </div>
    );
  }
}

// Conveyor.propTypes = {
//   // biscuits: PropTypes.arrayOf(PropTypes.shape({
//   //   state: PropTypes.string
//   // })).isRequired
//   biscuits: PropTypes.string.isRequired // TODO: change
// };

export default Conveyor;
