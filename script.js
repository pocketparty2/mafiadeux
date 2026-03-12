import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

const firebaseConfig = {
apiKey: "PASTE_YOURS",
authDomain: "PASTE_YOURS",
databaseURL: "PASTE_YOURS",
projectId: "PASTE_YOURS",
storageBucket: "PASTE_YOURS",
messagingSenderId: "PASTE_YOURS",
appId: "PASTE_YOURS"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

let roomCode = ""
let playerName = ""

function generateRoomCode(){
return Math.random().toString(36).substring(2,6).toUpperCase()
}

window.createRoom = function(){

roomCode = generateRoomCode()

document.getElementById("room").innerHTML =
`Room Code: <b>${roomCode}</b>
<br>
<input id="nameInput2" placeholder="Your Name">
<button onclick="joinCreatedRoom()">Join</button>
<div id="players"></div>
<button onclick="startGame()">Start Game</button>`

}

window.joinCreatedRoom = function(){

playerName = document.getElementById("nameInput2").value

const playersRef = ref(db,"rooms/"+roomCode+"/players")

push(playersRef,{name:playerName})

listenForPlayers()

}

window.joinRoom = function(){

roomCode = document.getElementById("roomCodeInput").value
playerName = document.getElementById("nameInput").value

const playersRef = ref(db,"rooms/"+roomCode+"/players")

push(playersRef,{name:playerName})

document.getElementById("room").innerHTML =
`Room: ${roomCode}
<h3>Players</h3>
<div id="players"></div>`

listenForPlayers()

}

function listenForPlayers(){

const playersRef = ref(db,"rooms/"+roomCode+"/players")

onValue(playersRef,(snapshot)=>{

let html=""

snapshot.forEach(player=>{
html += player.val().name + "<br>"
})

document.getElementById("players").innerHTML = html

})

}

window.startGame = function(){

const playersRef = ref(db,"rooms/"+roomCode+"/players")

onValue(playersRef,(snapshot)=>{

let players=[]

snapshot.forEach(player=>{
players.push(player.val().name)
})

assignRoles(players)

},{onlyOnce:true})

}

function assignRoles(players){

let roles = []

roles.push("Mafia")

for(let i=1;i<players.length;i++){
roles.push("Villager")
}

roles = roles.sort(()=>Math.random()-0.5)

players.forEach((player,i)=>{

set(ref(db,"rooms/"+roomCode+"/roles/"+player),roles[i])

})

alert("Roles assigned!")

}
