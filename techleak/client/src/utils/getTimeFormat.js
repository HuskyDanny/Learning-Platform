export default function(ts) {
  const date = new Date(ts);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}
