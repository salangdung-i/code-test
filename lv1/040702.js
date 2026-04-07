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

const schedules1 = [710, 800, 1100];
const timelogs1 = [
  [710, 2359, 1050, 700, 650, 631, 659],
  [800, 801, 805, 800, 759, 810, 809],
  [1105, 1001, 1002, 600, 1059, 1001, 1100],
];
const startday1 = 7;
console.log(solution(schedules1, timelogs1, startday1)); // 3
const schedules2 = [730, 855, 700, 720];
const timelogs2 = [
  [710, 700, 650, 735, 700, 931, 912],
  [908, 901, 805, 815, 800, 831, 835],
  [705, 701, 702, 705, 710, 710, 711],
  [707, 731, 859, 913, 934, 931, 905],
];
const startday2 = 1;
// console.log(solution(schedules2, timelogs2, startday2)); // 2
