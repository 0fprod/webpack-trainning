import { getAvg } from './averageService';
import img from './content/js.jpg';

const scores = [1, 24, 312, 13, 3];
const avgScore = getAvg(scores);
const msg = `average score is ${avgScore}`;

$("body").css('background-color','teal')

document.write(msg);

const imga = document.createElement('img');
imga.src = img;

document.getElementById('imgContainer').appendChild(imga);