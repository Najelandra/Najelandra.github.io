//https://circletype.labwire.ca/

//https://p5js.org/examples/dom-input-and-button.html
var tiempoNav = 0;
var d = new Date();
var n = d.getTime();



var x = document.getElementById("myAudio"); //REcupera el elemento por ID
var posX, posY;
var abierto=false;
/*var alerta = confirm("Bienvenida(o) / Bem-vindo / Welcome \n I want to try I different way of surfing through this web. \n So explore, hope you enjoy!");
  if (alerta == true) {
    var otraFecha = new Date();
    tiempoNav = otraFecha.getTime() - n;
  }
  tiempoNav = calcularTiempo(tiempoNav);
  document.getElementById("demo").innerHTML = "Great! you spent: " + tiempoNav.toFixed(3) + " minutes looking at this";*/
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
//var sliderCurva;


var dibujado=false;
var Eng = 0;
var Arts = false;
var Educ = false;
let ptoBez =[];
var conteoClicks=0;
var eng = [1,3,4,2];
var textoEscrito=true;
var conteoCirculos =0;
var trazoArtsEng =false;
var trazoArtsEduc =false;
var trazoEngEduc =false;
var trazoEngEducArts =false;
var activo =0;
var activoAnt =0;

function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  miFuente = loadFont('recursos/ReenieBeanie-Regular.ttf');
}


function setup() {
  var canvas = createCanvas(0.5*anchoPantalla, 0.8*altoPantalla);
  //frameRate(10);
  canvas.parent('p5Canvas');
  //canvas.mouseOver(DibujarAreas);
  current = createVector(0,0);
  previous = createVector(0,0);
  radioCirc1 = canvas.width*0.5; //este valor quiero que sea variable dependiendo del porcentaje de trabajo hecho en cada área
  radioCirc2 = canvas.width*0.5;
  radioCirc3 = canvas.width*0.5;
  centroGral = [canvas.width/2,canvas.height/2];


  // button.position(19, 19);
  // button.mousePressed(changeBG);



  anguloInicio= 90;

  // Create the slider
  sliderContacto = createSlider(0, 45, 10); //17 es el valor de apenas contacto entre los círculos
  //sliderCurva = createSlider(0, 100, 10); //17 es el valor de apenas contacto entre los círculos

    // Set the position of slider on the canvas
  sliderContacto.position(anchoPantalla*0.85, altoPantalla*0.90 ); //al parecer esta locaclizacion es respecto a la pantalla gral
  sliderContacto.input(escribir);
  radioGral = canvas.width*sliderContacto.value()/100;
  radioGralPrev = radioGral;
  textFont(miFuente);
  //rotate(PI / 10.0);
  for(var i=10; i<45;i=i+5){
    RedibujarCirculos();
    radioGral = canvas.width*i/100;
  }
  for(var i=45; i>5;i=i-4){
    RedibujarCirculos();
    radioGral = canvas.width*i/100;
  }
  textoEscrito = false;
  escribir();


}

function draw() {
  //background(black);
  radioGral = canvas.width*sliderContacto.value()/100;
  activo=0;
  //RedibujarCirculos();
  if(radioGral!=radioGralPrev){
    //background(0);
    RedibujarCirculos();
    radioGralPrev= radioGral;
    if(conteoCirculos==20){textoEscrito=false;}
  }


  cursor(HAND, posX,posY);
  //circle(canvas.width/2,canvas.height/2, radioGral);
  valorColorPx = get(mouseX,mouseY);
  if(valorColorPx[0]==valorColorPx[1] && valorColorPx[0]!=0){
      print("Engineer");
      activo=1;


      /*var rango =[90, 210];
      var paso = (abs(rango[1])-abs(rango[0])*PI/180)/eng.length;
      if(Eng==0){
      for (var i=1; i<= eng.length; i++){
        hijos(centroC3,radioCirc3/2,(rango[0]-paso*(i))*PI/180,eng[i-1]);
      }
      Eng=1;
      }
      else if(Eng==2){
        background(0);
        RedibujarCirculos();
        Eng=3;
      }*/


        /*if(!dibujado){
        translate(canvas.width / 2, canvas.height);
        stroke(50, 250, 50);
        branch(100);
        translate(0, -100);
        dibujado=true;
      }*/
      //bezier(centroC3[0]+(radioCirc3*cos(anguloInicio)),centroC3[1]+(radioCirc3*sin(anguloInicio)),centroC3[0]+(radioCirc3*cos(anguloInicio))+sliderCurva.value(),centroC3[0]+sliderCurva.value(),2*radioCirc3-10,centroC3[0]-sliderCurva.value(),2*radioCirc3, canvas.height/2);

    }
  else if(valorColorPx[1]==valorColorPx[2]&& valorColorPx[1]!=0){
    print("Arts");
    activo=2;

  }
  else if(valorColorPx[0]==valorColorPx[2] && valorColorPx[0]!=0){
    print("Education");
    activo=3;

  }
  else if(valorColorPx[1]>valorColorPx[0] && valorColorPx[1]>valorColorPx[2] && (valorColorPx[1]-valorColorPx[2])>100){
    activo=4;
    print("Eng & Arts");
    print(valorColorPx);
    noFill();
    textAlign(CENTER);
    textSize(30);
    stroke(255);
    text("New ways of expression",centroGral[0], centroGral[1]-radioCirc2*3/4);


    if(!trazoArtsEng){
    bezier(mouseX,mouseY,(abs((centroGral[0])-mouseX)/2)+centroGral[0],centroGral[1]-(((centroGral[1]-radioGral)-mouseY)/2),
    (centroGral[0]-abs((centroGral[0])-mouseX)/2),centroGral[1]+(abs(centroGral[1]-mouseY)/2),centroGral[0], centroGral[1]-radioCirc2*3/4);
    trazoArtsEng=true;
    }
  }
  else if(valorColorPx[0]>valorColorPx[1] && valorColorPx[0]>valorColorPx[2]){
    activo=5;
    print("Eng & Education");

    if(!trazoEngEduc){
      translate(centroGral[0], centroGral[1]);
      rotate(-PI / 4.0);
      noFill();
      textAlign(CENTER);
      textSize(30);
      stroke(255);
      text("Closing digital gaps",radioCirc1/4, radioCirc1*3/4);

    bezier(0,radioCirc1/4,(mouseX)/4,((radioCirc1/4)-mouseY)/6,
    (-mouseX)/4,((radioCirc1/4)-mouseY)*5/6,0, radioCirc1*3/4);
    trazoEngEduc=true;

    rotate(PI/4.0);
    translate(-centroGral[0], -centroGral[1]);
    }
  }
  else if(valorColorPx[2]>valorColorPx[0] && valorColorPx[2]>valorColorPx[1]){
    activo=6;
    print("Arts & Education");
    noFill();
    stroke(255);
    textAlign(CENTER);
    textSize(30);

    if(!trazoArtsEduc){

      translate(centroGral[0], centroGral[1]);
      rotate(PI / 4.0);
      textSize(30);
      textAlign(CENTER)
      text("Learning through \n emotions",-radioCirc1/4, radioCirc1*3/4);
      noFill();
      stroke(255);

      bezier(0,radioCirc1/4,(mouseX)/4,((radioCirc1/4))/6,
      (-mouseX)/4,((radioCirc1/4)-mouseY)*5/6,0, radioCirc1*3/4);
      trazoArtsEduc=true;
      rotate(-PI/4.0);
      translate(-centroGral[0], -centroGral[1]);
    }

  }
  else if (!(valorColorPx[0]==0 && valorColorPx[1]==0 && valorColorPx[2]==0)){
    activo=7;
    print("Magia");

    if(!trazoEngEducArts){

      translate(centroGral[0], centroGral[1]);
      textAlign(LEFT);
      textSize(35);
      noFill();
      stroke(255);
      text("Magic!",-radioCirc1/8,0);
      trazoEngEducArts=true;
      translate(-centroGral[0], -centroGral[1]);
    }
  }
  else{
    if(Eng==1){Eng=2;}
    else if(Eng==3){Eng =0;}
    cursor(ARROW, posX,posY);

  }
  }
  //print(sliderContacto.value());


function RedibujarCirculos(){

  fill(200,0,200,70);
  noStroke();
  centroC1 = [centroGral[0] + cos(anguloInicio*2*PI/360)*radioGral,centroGral[1] + sin(anguloInicio*2*PI/360)*radioGral];
  circle(centroC1[0],centroC1[1], radioCirc1);



  fill(0,200,200,70);

  centroC2 = [centroGral[0] + cos((anguloInicio+120)*2*PI/360)*radioGral,centroGral[1] + sin((anguloInicio+120)*2*PI/360)*radioGral];
  circle(centroC2[0],centroC2[1], radioCirc2);




   fill(200,200,0,70);

  centroC3 =[centroGral[0] + cos((anguloInicio+240)*2*PI/360)*radioGral,centroGral[1] + sin((anguloInicio+240)*2*PI/360)*radioGral];
  circle(centroC3[0],centroC3[1], radioCirc3);
  conteoCirculos++;
//  circle (centroGral[0],centroGral[1],radioGral);círculo central
}

function hijos(centro, radio,angulo, numHijos){
  //noFill();
  bezier(centro[0]+cos(angulo)*radio, centro[1]+sin(angulo)*radio,
         centro[0]+cos(angulo+(30*PI/180))*(2)*radio*2/3, centro[1]+sin(angulo+((30*PI/180)))*(2)*radio*2/3,
        centro[0]+cos(angulo-(30*PI/180))*(eng.length)*radio*2/3, centro[1]+sin(angulo-((30*PI/180)))*(numHijos)*radio*2/3,
         (centro[0]+cos(angulo)*(numHijos + 1)*radio*2/3)-(radio/4*cos(angulo)), (centro[1]+sin(angulo)*(numHijos + 1)*radio*2/3)-(radio/4*sin(angulo)));
    //fill(255);
  for(var i=1; i<= numHijos; i++){
   circle(centro[0]+cos(angulo)*(i+1)*radio*2/3, centro[1]+sin(angulo)*(i+1)*radio*2/3, radio/2);

  }
}

function branch(length){
    bezier(0,0,10,(0+length)/4,10,3*(0+length)/4,0, -length)
    translate(0, -length)
    if (length > 150) {
        push()
            rotate(PI / 4)
            branch(length * 0.75)
        pop()
        push()
            rotate(-PI / 4)
            branch(length * 0.75)
        pop()
    }
}

function mouseClicked(){
  if(activo!=0 && activo!=activoAnt){
    console.log("sí");
    openNav();
    activoAnt = activo;

  }
}

function escribir(){
      //if(!textoEscrito){
      textAlign(LEFT);
      textSize(40);
      noFill();
      stroke(255);
      text('Education', centroC1[0]-radioCirc1/4, centroC1[1]+radioCirc1*3/8);


      translate(centroC2[0], centroC2[1]);
      rotate(-PI / 4.0);

      text('Arts', -radioCirc2*1/8, -radioCirc2/4);
      rotate(PI / 4.0);
      translate(-centroC2[0], -centroC2[1]);

      translate(centroC3[0], centroC3[1]);
      rotate(PI / 4.0);

      text('Engineering', -radioCirc3/4,-radioCirc3/4);
      rotate(-PI / 4.0);
      translate(-centroC3[0], -centroC3[1]);
      textoEscrito=true;
      trazoEngEduc=false;
      trazoArtsEng=false;
      trazoArtsEduc=false;
      trazoEngEducArts=false;

    //}

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

function openNav() {
document.getElementById("contenido").innerHTML = "";
console.log("clic: "+ activo);
var info = JSON.parse(textoEng);

if(activo==1){

for (var i=0; i< info.Eng.length; i++){
  //console.log(info.Eng[i].Tit);
  var nodeTitulo = document.createElement("h2");
  var titulo = document.createTextNode(info.Eng[i].Tit);
  nodeTitulo.appendChild(titulo);

  var node = document.createElement("P");
  var textnode = document.createTextNode(info.Eng[i].Texto);         // Create a text node
  node.appendChild(textnode);


  var linkNode = document.createElement("a");

  linkNode.innerHTML = info.Eng[i].url;
  linkNode.href = info.Eng[i].url;
  linkNode.target="_blank";
  node.appendChild(linkNode);

  if(info.Eng[i].otros!=null){
    var subtitulo = document.createElement("h3");
    var subText = document.createTextNode(info.Eng[i].otros);
    subtitulo.appendChild(subText);
    document.getElementById("contenido").appendChild(subtitulo);
  }

  if(info.Eng[i].image!=""){
    var imgNode = document.createElement("img");
    imgNode.src =  info.Eng[i].image;
    imgNode.width = anchoPantalla/6;
    imgNode.height = anchoPantalla/6;
    document.getElementById("contenido").appendChild(imgNode);
  }

  document.getElementById("contenido").appendChild(nodeTitulo);
  document.getElementById("contenido").appendChild(node);
  //document.getElementById("contenido").appendChild(linkNode);
  }
}
else if(activo==2){

  for (var i=0; i< info.Arts.length; i++){
    //console.log(info.Eng[i].Tit);
    var nodeTitulo = document.createElement("h2");
    var titulo = document.createTextNode(info.Arts[i].Tit);
    nodeTitulo.appendChild(titulo);

    var node = document.createElement("P");
    var textnode = document.createTextNode(info.Arts[i].Texto);         // Create a text node
    node.appendChild(textnode);

    if(info.Arts[i].url!=null){
    var linkNode = document.createElement("a");

    linkNode.innerHTML = info.Arts[i].urlT;
    linkNode.href = info.Arts[i].url;
    linkNode.target="_blank";
    node.appendChild(linkNode);}

    if(info.Arts[i].otros!=null){
      var subtitulo = document.createElement("h3");
      var subText = document.createTextNode(info.Arts[i].otros);
      subtitulo.appendChild(subText);
      document.getElementById("contenido").appendChild(subtitulo);
    }

    if(info.Arts[i].image!=null){
      var imgNode = document.createElement("img");
      imgNode.src =  info.Arts[i].image;
      imgNode.width = anchoPantalla/6;
      imgNode.height = anchoPantalla/6;
      document.getElementById("contenido").appendChild(imgNode);
    }

    document.getElementById("contenido").appendChild(nodeTitulo);
    document.getElementById("contenido").appendChild(node);
    //document.getElementById("contenido").appendChild(linkNode);

    if(info.Arts[i].video!=null){
      console.log("si hay video");
      var videoNode = document.createElement("iframe");
      videoNode.src = info.Arts[i].video;
      videoNode.width = anchoPantalla/4;
      videoNode.height = altoPantalla/4;
      document.getElementById("contenido").appendChild(videoNode);
    }
    }
 }
else if(activo==6){

  for (var i=0; i< info.ArtsEduc.length; i++){
    //console.log(info.Eng[i].Tit);
    var nodeTitulo = document.createElement("h2");
    var titulo = document.createTextNode(info.ArtsEduc[i].Tit);
    nodeTitulo.appendChild(titulo);

    var node = document.createElement("P");
    var textnode = document.createTextNode(info.ArtsEduc[i].Texto);         // Create a text node
    node.appendChild(textnode);

    if(info.ArtsEduc[i].url!=null){
    var linkNode = document.createElement("a");

    linkNode.innerHTML = info.ArtsEduc[i].urlT;
    linkNode.href = info.ArtsEduc[i].url;
    linkNode.target="_blank";
    node.appendChild(linkNode);}

    if(info.ArtsEduc[i].otros!=null){
      var subtitulo = document.createElement("h3");
      var subText = document.createTextNode(info.ArtsEduc[i].otros);
      subtitulo.appendChild(subText);
      document.getElementById("contenido").appendChild(subtitulo);
    }

    if(info.ArtsEduc[i].image!=""){
      var imgNode = document.createElement("img");
      imgNode.src =  info.ArtsEduc[i].image;
      imgNode.width = anchoPantalla/6;
      imgNode.height = anchoPantalla/6;
      document.getElementById("contenido").appendChild(imgNode);
    }

    document.getElementById("contenido").appendChild(nodeTitulo);
    document.getElementById("contenido").appendChild(node);
    //document.getElementById("contenido").appendChild(linkNode);

    if(info.ArtsEduc[i].video!=null){
      console.log("si hay video");
      var videoNode = document.createElement("iframe");
      videoNode.src = info.ArtsEduc[i].video;
      videoNode.width = anchoPantalla/4;
      videoNode.height = altoPantalla/4;
      document.getElementById("contenido").appendChild(videoNode);
    }
    }
//   <video width="320" height="240" controls>
//   <source src="movie.mp4" type="video/mp4">
//   <source src="movie.ogg" type="video/ogg">
// Your browser does not support the video tag.
// </video>

}
else if(activo==3){

  for (var i=0; i< info.Edu.length; i++){
    //console.log(info.Eng[i].Tit);
    var nodeTitulo = document.createElement("h2");
    var titulo = document.createTextNode(info.Edu[i].Tit);
    nodeTitulo.appendChild(titulo);

    var node = document.createElement("P");
    var textnode = document.createTextNode(info.Edu[i].Texto);         // Create a text node
    node.appendChild(textnode);

    if(info.Edu[i].url!=null){
    var linkNode = document.createElement("a");

    linkNode.innerHTML = info.Edu[i].urlT;
    linkNode.href = info.Edu[i].url;
    linkNode.target="_blank";
    node.appendChild(linkNode);}

    if(info.Edu[i].otros!=null){
      var subtitulo = document.createElement("h3");
      var subText = document.createTextNode(info.Edu[i].otros);
      subtitulo.appendChild(subText);
      document.getElementById("contenido").appendChild(subtitulo);
    }

    if(info.Edu[i].image!=""){
      var imgNode = document.createElement("img");
      imgNode.src =  info.Edu[i].image;
      imgNode.width = anchoPantalla/6;
      imgNode.height = anchoPantalla/6;
      document.getElementById("contenido").appendChild(imgNode);
    }

    document.getElementById("contenido").appendChild(nodeTitulo);
    document.getElementById("contenido").appendChild(node);
    //document.getElementById("contenido").appendChild(linkNode);

    if(info.Edu[i].video!=null){
      console.log("si hay video");
      var videoNode = document.createElement("iframe");
      videoNode.src = info.Edu[i].video;
      videoNode.width = anchoPantalla/4;
      videoNode.height = altoPantalla/4;
      document.getElementById("contenido").appendChild(videoNode);
    }
    }
}
else if(activo==4){ //ing y artes

  for (var i=0; i< info.ArtsEng.length; i++){
    //console.log(info.Eng[i].Tit);
    var nodeTitulo = document.createElement("h2");
    var titulo = document.createTextNode(info.ArtsEng[i].Tit);
    nodeTitulo.appendChild(titulo);

    var node = document.createElement("P");
    var textnode = document.createTextNode(info.ArtsEng[i].Texto);         // Create a text node
    node.appendChild(textnode);

    if(info.ArtsEng[i].url!=null){
    var linkNode = document.createElement("a");

    linkNode.innerHTML = info.ArtsEng[i].urlT;
    linkNode.href = info.ArtsEng[i].url;
    linkNode.target="_blank";
    node.appendChild(linkNode);}

    if(info.ArtsEng[i].otros!=null){
      var subtitulo = document.createElement("h3");
      var subText = document.createTextNode(info.ArtsEng[i].otros);
      subtitulo.appendChild(subText);
      document.getElementById("contenido").appendChild(subtitulo);
    }

    document.getElementById("contenido").appendChild(nodeTitulo);

    if(info.ArtsEng[i].image!=""){
      var imgNode = document.createElement("img");
      imgNode.src =  info.ArtsEng[i].image;
      imgNode.width = anchoPantalla/6;
      imgNode.height = altoPantalla/4.5;
      document.getElementById("contenido").appendChild(imgNode);
    }


    document.getElementById("contenido").appendChild(node);
    //document.getElementById("contenido").appendChild(linkNode);

    if(info.ArtsEng[i].video!=null){
      console.log("si hay video");
      var videoNode = document.createElement("iframe");
      videoNode.src = info.ArtsEng[i].video;
      videoNode.width = anchoPantalla/3;
      videoNode.height = altoPantalla/3;
      document.getElementById("contenido").appendChild(videoNode);
    }
  }
}
else if(activo==5){ //ing y educación

  for (var i=0; i< info.EngEduc.length; i++){
    //console.log(info.Eng[i].Tit);
    var nodeTitulo = document.createElement("h2");
    var titulo = document.createTextNode(info.EngEduc[i].Tit);
    nodeTitulo.appendChild(titulo);

    var node = document.createElement("P");
    var textnode = document.createTextNode(info.EngEduc[i].Texto);         // Create a text node
    node.appendChild(textnode);

    if(info.EngEduc[i].url!=null){
    var linkNode = document.createElement("a");

    linkNode.innerHTML = info.EngEduc[i].urlT;
    linkNode.href = info.EngEduc[i].url;
    linkNode.target="_blank";
    node.appendChild(linkNode);}

    if(info.EngEduc[i].otros!=null){
      var subtitulo = document.createElement("h3");
      var subText = document.createTextNode(info.EngEduc[i].otros);
      subtitulo.appendChild(subText);
      document.getElementById("contenido").appendChild(subtitulo);
    }

    if(info.EngEduc[i].image!=""){
      var imgNode = document.createElement("img");
      imgNode.src =  info.EngEduc[i].image;
      imgNode.width = anchoPantalla/6;
      imgNode.height = anchoPantalla/6;
      document.getElementById("contenido").appendChild(imgNode);
    }

    document.getElementById("contenido").appendChild(nodeTitulo);
    document.getElementById("contenido").appendChild(node);
    //document.getElementById("contenido").appendChild(linkNode);

    if(info.EngEduc[i].video!=null){
      console.log("si hay video");
      var videoNode = document.createElement("iframe");
      videoNode.src = info.EngEduc[i].video;
      videoNode.width = anchoPantalla/4;
      videoNode.height = altoPantalla/4;
      document.getElementById("contenido").appendChild(videoNode);
    }
  }
}
else if(activo==7){

  for (var i=0; i< info.EngEducArts.length; i++){
    //console.log(info.Eng[i].Tit);
    var nodeTitulo = document.createElement("h2");
    var titulo = document.createTextNode(info.EngEducArts[i].Tit);
    nodeTitulo.appendChild(titulo);

    var node = document.createElement("P");
    var textnode = document.createTextNode(info.EngEducArts[i].Texto);         // Create a text node
    node.appendChild(textnode);

    if(info.EngEducArts[i].url!=null){
    var linkNode = document.createElement("a");

    linkNode.innerHTML = info.EngEducArts[i].urlT;
    linkNode.href = info.EngEducArts[i].url;
    linkNode.target="_blank";
    node.appendChild(linkNode);
    }

  /*  if(info.EngEducArts[i].otros!=null){
      var subtitulo = document.createElement("h3");
      var subText = document.createTextNode(info.EngEducArts[i].otros);
      subtitulo.appendChild(subText);
      document.getElementById("contenido").appendChild(subtitulo);
    }*/

    if(info.EngEducArts[i].image!=""){
      var imgNode = document.createElement("img");
      imgNode.src =  info.EngEducArts[i].image;
      imgNode.width = anchoPantalla/6;
      imgNode.height = anchoPantalla/6;
      document.getElementById("contenido").appendChild(imgNode);
    }

    document.getElementById("contenido").appendChild(nodeTitulo);

    //document.getElementById("contenido").appendChild(linkNode);

    if(info.EngEducArts[i].video!=null){
      console.log("si hay video");
      var videoNode = document.createElement("iframe");
      videoNode.src = info.EngEducArts[i].video;
      videoNode.width = anchoPantalla/3;
      videoNode.height = altoPantalla/3;
      document.getElementById("contenido").appendChild(videoNode);
    }
      document.getElementById("contenido").appendChild(node);
    }
//   <video width="320" height="240" controls>
//   <source src="movie.mp4" type="video/mp4">
//   <source src="movie.ogg" type="video/ogg">
// Your browser does not support the video tag.
// </video>

}

  document.getElementById("myNav").style.width = "50%";
  //document.getElementById("myNav").style.display = "inline";
  abierto=true;
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  //document.getElementById("myNav").style.display = "none";
  abierto=false;
  document.getElementById("contenido").innerHTML = "";
  activo=0;
  activoAnt=0;
}
