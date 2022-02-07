export function formatSecondsToMmss(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString();
  const secondsLeft = (seconds % 60).toString();
  return `${minutes.padStart(2, '0')}:${secondsLeft.padStart(2, '0')}`;
}

export function formatSecondsToDuration(seconds: number) {
  let duration = '';

  if (seconds >= 60) {
    duration = `${Math.floor(seconds / 60).toString()}m`;
  }

  const secondsLeft = seconds % 60;

  if (secondsLeft > 0) {
    duration += `${secondsLeft.toString()}s`;
  }

  return duration;
}
