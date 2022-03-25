export const filterAll = () => ({ type: 'FILTER_ALL' });
export const filterNoChange = () => ({ type: 'FILTER_NO_CHANGE' });
export const filterOneChange = () => ({ type: 'FILTER_ONE_CHANGE' });
export const filterTwoChange = () => ({ type: 'FILTER_TWO_CHANGE' });
export const filterThreeChange = () => ({ type: 'FILTER_THREE_CHANGE' });

export const tabChange = (activeKey) => ({ type: 'TAB_CHANGE', activeKey });

export const getTickets = (tickets) => ({ type: 'TICKETS', tickets });

export const addTickets = () => ({ type: 'ADD_TICKETS' });
