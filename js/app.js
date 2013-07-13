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
  
  videoEl.onloadedmetadata = videoInitialized;
  $('#curtains').addClass('opened');

}

function videoInitialized(e){
  console.log(e);
}

function genericErrorHandler(err){
  console.log(err);
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