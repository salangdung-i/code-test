// 22, 6, 8
function solution(n, w, num) {
  const boxes = [];
  const div = Math.ceil(n / w);
  console.log("div * w", div * w);
  for (let i = div * w; i > 0; i--) {
    const idx = i - 1;
    const col = Math.floor(idx / w) % 2 === 0 ? idx % w : w - 1 - (idx % w);
    if (i <= n) {
      (boxes[col] ??= []).push(i);
    }
  }

  for (box of boxes) {
    if (box.indexOf(num) > 0) {
      return box.indexOf(num) + 1;
    }
  }

  return 0;
}

// console.log(solution(22, 6, 8)); // 3
console.log(solution(13, 3, 6)); // 4
