function solution(video_len, pos, op_start, op_end, commands) {
  const videoSec = convertTime(video_len);
  const opStartSec = convertTime(op_start);
  const opEndSec = convertTime(op_end);

  let answer = convertTime(pos);

  const skipOpening = (t) => (t >= opStartSec && t <= opEndSec ? opEndSec : t);

  answer = skipOpening(answer);

  for (const command of commands) {
    if (command === "next") {
      answer = Math.min(answer + 10, videoSec);
    } else {
      answer = Math.max(answer - 10, 0);
    }
    answer = skipOpening(answer);
  }

  return revertTime(answer);
}

function revertTime(time) {
  const hh =
    time / 60 > 10 ? Math.floor(time / 60) : "0" + Math.floor(time / 60);
  const mm = time % 60 > 10 ? time % 60 : "0" + (time % 60);

  return hh + ":" + mm;
}

function convertTime(time) {
  const hh = time.split(":")[0];
  const mm = time.split(":")[1];

  return Number(hh) * 60 + Number(mm);
}
const video_len1 = "34:33";
const pos1 = "13:00";
const op_start1 = "00:55";
const op_end1 = "02:55";
const commands1 = ["next", "prev"];

console.log(
  "retult 1 >>",
  solution(video_len1, pos1, op_start1, op_end1, commands1),
);

const video_len2 = "10:55";
const pos2 = "00:05";
const op_start2 = "00:15";
const op_end2 = "06:55";
const commands2 = ["prev", "next", "next"];
console.log(
  "retult 2 >>",
  solution(video_len2, pos2, op_start2, op_end2, commands2),
);

const video_len3 = "07:22";
const pos3 = "04:05";
const op_start3 = "00:15";
const op_end3 = "04:07";
const commands3 = ["next"];
console.log(
  "retult 3 >>",
  solution(video_len3, pos3, op_start3, op_end3, commands3),
);
// "34:33"	"02:55"	["next", "prev"]	"13:00"
// "10:55"	"00:05"	"00:15"	"06:55"	["prev", "next", "next"]	"06:55"
// "07:22"	"04:05"	"00:15"	"04:07"	["next"]	"04:17"
