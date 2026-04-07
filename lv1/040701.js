function solution(n, w, num) {
  const boxes = [];
  const div = Math.ceil(n / w);

  for (let i = div * w; i > 0; i--) {
    const idx = i - 1;
    const col = Math.floor(idx / w) % 2 === 0 ? idx % w : w - 1 - (idx % w);
    if (i <= n) {
      (boxes[col] ??= []).push(i);
    }
  }

  for (const box of boxes) {
    const idx = box.indexOf(num);
    if (idx !== -1) {
      return idx + 1;
    }
  }

  return 0;
}

// console.log(solution(22, 6, 8)); // 3
console.log(solution(13, 3, 6)); // 4
