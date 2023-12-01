
let playing, frec, ampli, osc;


function setup() {
  let cnv = createCanvas(100, 100);
  cnv.parent('p5CanvasSound');
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator();
}

function draw() {
  background(220);
  frec = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  ampli = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

  text('tap to play', 20, 20);
  text('frec: ' + frec, 20, 40);
  text('amp: ' + ampli, 20, 60);

  if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(frec, 0.7);
    osc.amp(ampli, 0.5);
  }
}

function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}

function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}