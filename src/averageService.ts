export function getAvg(score) {
  return getTotalScore(score) / score.length;
}

function getTotalScore(scores){
  return scores.reduce((score,count) => score + count);
}

console.log(`Mode: ${process.env.NODE_ENV}`) // lo inyecta webpack a la hora de hacer el bundle