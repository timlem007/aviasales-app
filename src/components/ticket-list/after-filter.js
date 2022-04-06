export default function AfterFilter(tickets, filter) {
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
  return result;
}
