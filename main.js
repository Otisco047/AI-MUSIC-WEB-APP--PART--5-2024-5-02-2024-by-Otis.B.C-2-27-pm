peter_pan = "";
harry_potter = "";
lwx = "";
lwy = "";
rwx = "";
rwy = "";
lw_score = "";
rw_score = "";

function preload() {
    peter_pan = loadSound("music2.mp3")
    harry_potter = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill("#FF0000");
    stroke("#FF0000");
    if (lw_score > 0.2) {
        circle(lwx, lwy, 20);
        if (peter_pan.isPlaying() == false) {
            harry_potter.stop();
            peter_pan.play();
            document.getElementById("song_name").innerHTML = "Song name : peter pan";
        }
    }
    if (rw_score > 0.2) {
        circle(rwx, rwy, 20);
        if (harry_potter.isPlaying() == false) {
            peter_pan.stop();
            harry_potter.play();
            document.getElementById("song_name").innerHTML = "Song name : harry potter";
        }
    }
}

function modelLoaded() {
    console.log("Pose Net Is Initialized");
}

function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);
        lwx = result[0].pose.leftWrist.x;
        lwy = result[0].pose.leftWrist.y;
        rwx = result[0].pose.rightWrist.x;
        rwy = result[0].pose.rightWrist.y;
        lw_score = result[0].pose.keypoints[9].score;
        rw_score = result[0].pose.keypoints[10].score;
    }
}