const elapsed = function(tse) {
  const HOUR = 1000 * 60 * 60;
  const DAY = HOUR * 24;
  const WEEK = DAY * 7;
  const MONTH = DAY * 30;

  const SYMBOL = ["m", "w", "d", "h"];
  const VALUE = [MONTH, WEEK, DAY, HOUR];

  let res = "";
  for (let i = 0; i < SYMBOL.length; i++) {
    let num = 0;
    while (tse >= VALUE[i]) {
      num += 1;
      tse -= VALUE[i];
    }

    if (num > 0) {
      res += `${num}${SYMBOL[i]}'`;
    }
  }

  if (!res) {
    res = "less than an hour/";
  }

  return res.slice(0, -1);
};

export default elapsed;
