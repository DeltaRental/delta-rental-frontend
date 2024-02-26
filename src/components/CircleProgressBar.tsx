import React from 'react';

type Props ={
    progress: number,
    strokeWidth: number,
    circleSize: number,
    circleColor: string,
    progressColor: string
}
const CircularProgressBar = (props: Props) => {
  const radius = (props.circleSize - props.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (props.progress / 100) * circumference;

  return (
    <svg width={props.circleSize} height={props.circleSize} viewBox={`0 0 ${props.circleSize} ${props.circleSize}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx={props.circleSize / 2} cy={props.circleSize / 2} r={radius} stroke={props.circleColor} strokeWidth={props.strokeWidth} />
      <circle cx={props.circleSize / 2} cy={props.circleSize / 2} r={radius} stroke={props.progressColor} strokeWidth={props.strokeWidth} strokeDasharray={circumference} strokeDashoffset={progressOffset} transform={`rotate(-90 ${props.circleSize / 2} ${props.circleSize / 2})`} />
    </svg>
  );
}

export default CircularProgressBar;
