//https://circletype.labwire.ca/

var tiempoNav = 0;
var d = new Date();
var n = d.getTime();

var x = document.getElementById("myAudio"); //REcupera el elemento por ID

var alerta = confirm("Bienvenida(o) / Bem-vindo / Welcome \n I want to try I different way of surfing through this web. \n So explore, hope you enjoy!");
  if (alerta == true) {
    var otraFecha = new Date();
    tiempoNav = otraFecha.getTime() - n;
  }
  tiempoNav = calcularTiempo(tiempoNav);
  document.getElementById("demo").innerHTML = "Great! you spent: " + tiempoNav.toFixed(3) + " minutes looking at this";
//alert("Bienvenida(o) / Bem-vindo / Welcome \n I want to try I different way of surfing through this web. \n So explore, hope you enjoy!");

//var $myCanvas = $('#myCanvas');


//Para garantizar que todo lo del JQuery suceda luego de que se ha cargado el HTML
/*
$(document).ready(function(){

  $myCanvas.drawArc({
  strokeStyle: 'steelblue',
  strokeStyle: 'blue',
  strokeWidth: 4,
  x: 300, y: 100,
  radius: 50,

  });

});*/

// All the paths
var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
var current;
var previous;

var anchoPantalla = screen.width;
var altoPantalla = screen.height;
var centroGral = [anchoPantalla/2, altoPantalla/2]

var radioCirc1;
var radioCirc2;
var radioCirc3;
var radioGral;
var radioGralPrev;
var centroC1 = [0,0];
var centroC2 = [0,0];
var centroC3 = [0,0];
var sliderContacto;

let font,
  fontsize = 40;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  miFuente = loadFont('recursos/HelloCake.ttf');
}


function setup() {
  var canvas = createCanvas(0.8*anchoPantalla, 0.8*altoPantalla);
  //frameRate(10);
  canvas.parent('p5Canvas');
  //canvas.mouseOver(DibujarAreas);
  current = createVector(0,0);
  previous = createVector(0,0);
  radioCirc1 = canvas.width*0.3; //este valor quiero que sea variable dependiendo del porcentaje de trabajo hecho en cada área
  radioCirc2 = canvas.width*0.3;
  radioCirc3 = canvas.width*0.3;
  centroGral = [canvas.width/2,canvas.height/2];

  anguloInicio= 90;

  // Create the slider
  sliderContacto = createSlider(0, 100, 10); //17 es el valor de apenas contacto entre los círculos

    // Set the position of slider on the canvas
  sliderContacto.position(150, 200);
  radioGral = canvas.width*sliderContacto.value()/100;
  radioGralPrev = radioGral;
  textFont(miFuente);
  textAlign(LEFT);
  textSize(40);
  fill(255);

  text('ichi', 300, 300);
  RedibujarCirculos();

}

function draw() {
  //background(black);
  radioGral = canvas.width*sliderContacto.value()/100;
  if(radioGral!=radioGralPrev){
    //background(0);
    RedibujarCirculos();
    radioGralPrev= radioGral;
  }
  //circle(canvas.width/2,canvas.height/2, radioGral);
  valorColorPx = get(mouseX,mouseY);
  if(valorColorPx[0]==valorColorPx[1] && valorColorPx[0]!=0){
      print("Engineer");

    }
  else if(valorColorPx[1]==valorColorPx[2]&& valorColorPx[1]!=0){
    print("Arts");

  }
  else if(valorColorPx[0]==valorColorPx[2] && valorColorPx[0]!=0){
    print("Education");

  }
  else if(valorColorPx[1]>valorColorPx[0] && valorColorPx[1]>valorColorPx[2] && (valorColorPx[1]-valorColorPx[2])>100){
    print("Eng & Arts");
    print(valorColorPx);
  }
  else if(valorColorPx[0]>valorColorPx[1] && valorColorPx[0]>valorColorPx[2]){
    print("Eng & Education");
  }
  else if(valorColorPx[2]>valorColorPx[0] && valorColorPx[2]>valorColorPx[1]){
    print("Arts & Education");
  }
  else if (!(valorColorPx[0]==0 && valorColorPx[1]==0 && valorColorPx[2]==0)){
    print("Magia");
  }
  }
  //print(sliderContacto.value());


function RedibujarCirculos(){
  fill(200,0,200,70);
  stroke(150);
  circle(centroGral[0] + cos(anguloInicio*2*PI/360)*radioGral,centroGral[1] + sin(anguloInicio*2*PI/360)*radioGral, radioCirc1);
  fill(0,200,200,70);
  stroke(150);
  circle(centroGral[0] + cos((anguloInicio+120)*2*PI/360)*radioGral,centroGral[1] + sin((anguloInicio+120)*2*PI/360)*radioGral, radioCirc2);
   fill(200,200,0,70);
   stroke(150);
  circle(centroGral[0] + cos((anguloInicio+240)*2*PI/360)*radioGral,centroGral[1] + sin((anguloInicio+240)*2*PI/360)*radioGral, radioCirc3);

}


/*
function draw() {
  background(200);
  circle(30,30,20);
  // If it's time for a new point
  if (millis() > next && painting) {

    // Grab mouse position
    current.x = mouseX;
    current.y = mouseY;

    // New particle's force is based on mouse movement
    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    // Add new particle
    paths[paths.length - 1].add(current, force);

    // Schedule next circle
    next = millis() + random(100);

    // Store mouse values
    previous.x = current.x;
    previous.y = current.y;
  }

  // Draw all paths
  for( var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

// Start it up
function mousePressed() {
  next = 0;
  painting = true;
  previous.x = mouseX;
  previous.y = mouseY;
  paths.push(new Path());
}

// Stop
function mouseReleased() {
  painting = false;
}

// A Path is a list of particles
function Path() {
  this.particles = [];
  this.hue = random(100);
}

Path.prototype.add = function(position, force) {
  // Add a new particle with a position, force, and hue
  this.particles.push(new Particle(position, force, this.hue));
}

// Display plath
Path.prototype.update = function() {
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
}

// Display plath
Path.prototype.display = function() {

  // Loop through backwards
  for (var i = this.particles.length - 1; i >= 0; i--) {
    // If we shold remove it
    if (this.particles[i].lifespan <= 0) {
      this.particles.splice(i, 1);
    // Otherwise, display it
    } else {
      this.particles[i].display(this.particles[i+1]);
    }
  }

}

// Particles along the path
function Particle(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.95;
  this.lifespan = 255;
}

Particle.prototype.update = function() {
  // Move it
  this.position.add(this.velocity);
  // Slow it down
  this.velocity.mult(this.drag);
  // Fade it out
  this.lifespan--;
}

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function(other) {
  stroke(0, this.lifespan);
  fill(0, this.lifespan/2);
  ellipse(this.position.x,this.position.y, 8, 8);
  // If we need to draw a line
  if (other) {
    line(this.position.x, this.position.y, other.position.x, other.position.y);
  }
}*/


function calcularTiempo(t){
var seg= t/1000;
var min=seg/60;
return min;
}


function playAudio() {
  x.play();
}

function pauseAudio() {
  x.pause();
}
