var isPlaying = false;
var timeOfNextClick;
var timeOfLastClick;
var runningClicksInSession = 0;
var countInClickSubdivisions;
var rotatedClickSubdivisions;
var bpm;
var interval;

const millisecondsUntilNextClick = () => {
  const millisecondsPerBeat = (60 * 1000) / bpm;
  const subdivision = currentSubdivision();
  return millisecondsPerBeat * (4 / subdivision);
}

const currentSubdivision = () => {
  return (runningClicksInSession < 0) ?
    countInClickSubdivisions[(-runningClicksInSession) - 1] :
    rotatedClickSubdivisions[runningClicksInSession % rotatedClickSubdivisions.length];
}

const updateMetronome = () => {
  if (isPlaying) {
    if (Date.now() > timeOfNextClick) {
      self.postMessage('tick');
      runningClicksInSession = runningClicksInSession + 1;
      timeOfLastClick = timeOfNextClick;
      timeOfNextClick = timeOfNextClick + millisecondsUntilNextClick();
    }

    interval = setTimeout(updateMetronome, timeOfNextClick - Date.now());
  }
}

self.addEventListener('message', function(e){
  switch (e.data.message) {
    case 'start':
      if (interval) clearInterval(interval);
      isPlaying = true;
      bpm = e.data.bpm;
      rotatedClickSubdivisions = e.data.rotatedClickSubdivisions;
      countInClickSubdivisions = e.data.countInClickSubdivisions;
      runningClicksInSession = - countInClickSubdivisions.length;
      timeOfNextClick = Date.now() + millisecondsUntilNextClick()
      updateMetronome();
      break;
    case 'update':
      bpm = e.data.bpm;
      break;
    case 'stop':
      if (interval) clearInterval(interval);
      isPlaying = false;
      runningClicksInSession = 0;
      break;
  };
}, false);
