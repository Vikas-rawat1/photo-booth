var vidContainer; // Declare vidContainer outside the scope of onSuccess function

var photoButton = document.getElementById("snapPicture");
photoButton.addEventListener("click", picCapture, false);

var saveToGalleryButton = document.getElementById("saveToGallery");
saveToGalleryButton.addEventListener("click", saveToGallery, false); // Event listener for the "Save to Gallery" button

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

if (navigator.getUserMedia) {
  navigator.getUserMedia({ video: true, audio: false }, onSuccess, onError);
} else {
  alert("Your browser doesn't support getUserMedia");
}

function onSuccess(stream) {
  // alert("Connection Successful");
  vidContainer = document.getElementById("webcam"); // Remove 'var' keyword to use the global variable

  vidContainer.autoplay = true;
  vidContainer.srcObject = stream; 
}

function onError() {
  alert("We have a problem");
}

function picCapture() {
  var picture = document.getElementById("capture"),
    context = picture.getContext("2d");
  picture.width = "600";
  picture.height = "400";
  context.drawImage(vidContainer, 0, 0, picture.width, picture.height);
  var dataUrl = picture.toDataURL();
  
  // Set the source of the <img> element to the data URL
  var canvasImg = document.getElementById('canvasImg');
  canvasImg.src = dataUrl;
}

function saveToGallery() {
  var picture = document.getElementById("capture"),
    context = picture.getContext("2d");
  picture.width = "600";
  picture.height = "400";
  context.drawImage(vidContainer, 0, 0, picture.width, picture.height);
  var dataUrl = picture.toDataURL();
  
  // Create a link element
  var downloadLink = document.createElement('a');
  downloadLink.href = dataUrl;
  downloadLink.download = 'captured_image.png'; // Set the default filename

  // Append the link to the body and trigger a click event
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
