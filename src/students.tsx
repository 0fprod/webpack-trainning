// import { getAvg } from './averageService';
// const scores = [1, 24, 312, 13, 3];
// const avgScore = getAvg(scores);
// const msg = `average score is ${avgScore}`;

// $("body").css('background-color','teal')

// document.write(msg);

//import img from './content/js.jpg';
const img = require('./content/js.jpg'); // asi se carga en ts

import ReactDOM from 'react-dom';
import React from 'react';

import { AverageComponent } from './averageCompoment';

ReactDOM.render(
  <div>
    <h1>Hello from reactDOM</h1>
    <AverageComponent />
  </div>,
  document.getElementById('root')
)

const imga = document.createElement('img');
imga.src = img;

document.getElementById('imgContainer').appendChild(imga);