noseX=0;
noseY=0;

difference=0;

rightWristX=0;
leftWristX=0;

function setup() {
  video=createCapture(VIDEO);
  video.size(550, 500);
  video.position(60, 100);
    canvas=createCanvas(550, 500);
    canvas.position(620, 100);
    
  poseNet=ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function draw() {
  background('#f2efeb');
  fill('#240101');
  stroke('#240101');
  text("Incluso la persona más pequeña puede cambiar el curso del futuro", noseX, noseY, difference);
  document.getElementById("letter_side").innerHTML="El tamaño del teto es: "+difference+"px";
}

function modelLoaded() {
  console.log('El modelo se cargo =]');
}

function gotPoses(results) {
  if(results.length>0) {
    console.log(results);

    console.log('La posición X de la nariz: '+noseX, 'La posición Y de la nariz: '+noseY);
    noseX=results[0].pose.nose.x;
    noseY=results[0].pose.nose.y;

    leftWristX=results[0].pose.leftWrist.x;
    rightWristX=results[0].pose.rightWrist.x;

    difference= floor(leftWristX-rightWristX);
    console.log('La muñeca izquierda X: '+leftWristX, 'La muñeca derecha X: '+rightWristX, 'La diferencia: '+difference);
  }
}