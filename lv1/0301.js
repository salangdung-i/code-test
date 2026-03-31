function solution(signals) {
  const convertSignals = signals.map(
    ([r1, y, r2]) => "R".repeat(r1) + "Y".repeat(y) + "G".repeat(r2),
  );

  // 최소공배수 계산
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a, b) => (a * b) / gcd(a, b);

  // 모든 신호의 LCM 계산
  const totalLength = convertSignals
    .map((s) => s.length)
    .reduce((acc, len) => lcm(acc, len));

  // 각 신호를 LCM 길이만큼 확장
  const expandedSignals = convertSignals.map((s) =>
    s.repeat(totalLength / s.length),
  );

  // 모든 신호에서 Y가 겹치는 첫 번째 위치 찾기
  for (let i = 0; i < totalLength; i++) {
    if (expandedSignals.every((s) => s[i] === "Y")) {
      return i + 1; // 1-based
    }
  }

  return -1;
}

// signals	result
// [[2, 1, 2], [5, 1, 1]]	13
// [[2, 3, 2], [3, 1, 3], [2, 1, 1]]	11
// [[3, 3, 3], [5, 4, 2], [2, 1, 2]]	193
// [[1, 1, 4], [2, 1, 3], [3, 1, 2], [4, 1, 1]]	-1

const sol1 = [
  [2, 1, 2],
  [5, 1, 1],
];

const sol2 = [
  [2, 3, 2],
  [3, 1, 3],
  [2, 1, 1],
];

const sol3 = [
  [3, 3, 3],
  [5, 4, 2],
  [2, 1, 2],
];

const sol4 = [
  [1, 1, 4],
  [2, 1, 3],
  [3, 1, 2],
  [4, 1, 1],
];

console.log(solution(sol1));
console.log(solution(sol2));
console.log(solution(sol3));
console.log(solution(sol4));
