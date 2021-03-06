const initialState = {
  filter: {
    all: '',
    noChange: true,
    oneChange: true,
    twoChange: true,
    threeChange: true,
  },
  tab: 'lowCost',
  maxTicketId: 5,
  tickets: [],
};
function isAllFilterChecked(obj) {
  const { filter: { ...filter } } = obj;
  if (Object.values(filter).slice(1).every((el) => el === true)) {
    filter.all = true;
  } else filter.all = false;
  return { ...obj, filter };
}
// eslint-disable-next-line
const reducer = (state = isAllFilterChecked(initialState), action) => {
  const newObj = { ...state };
  const { filter: { ...filter } } = newObj;
  switch (action.type) {
    case 'FILTER_ALL':
      filter.all = !filter.all;
      if (filter.all) {
        Object.keys(filter).forEach((filterName) => (filter[filterName] = true));
      } else {
        Object.keys(filter).forEach((filterName) => (filter[filterName] = false));
      }
      return { ...newObj, filter };
    case 'FILTER_CHANGE':
      filter[action.payload] = !filter[action.payload];
      return isAllFilterChecked({ ...newObj, filter });

    case 'TAB_CHANGE':
      newObj.tab = action.activeKey;
      return newObj;

    case 'TICKETS':
      return { ...newObj, tickets: [...newObj.tickets.concat(action.tickets)] };

    case 'ADD_TICKETS':
      newObj.maxTicketId += 5;
      return newObj;

    default:
      return newObj;
  }
};

export default reducer;
