const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
var testaudio = Audio('testmusic.mp3');

const server = http.createServer(function(req,res){
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.end("Test Button for audio");
    //var audiobutton = res.object;
    //audiobutton.innerHTML = "Test";

    //var buttonbody = document.getElementsByTagName("body")[0];
    //buttonbody.appendChild(audiobutton);
    //audiobutton.button().click(PlayAudio);
    res.addEventListener("click", PlayAudio());
});

server.listen(port);

function PlayAudio(){
    testaudio.play();
}