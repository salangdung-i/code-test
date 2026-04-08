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
  const hh = Math.floor(time / 60);
  const mm = time % 60;
  return String(hh).padStart(2, "0") + ":" + String(mm).padStart(2, "0"); // ✅
}

function convertTime(time) {
  const [hh, mm] = time.split(":");
  return Number(hh) * 60 + Number(mm);
}

// "34:33"	"02:55"	["next", "prev"]	"13:00"
// "10:55"	"00:05"	"00:15"	"06:55"	["prev", "next", "next"]	"06:55"
// "07:22"	"04:05"	"00:15"	"04:07"	["next"]	"04:17"
module.exports = { solution };
