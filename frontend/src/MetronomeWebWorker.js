var fading = false;
var interval;

self.addEventListener('message', function(e){
  switch (e.data.message) {
    case 'start':
      clearInterval(interval);
      interval = setInterval(function(){
        self.postMessage('tick');
      }, e.data.milliseconds);
      break;
    case 'stop':
      clearInterval(interval);
      break;
  };
}, false);
