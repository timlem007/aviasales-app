import React from 'react';
import './ticket.scss';

function Ticket({ data }) {
  const pictureLink = `//pics.avs.io/99/36/${data.carrier}.png`;

  const stopsLength = (reverse) => {
    let stopsLengths;
    switch (data.segments[reverse].stops.length) {
      case 0: stopsLengths = 'Без пересадок'; break;
      case 1: stopsLengths = '1 пересадка'; break;
      case 2: case 3: stopsLengths = `${data.segments[reverse].stops.length} пересадки`; break;
      default: stopsLengths = 'Без пересадок';
    }
    return stopsLengths;
  };

  const lZero = (hour, min) => [hour, min].map((el) => (el.toString().length <= 1 ? `0${el}` : el)).join(':');

  const timeWay = (reverse) => {
    const hourS = new Date(data.segments[reverse].date).getHours();
    const minS = new Date(data.segments[reverse].date).getMinutes();
    const hourF = Math.floor((((+hourS * 60) + +minS) + data.segments[reverse].duration) / 60) % 24;
    const minF = (((+hourS * 60) + +minS) + data.segments[reverse].duration) % 60;
    return `${lZero(hourS, minS)} - ${lZero(hourF, minF)}`;
  };

  const tripInfo = (reverse) => (
    <section className="main__results__ticket-list__ticket__info">
      <div className="main__results__ticket-list__ticket__info__key">
        <p className="main__results__ticket-list__ticket__info__key__info">
          {`${data.segments[reverse].origin}-${data.segments[reverse].destination}`}
        </p>
        <p className="main__results__ticket-list__ticket__info__key__info">
          В пути
        </p>
        <p className="main__results__ticket-list__ticket__info__key__info">
          {stopsLength(reverse)}
        </p>
      </div>
      <div className="main__results__ticket-list__ticket__info__value">
        <p className="main__results__ticket-list__ticket__info__value__info">
          {timeWay(reverse)}
        </p>
        <p className="main__results__ticket-list__ticket__info__value__info">
          {`${Math.floor(data.segments[reverse].duration / 60)}ч ${data.segments[reverse].duration % 60}м`}
        </p>
        <p className="main__results__ticket-list__ticket__info__value__info">
          {data.segments[reverse].stops.join(', ')}
        </p>
      </div>
    </section>
  );

  return (
    <li className="main__results__ticket-list__ticket">
      <section className="main__results__ticket-list__ticket__price">
        <p style={{ marginBottom: 0, fontSize: 24, color: '#2196F3' }}>
          {`${data.price} P`}
        </p>
        <img
          style={{ background: 'white', width: 110, height: 36 }}
          alt="logo"
          src={pictureLink}
        />
      </section>
      {tripInfo(0)}
      {tripInfo(1)}
    </li>
  );
}

export default Ticket;
