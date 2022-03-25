import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import * as actions from '../redux/actions';
import './filter.scss';

function Filter({
  all,
  noChange,
  oneChange,
  twoChange,
  threeChange,
  filterAll,
  filterNoChange,
  filterOneChange,
  filterTwoChange,
  filterThreeChange,
}) {
  return (
    <div className="main__filter">
      <p className="main__filter__text">КОЛЛИЧЕСТВО ПЕРЕСАДОК</p>
      <Checkbox
        className="main__filter__checkbox"
        checked={all}
        onChange={() => filterAll()}
      >
        Все
      </Checkbox>
      <Checkbox
        className="main__filter__checkbox"
        checked={noChange}
        onChange={() => filterNoChange()}
      >
        Без пересадок
      </Checkbox>
      <Checkbox
        className="main__filter__checkbox"
        checked={oneChange}
        onChange={filterOneChange}
      >
        1 пересадка
      </Checkbox>
      <Checkbox
        className="main__filter__checkbox"
        checked={twoChange}
        onChange={filterTwoChange}
      >
        2 пересадки
      </Checkbox>
      <Checkbox
        className="main__filter__checkbox"
        checked={threeChange}
        onChange={filterThreeChange}
      >
        3 пересадки
      </Checkbox>
      <input hidden type="button" />
    </div>
  );
}

const mapStateToProps = (state) => state.filter;
const {
  tabChange, getTickets, addTickets, ...filterActions
} = actions;
export default connect(mapStateToProps, filterActions)(Filter);
