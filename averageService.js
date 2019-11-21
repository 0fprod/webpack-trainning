export function getAvg(score) {
  return getTotalScore(score) / score.length;
}

function getTotalScore(scores){
  return scores.reduce((score,count) => score + count);
}