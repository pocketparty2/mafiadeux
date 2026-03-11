function generateRoomCode(){
return Math.random().toString(36).substring(2,7).toUpperCase()
}

function createGame(){

let room = generateRoomCode()

document.getElementById("game").innerHTML =
"Room Code: " + room + "<br>Share this with friends!"

}

function joinGame(){

let room = document.getElementById("roomInput").value

document.getElementById("game").innerHTML =
"Joining room " + room

}
