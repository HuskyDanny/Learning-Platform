var _ = require("lodash");

const rows = _.range(1, 5);
console.log(rows);
export function disectRows(posts, index) {
  posts.slice(index * 3, index * 3 + 3);
}
