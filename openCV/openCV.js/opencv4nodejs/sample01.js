const cv = require('opencv4nodejs');

// Read a frame from camera
const cap = new cv.VideoCapture(0);
const frame = cap.read();

if (frame.empty) {
  exit(0);
}

// cv.imwrite("./capture.png", frame);

// Show the frame on screen
cv.imshow("capture", frame);
cv.waitKey(0);
