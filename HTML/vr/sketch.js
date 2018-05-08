var piano_pic;
// var piano_sound;
var sceneControl=0;
var interact_areas=[];
var return_button;
var transition;
var tint_value;
var enlarge = false;

function preload(){
  piano_pic = [
    loadImage('vr/assets/image/_DSC0541.jpg'),
    loadImage('vr/assets/image/_DSC0587.jpg'),
    loadImage('vr/assets/image/_DSC0563.jpg'),
    loadImage('vr/assets/image/_DSC0592.jpg'),
  ];
  // piano_sound = [
  //   c4 = loadSound('assets/sound/C4.m4a'),
  //   d4 = loadSound('assets/sound/D4.m4a'),
  //   e4 = loadSound('assets/sound/E4.m4a'),
  // ]
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('gallery');
  imageMode(CENTER);
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(60);
  //return
  interact_areas.push ({
    x : 0,
    y : 0,
    w : 70,
    x1 : 0,
    y1 : 0,
    x2 : 35,
    y2 : 0,
    tx : 50,
    ty : 50,
    enlarge : false,
  });
  //rear
  interact_areas.push ({
    x : width*0.4,
    y : height*0.2,
    w : 70,
    enlarge : false
  });
  //tag
  interact_areas.push ({
    x : width*0.525,
    y : height*0.34,
    w : 70,
    enlarge : false
  });
  //key
  interact_areas.push ({
    x : width/2,
    y : height/2*1.4,
    w : 70,
    enlarge : false
  });
  // transition = {counter: 0, playing: false, fadeOut: false};
  tint_value = {alpha:100, finish:false, begin:false};
}

function draw(){
  background(255);
  if(tint_value.begin){
    fade_in(tint_value);
  }
  if (sceneControl==0){
    show_front();
  }
  if (sceneControl==1) {
    show_rear();
  }
  if (sceneControl==2) {
    show_tag();
  }
  if (sceneControl==3) {
    show_key();
  }
}

//start fade in
function start_fade_in(t){
  t.alpha=100;
  t.finish=false;
  t.begin=true;
}

//fade in effect
function fade_in(t){
  tint(255,t.alpha);
  if(!t.finish){
    t.alpha+=50;
    if (t.alpha>=255){
      t.finish=true;
    }
  }
  else {
    t.alpha=255;
  }
}

function startTransition(trans) {
	trans.counter = 0;
	trans.playing = true;
	trans.fadeOut = false;
}

function playTransition(trans) {
	if (trans.playing) {
		push();
		noStroke();
		if (trans.fadeOut) {
			trans.counter = trans.counter - 6;
			if (trans.counter <= 0) {
				trans.playing = false;
			}
		} else {
			trans.counter = trans.counter + 6;
			if (trans.counter >= 255) {
				trans.fadeOut = true;
			}
		}
		fill(0, trans.counter);
    rectMode(CORNER);
		rect(0, 0, width, height);
		pop();
	}
}

function mouseMoved() {
  if(sceneControl==0){
    if (dist(interact_areas[1].x,interact_areas[1].y,mouseX,mouseY)<=interact_areas[1].w){
      interact_areas[1].enlarge = true;
    }
    else if (dist(interact_areas[2].x,interact_areas[2].y,mouseX,mouseY)<=interact_areas[2].w){
      interact_areas[2].enlarge = true;
    }
    else {
      interact_areas[1].enlarge = false;
      interact_areas[2].enlarge = false;
    }
  }
  else {
    if (dist(interact_areas[3].x,interact_areas[3].y,mouseX,mouseY)<=interact_areas[3].w){
      interact_areas[3].enlarge = true;
    }
    else if (dist(interact_areas[0].x,interact_areas[0].y,mouseX,mouseY)<=interact_areas[0].w){
      interact_areas[0].enlarge = true;
    }
    else{
      interact_areas[0].enlarge = false;
      interact_areas[3].enlarge = false;
    }
  }
}

function mousePressed(){
  if(sceneControl==0&&mouseIsPressed){
    //click rear area
    if((dist(interact_areas[1].x,interact_areas[1].y,mouseX,mouseY)<=interact_areas[1].w)) {
      sceneControl=1;
      start_fade_in(tint_value);
    }
    //click key area
    if((dist(interact_areas[2].x,interact_areas[2].y,mouseX,mouseY)<=interact_areas[2].w)){
      sceneControl=2;
      start_fade_in(tint_value);
    }
  }
  //click keyboard part
  else if(sceneControl==2
    &&dist(interact_areas[3].x,interact_areas[3].y,mouseX,mouseY)<=interact_areas[3].w){
      sceneControl=3;
      start_fade_in(tint_value);
  }
  //click return button
  else if (sceneControl!=0
    &&dist(interact_areas[0].x,interact_areas[0].y,mouseX,mouseY)<=interact_areas[0].w) {
    sceneControl=0;
    start_fade_in(tint_value);
  }
}

//draw interaction area circle
function draw_circle(i){
  push();
  noFill();
  stroke(255, 150);
  strokeWeight(5);
  if(i.enlarge){
    ellipse(i.x,i.y,i.w*1.2);
  }
  else{
    ellipse(i.x,i.y,i.w);
  }
  pop();
}

//draw return button
function draw_return_button(r){
  push();
  stroke(255,150);
  strokeWeight(5);
  if(r.enlarge){
    scale(1.2);
  }
  else {
    scale(1.0);
  }
  translate(-r.w/4,0);
  line(r.x1,r.y1,r.x2,r.y2);
  push();
  rotate(PI/4);
  line(r.x1,r.y1,r.x2-5,r.y2);
  pop();
  push();
  rotate(PI*7/4);
  line(r.x1,r.y1,r.x2-5,r.y2);
  pop();
  // textSize(20);
  // text("return",r.x,r.y);
  pop();
}

//different scenes
function show_front(){
  push();
  image(piano_pic[0],width/2,height/2,1920,1080);
  // interact_areas.map(draw_circle);
  draw_circle(interact_areas[1]);
  draw_circle(interact_areas[2]);
  //text("this is front scene",width/2,height/2);
  pop();
}

function show_rear(){
  push();
  image(piano_pic[1],width/2,height/2,1920,1080);
  //text("this is rear scene",width*0.4,height*0.4);
  translate(interact_areas[0].tx,interact_areas[0].ty);
  draw_circle(interact_areas[0]);
  draw_return_button(interact_areas[0]);
  pop();
}

function show_tag(){
  push();
  image(piano_pic[2],width/2,height/2,1920,1080);
  //text("this is tag scene",width*0.6,height*0.6);
  draw_circle(interact_areas[3]);
  translate(interact_areas[0].tx,interact_areas[0].ty);
  draw_circle(interact_areas[0]);
  draw_return_button(interact_areas[0]);
  pop();
}

function show_key(){
  push();
  image(piano_pic[3],width/2,height/2,1920,1080);
  //text("this is key scene",width*0.6,height*0.6);
  translate(interact_areas[0].tx,interact_areas[0].ty);
  draw_circle(interact_areas[0]);
  draw_return_button(interact_areas[0]);
  pop();
}

// function play_piano(){
//   push();
//   //text("this is piano scene",width*0.6,height*0.6);
//   draw_keys();
//   draw_return_button(return_button);
//   pop();
// }

//draw piano keys
// function draw_keys(){
//   push();
//   var w = width / 10;
//   var x = width/2;
//   for (var i = 0; i < 3; i++) {
//     // If the mouse is over the key
//     if (mouseX > x-w/2
//       && mouseX < x + w/2
//       && mouseY < height/2+(height-300)/2
//       && mouseY > height/2-(height-300)/2) {
//       // If we're clicking
//       if (mouseIsPressed) {
//         fill(0,0,0);
//         piano_sound[i].play();
//       // Or just rolling over
//       } else {
//         fill(127);
//       }
//     } else {
//       fill(200);
//     }
//     rect(x, height/2, w-1, height-300);
//     x+=w;
//   }
//   pop();
// }
