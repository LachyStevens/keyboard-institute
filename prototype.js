var http = require('http');

http.createServer(function(request,response){
    var audiobutton = document.createElement("button");
    audiobutton.innerHTML = "Test";

    var buttonbody = document.getElementsByTagName("body")[0];
    buttonbody.appendChild(audiobutton);

    audiobutton.addEventListener("click", PlayAudio());
}).listen(9999)

function PlayAudio(){
    var testaudio = new Audio('testmusic.mp3');
    testaudio.play();
}