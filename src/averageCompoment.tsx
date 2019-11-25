import React from 'react';
import { getAvg } from './averageService';

const classes = require('./averageComponentStyles.scss')

export const AverageComponent = () => {
  const [average, setAverage] = React.useState(0);

  React.useEffect(() => {
    const scores = [1, 2, 3, 4, 5, 5];
    setAverage(getAvg(scores));
  }, []);
  
  return (
    <div>
      <span className={classes.resultBackground}>Students average: {average}</span>
    </div>
  );
};
