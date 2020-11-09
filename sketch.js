// Koch snowflake
// M. A. Koch 2020
//Instagram: @martinkochdesign

var segments = [];
var len = 500;
var gen = 0;

function setup() {
    createCanvas(800,800);   
}

function draw() { 
    
    background(0);
    stroke(255,255,255);
    point(width/2, height/2);
    makeSnow(100, 0);
    makeSnow(300, 1);
    makeSnow(490, 2);
    makeSnow(700, 3);

    noStroke();
    fill(255, 255, 255);
    textSize(10);
    text("M. A. Koch, PhD. 2020", width-115, height-8);
    
    
    noLoop();

}


function generate(){
    var next = [];
    
    for (s of segments){
        var children = [];
        var p1 = s.a.copy()
        var p5 = s.b.copy();
        var v = s.b.copy(); v.sub(s.a);    
        v = v.div(3);
        var p2 = s.a.copy(); p2.add(v);
        var p3 = p2.copy(); p3.add(v.rotate(-60));
        v.rotate(60);
        var p4 = p5.copy(); p4.sub(v);
        v.rotate(60);
        var p3 = p4.copy(); p3.sub(v);
        children.push(new seg(p1, p2));
        children.push(new seg(p2, p3));
        children.push(new seg(p3, p4));
        children.push(new seg(p4, p5));        
        next = concat(next, children);        
    }    
    
    return next;
}


class seg{

constructor(a_,b_){
this.a = a_;
this.b = b_;
}

show(){
stroke(map(this.a.x, 255, width, 250, 255),map(this.a.y, 255, height, 155, 255),255);
line(this.a.x,this.a.y,this.b.x,this.b.y);
}
}

function createtrongle(len_){
    len = len_;
    segments = [];
    angleMode(DEGREES);
    stroke(255,255,255);
    strokeWeight(3);
    var a = createVector(-len/2,0);
    var b = createVector(len/2,0);
    var s1 = new seg(a,b);
    segments.push(s1);
    a = createVector(len/2,0);
    b = createVector(0,len * 0.866);
    var s2 = new seg(a,b);
    segments.push(s2);
    a = createVector(0,len * 0.866);
    b = createVector(-len/2,0);
    var s3 = new seg(a,b); 
    segments.push(s3);

}

function makeSnow(len_, gen_){
    push();
    len=len_;
    gen=gen_;
    translate(width/2, height/2 - 0.866*len/3);//height/2-0.29*len);
    createtrongle(len);
    for (var i = 0; i < gen; i++){ 
        segments = generate();
        }
    
    for (s of segments){
        s.show();
       }
   pop(); 
}
