export default function AfterSort(afterFilter, tab) {
  let result = [];
  switch (tab) {
    case 'lowCost':
      result = afterFilter.sort((ab, bc) => ab.price - bc.price);
      break;
    case 'fastest':
      result = afterFilter.sort(
        (ab, bc) => ab.segments[0].duration + ab.segments[1].duration
- (bc.segments[0].duration + bc.segments[1].duration),
      );
      break;
    case 'optimal':
      result = afterFilter;
      break;
    default:
      result = afterFilter;
  }
  return result;
}
