// Get user media shim
function getGetUserMediaString() {
  // Note: Opera is unprefixed.
  return ((navigator.getUserMedia && "getUserMedia") ||
    (navigator.webkitGetUserMedia && "webkitGetUserMedia") ||
    (navigator.mozGetUserMedia && "mozGetUserMedia") ||
    (navigator.msGetUserMedia && "msGetUserMedia"));
}

function initiatePhotobooth(getUserMediaString){
  navigator[getUserMediaString]({video: true},
  startPhotobooth,
  genericErrorHandler)
}

function startPhotobooth(stream){
  var videoEl = $('#photobooth-video')[0];
  videoEl.src = window.URL.createObjectURL(stream);
  
  $('#photobooth-video').on('click', takePictures)

  $('#curtains').addClass('opened');
}

function genericErrorHandler(err){
  console.log(err);
}


function takePictures(){
  var videoEl = $('#photobooth-video');
  var videoWidth = videoEl.width();
  var videoHeight = videoEl.height();
  var rawVid = videoEl[0];
  var canvas = $('#hidden-canvas')[0];
  var ctx = canvas.getContext('2d');
  var destX = 0;
  var destY = 0;
  var aspectRatio = videoWidth /videoHeight;
  var picWidth = 300;
  var picHeight = picWidth / aspectRatio;
  var picCount = 0;
  canvas.width = 600;
  canvas.height = picHeight * 3; 
  
  var interval = setInterval(function(){
    ctx.drawImage(rawVid, 0, 0, videoWidth, videoHeight, destX, destY, picWidth, picHeight);
    picCount++;
    if(picCount == 6){
      showPictures();
      clearInterval(interval);
    }
    else if(picCount % 2 !== 0){
      destX += picWidth;
    }
    else {
      destY += picHeight;
      destX = 0;
    }
  }, 1000);
}

function showPictures(){
  $('#curtains').removeClass('opened');
  var canvas = $('#hidden-canvas')[0];
  
  $('#booth-photo')[0].src = canvas.toDataURL('img/webp');
  $('#photos').show();
}


$(function(){
  var getUserMediaString;
  if(getUserMediaString = getGetUserMediaString()){
    initiatePhotobooth(getUserMediaString);
  }
  else {
      alert('getUserMedia() is not supported in your browser');
  }
  
  
});