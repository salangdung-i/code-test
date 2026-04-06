function solution(message, spoiler_ranges) {
  // 1. 단어 파싱 및 글로벌 인덱스 매핑 (split을 직접 구현하여 위치 추적)
  const wordsInfo = [];
  let currentIndex = 0;
  const rawWords = message.split(" ");

  for (const word of rawWords) {
    wordsInfo.push({
      text: word, // 원본 단어 전체
      start: currentIndex, // 단어의 시작 인덱스
      end: currentIndex + word.length - 1, // 단어의 끝 인덱스
    });
    currentIndex += word.length + 1; // 띄어쓰기(1칸) 포함하여 다음 인덱스로 이동
  }

  const clearWords = new Set(); // 스포일러가 없는 일반 단어들 모음 (빠른 검색용)
  const spoiledWordsList = []; // 스포일러 처리된 단어들 (등장 순서 유지를 위해 배열 사용)

  // 2. 각 단어가 스포일러 구간에 포함되는지 판별
  for (const info of wordsInfo) {
    let isSpoiled = false;

    // 현재 단어의 [start, end] 구간이 스포일러 구간과 하나라도 겹치는지 확인
    for (const [sStart, sEnd] of spoiler_ranges) {
      // 단어가 스포일러 구간을 완전히 벗어난 경우가 아니라면 '겹친 것'으로 간주
      if (!(info.end < sStart || info.start > sEnd)) {
        isSpoiled = true;
        break;
      }
    }

    // 겹치면 스포일러 리스트에 추가, 안 겹치면 안전한 단어 Set에 추가
    if (isSpoiled) {
      spoiledWordsList.push(info.text);
    } else {
      clearWords.add(info.text);
    }
  }

  // 3. 문제의 4가지 조건 판별 및 최종 카운트
  const countedWords = new Set(); // 이미 정답으로 카운트된 단어 추적용
  let answer = 0;

  for (const word of spoiledWordsList) {
    // [조건 2 & 조건 3] 일반 텍스트 구간에 노출된 적이 없고, 아직 정답으로 센 적 없는 단어
    if (!clearWords.has(word) && !countedWords.has(word)) {
      countedWords.add(word); // 정답 처리 후 중복 방지를 위해 Set에 등록
      answer++;
    }
  }

  return answer;
}
const message1 = "here is muzi here is a secret message";
const spoiler_ranges1 = [
  [0, 3],
  [23, 28],
];

const message2 =
  "my phone number is 01012345678 and may i have your phone number";
const spoiler_ranges2 = [
  [5, 5],
  [25, 28],
  [34, 40],
  [53, 59],
];

console.log(solution(message1, spoiler_ranges1));
console.log(solution(message2, spoiler_ranges2));
