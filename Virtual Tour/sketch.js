var walter_pic;
var sceneControl=0;
var interact_areas=[];
var return_button;
//var transition;
var tint_value;
var enlarge = false;
var texts = [];

function preload(){
  walter_pic = [
    loadImage('assets/image/Walter Front 2560px.jpg'),
    loadImage('assets/image/Walter Dampers 2560px.jpg'),
    loadImage('assets/image/Walter Front Branding 2560px.jpg'),
    loadImage('assets/image/Walter Action Top 2560px.jpg'),
    loadImage('assets/image/Walter Catcher 2560px.jpg'),
    loadImage('assets/image/Walter Front Without Lid 2560px.jpg'),
  ];
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  ellipseMode(CENTER);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(60);
  //return button
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
  //string
  interact_areas.push ({
    x : width*0.45,
    y : height*0.35,
    w : 70,
    enlarge : false
  });
  //brand
  interact_areas.push ({
    x : width*0.5,
    y : height*0.45,
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
  //damper
  interact_areas.push ({
    x : width/2,
    y : height*0.3,
    w : 70,
    enlarge : false
  });
  //lid off
  interact_areas.push ({
    x : width*0.4,
    y : height*0.25,
    w : 70,
    enlarge : false
  });

  //transition = {counter: 0, playing: false, fadeOut: false};
  tint_value = {alpha:100, finish:false, begin:false};

  texts.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n Cras eget nunc et enim laoreet pretium. \nSed scelerisque iaculis tempor.\n Praesent auctor, sem at sollicitudin tincidunt, \nrisus lacus consectetur nibh, \neu suscipit nulla dui pulvinar turpis.\n ');
  texts.push('Integer ut sagittis metus. \nMorbi facilisis, purus dapibus porttitor aliquam, \nante metus tempus justo, \nnec sagittis sapien turpis quis erat.\n Proin finibus orci id interdum mattis. \nVivamus pretium vitae eros eget scelerisque.\n')
}

function draw(){
  background(255);
  //playTransition(transition);
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
  if (sceneControl==4) {
    show_hammer();
  }
  if (sceneControl==5) {
    show_capoff();
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
    else if (dist(interact_areas[5].x,interact_areas[5].y,mouseX,mouseY)<=interact_areas[5].w){
      interact_areas[5].enlarge = true;
    }
    else {
      interact_areas[1].enlarge = false;
      interact_areas[2].enlarge = false;
      interact_areas[5].enlarge = false;
    }
  }
  else if (sceneControl==1){
      if (dist(interact_areas[0].x,interact_areas[0].y,mouseX,mouseY)<=interact_areas[0].w){
        interact_areas[0].enlarge = true;
      }
      else{
        interact_areas[0].enlarge = false;
        interact_areas[4].enlarge = false;
      }
  }
  else {
    if (dist(interact_areas[3].x,interact_areas[3].y,mouseX,mouseY)<=interact_areas[3].w){
      interact_areas[3].enlarge = true;
    }
    else if (dist(interact_areas[0].x,interact_areas[0].y,mouseX,mouseY)<=interact_areas[0].w){
      interact_areas[0].enlarge = true;
    }
    else if (dist(interact_areas[4].x,interact_areas[4].y,mouseX,mouseY)<=interact_areas[4].w){
      interact_areas[4].enlarge = true;
    }
    else{
      interact_areas[0].enlarge = false;
      interact_areas[3].enlarge = false;
      interact_areas[4].enlarge = false;
    }
  }
}

function mousePressed(){
  if(sceneControl==0&&mouseIsPressed){
    //click rear area
    if((dist(interact_areas[1].x,interact_areas[1].y,mouseX,mouseY)<=interact_areas[1].w)) {
      sceneControl=1;
      start_fade_in(tint_value);
      // startTransition(transition);
    }
    //click key area
    if((dist(interact_areas[2].x,interact_areas[2].y,mouseX,mouseY)<=interact_areas[2].w)){
      sceneControl=2;
      start_fade_in(tint_value);
      // startTransition(transition);
    }
    //click cap area
    if((dist(interact_areas[5].x,interact_areas[5].y,mouseX,mouseY)<=interact_areas[5].w)){
      sceneControl=5;
      start_fade_in(tint_value);
      // startTransition(transition);
    }
  }
  //click keyboard part
  else if(sceneControl==2
    &&dist(interact_areas[3].x,interact_areas[3].y,mouseX,mouseY)<=interact_areas[3].w){
      sceneControl=3;
      start_fade_in(tint_value);
      // startTransition(transition);
  }
  //click hammer part
  else if(sceneControl==3
    &&dist(interact_areas[4].x,interact_areas[4].y,mouseX,mouseY)<=interact_areas[4].w){
      sceneControl=4;
      start_fade_in(tint_value);
      // startTransition(transition);
  }
  //click return button
  else if (sceneControl!=0
    &&dist(interact_areas[0].x,interact_areas[0].y,mouseX,mouseY)<=interact_areas[0].w) {
    sceneControl=0;
    start_fade_in(tint_value);
    // startTransition(transition);
  }
}

//draw interaction area circle
function draw_circle(i){
  push();
  noFill();
  strokeWeight(5);
  if(i.enlarge){
    //i.w+=(i.w*1.2-i.w)*0.1;
    stroke(255,180)
    ellipse(i.x,i.y,i.w*1.2);
  }
  else{
    stroke(255, 100);
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
  image(walter_pic[0],width/2,height/2,width,height);
  // interact_areas.map(draw_circle);
  draw_circle(interact_areas[1]);
  draw_circle(interact_areas[2]);
  draw_circle(interact_areas[5]);
  show_text(texts[0],width*.02,height/14);
  pop();
}

function show_text(r,w,h){
  textSize(16);
  stroke(255,100);
  fill(255,100);
  textLeading(20);
  textAlign(LEFT);
  text(r,w,h);
}

function show_rear(){
  push();
  image(walter_pic[1],width/2,height/2,width,height);
  //text("this is rear scene",width*0.4,height*0.4);
  translate(interact_areas[0].tx,interact_areas[0].ty);
  draw_circle(interact_areas[0]);
  draw_return_button(interact_areas[0]);
  show_text(texts[0],width*.6,height/14);
  pop();
}

function show_tag(){
  push();
  image(walter_pic[2],width/2,height/2,width,height);
  //text("this is tag scene",width*0.6,height*0.6);
  draw_circle(interact_areas[3]);
  translate(interact_areas[0].tx,interact_areas[0].ty);
  draw_circle(interact_areas[0]);
  draw_return_button(interact_areas[0]);
  show_text(texts[1],width*.02,height/14);
  pop();
}

function show_key(){
  push();
  image(walter_pic[3],width/2,height/2,width,height);
  //text("this is key scene",width*0.6,height*0.6);
  draw_circle(interact_areas[4]);
  translate(interact_areas[0].tx,interact_areas[0].ty);
  draw_circle(interact_areas[0]);
  draw_return_button(interact_areas[0]);
  pop();
}

function show_hammer(){
  push();
  image(walter_pic[4],width/2,height/2,width,height);
  //text("this is key scene",width*0.6,height*0.6);
  translate(interact_areas[0].tx,interact_areas[0].ty);
  draw_circle(interact_areas[0]);
  draw_return_button(interact_areas[0]);
  pop();
}

function show_capoff(){
  push();
  image(walter_pic[5],width/2,height/2,width,height);
  // interact_areas.map(draw_circle);
  // draw_circle(interact_areas[1]);
  // draw_circle(interact_areas[2]);
  translate(interact_areas[0].tx,interact_areas[0].ty);
  draw_circle(interact_areas[0]);
  draw_return_button(interact_areas[0]);
  //texpost("this is front scene",width/2,height/2);
  pop();
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
