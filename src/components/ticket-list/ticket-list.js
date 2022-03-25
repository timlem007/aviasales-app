import React, { useState, useEffect } from 'react';
// import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import 'antd/dist/antd.min.css';
import { Tabs, Spin } from 'antd';
import { tabChange, getTickets, addTickets } from '../redux/actions';
import './ticket-list.scss';

import AviasalesService from '../services/aviasales-service';
import Ticket from '../ticket';

const { TabPane } = Tabs;
let ticketId = 1;
let resultsList = [];
function TicketList({
  tab, tabChanges, tickets, getTicketss, maxTicketId, addTicketss, filter,
}) {
  const Info = new AviasalesService();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const allTickets = async (stop = false) => {
      if (!stop) {
        await Info.getTickets().then((body) => {
          getTicketss(body.tickets);
          return allTickets(body.stop);
        });
      } else setLoading(false);
    };

    const asyncSearchId = async () => {
      await Info.getSearchId();
      await allTickets();
    };
    return asyncSearchId();
    // eslint-disable-next-line
  }, []);

  const afterFilter = () => {
    let result = [];
    const arrayConnect = (number) => result.concat(
      tickets.filter((el) => el.segments[0].stops.length === number
      && el.segments[1].stops.length === number),
    );
    if (filter.all) result = tickets;
    else {
      if (filter.noChange) result = arrayConnect(0);
      if (filter.oneChange) result = arrayConnect(1);
      if (filter.twoChange) result = arrayConnect(2);
      if (filter.threeChange) result = arrayConnect(3);
    }
    resultsList = result;
    return result;
  };

  const tabsSort = () => {
    let result = [];
    switch (tab) {
      case 'lowCost':
        result = afterFilter().sort((ab, bc) => ab.price - bc.price);
        break;
      case 'fastest':
        result = afterFilter().sort(
          (ab, bc) => (ab.segments[0].duration + ab.segments[1].duration)
          - (bc.segments[0].duration + bc.segments[1].duration),
        );
        break;
      case 'optimal':
        result = afterFilter();
        break;
      default:
        result = afterFilter();
    }
    return result;
  };

  const resultList = (maxId) => tabsSort()
    .slice(0, maxId)
    .map((el) => {
      ticketId += 1;
      return (<Ticket key={ticketId} data={el} />);
    });

  const result = loading ? (
    <Spin className="card-spinner" tip="Loading..." size="large" />
  ) : (
    <ul className="main__results__ticket-list">{resultList(maxTicketId)}</ul>
  );
  return (
    <div className="main__results">
      <Tabs
        defaultActiveKey="1"
        type="card"
        tabBarGutter={0}
        tabBarStyle={{ color: 'white' }}
        onChange={(activeKey) => tabChanges(activeKey)}
      >
        <TabPane tab="САМЫЙ ДЕШЕВЫЙ" key="lowCost">
          {tab === 'lowCost' ? result : null}
        </TabPane>
        <TabPane tab="САМЫЙ БЫСТРЫЙ" key="fastest">
          {tab === 'fastest' ? result : null}
        </TabPane>
        <TabPane tab="ОПТИМАЛЬНЫЙ" key="optimal">
          {tab === 'optimal' ? result : null}
        </TabPane>
      </Tabs>
      {loading || !resultsList.length ? null : (
        <button type="button" className="main__results__see-more" onClick={() => addTicketss(tickets)}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      )}
      {loading || resultsList.length ? null
        : <p>Рейсов, подходящих под заданные фильтры, не найдено</p>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  tickets: state.tickets,
  maxTicketId: state.maxTicketId,
  tab: state.tab,
  filter: state.filter,
});
export default connect(mapStateToProps, {
  tabChanges: tabChange,
  getTicketss: getTickets,
  addTicketss: addTickets,
})(TicketList);
