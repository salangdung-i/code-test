function solution(schedules, timelogs, startday) {
  let answer = 0;
  for (const idx in timelogs) {
    if (startday === 7) {
      timelogs[idx].splice(6, 1);
      timelogs[idx].splice(0, 1);
    } else {
      timelogs[idx].splice(7 - startday - 1, 2);
    }

    let allOnTime = true;

    for (const timelog of timelogs[idx]) {
      const timeconvert = convertTime(schedules[idx] + 10);
      if (timelog > timeconvert) {
        allOnTime = false;
        break;
      }
    }
    if (allOnTime) answer++;
  }
  return answer;
}

function convertTime(time) {
  const mm = time % 100;
  const hh = Math.floor(time / 100);
  if (mm >= 60) {
    return (hh + 1) * 100 + (mm - 60);
  }
  return time;
}

module.exports = { solution };
