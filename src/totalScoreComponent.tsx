import React from 'react';
import { getAvg } from './averageService';

const classes = require('./totalScoreComponentStyles.scss')

export const TotalScoreComponent: React.FunctionComponent = () => {
  const [totalScore, setTotalScore] = React.useState<number>(0);

  React.useEffect(() => {
    const scores = [1, 2, 3, 4, 5, 5];
    setTotalScore(getAvg(scores));
  }, []);

  return (
    <div>
      <span className={classes.resultBackground} >TotalScore: {totalScore}</span>
    </div>
  );
}