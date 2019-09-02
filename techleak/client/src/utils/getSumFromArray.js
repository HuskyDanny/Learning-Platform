export default function(arr, type) {
  let sums = 0;
  for (const el of arr) {
    sums += el[type];
  }
  return sums;
}
