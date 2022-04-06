export const filterAll = () => ({ type: 'FILTER_ALL' });
export const filterChange = (filterName) => ({ type: 'FILTER_CHANGE', payload: filterName });

export const tabChange = (activeKey) => ({ type: 'TAB_CHANGE', activeKey });

export const getTickets = (tickets) => ({ type: 'TICKETS', tickets });

export const addTickets = () => ({ type: 'ADD_TICKETS' });
