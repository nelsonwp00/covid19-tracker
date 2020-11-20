export default function compare(a, b) {
  if (a.Country < b.Country){
    return -1;
  }
  if (a.Country > b.Country){
    return 1;
  }
  return 0;
}
