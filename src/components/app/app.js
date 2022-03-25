import React from 'react';
import './app.scss';
import logo from '../logo.png';
import Filter from '../filter';
import TicketList from '../ticket-list';

function App() {
  return (
    <>
      <img className="header__logo" src={logo} alt="logo" />
      <div className="main">
        <Filter />
        <TicketList />
      </div>
    </>
  );
}

export default App;
