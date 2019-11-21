import { getAvg } from './averageService';

const scores = [1, 24, 312, 13, 3];
const avgScore = getAvg(scores);
const msg = `average score is ${avgScore}`;

//$("body").css('background-color','red')

document.write(msg);