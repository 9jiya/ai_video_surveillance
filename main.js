status="";
objects=[];
function preload(){
    video = createVideo("video.mp4");
}
function setup(){
    canvas = createCanvas(480,300);
    canvas.center();
    video.hide();
}
function start(){
    objectDetection = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video,0,0,480,300);
    if(status != ""){
        objectDetection.detect(video,gotResults);
        for(var i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objecs : "+objects.length;

            fill("pink");
            stroke("pink");
            noFill();
            c = floor(objects[i].confidence*100);
            text(objects[i].label+" "+c+"%",objects[i].x+15,objects[i].y+15);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}