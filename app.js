
let current=0
let score=0
let mode="training"
let selected=[]
let timerInterval=null
let timeLeft=3600

function shuffle(arr){
return arr.sort(()=>Math.random()-0.5)
}

function startTraining(){
mode="training"
selected=shuffle([...questions]).slice(0,20)
startQuiz()
}

function startExam(){
mode="exam"
selected=shuffle([...questions]).slice(0,50)
timeLeft=3600
startTimer()
startQuiz()
}

function startQuiz(){
document.getElementById("menu").style.display="none"
document.getElementById("quiz").style.display="block"
current=0
score=0
render()
}

function startTimer(){
timerInterval=setInterval(()=>{
timeLeft--
if(timeLeft<=0){
finish()
}
renderTimer()
},1000)
}

function renderTimer(){
let t=document.getElementById("timer")
if(!t) return
let min=Math.floor(timeLeft/60)
let sec=timeLeft%60
t.innerText=min+":"+sec.toString().padStart(2,"0")
}

function render(){

let q=selected[current]

let html=""

if(mode==="exam"){
html+=`<div class="timer">Tempo: <span id="timer"></span></div>`
}

html+=`<h3>Domanda ${current+1}/${selected.length}</h3>`
html+=`<div>${q.question}</div>`

q.answers.forEach((a,i)=>{
html+=`<div class="answer" onclick="answer(${i})">${a}</div>`
})

html+=`<button onclick="next()">Prossima</button>`

document.getElementById("quiz").innerHTML=html

renderTimer()
}

function answer(i){

let q=selected[current]

let answers=document.querySelectorAll(".answer")

answers.forEach((el,index)=>{

if(index==q.correct) el.classList.add("correct")

if(index==i && index!=q.correct)
el.classList.add("wrong")

})

if(i==q.correct) score++

}

function next(){

current++

if(current>=selected.length){
finish()
return
}

render()
}

function finish(){

if(timerInterval) clearInterval(timerInterval)

saveStats()

document.getElementById("quiz").innerHTML=
`<h2>Quiz terminato</h2>
<p>Punteggio: ${score}/${selected.length}</p>
<button onclick="location.reload()">Torna al menu</button>`
}

function saveStats(){

let stats=JSON.parse(localStorage.getItem("quizStats")||"{}")

stats.total=(stats.total||0)+1
stats.correct=(stats.correct||0)+score

localStorage.setItem("quizStats",JSON.stringify(stats))

}

function showStats(){

let stats=JSON.parse(localStorage.getItem("quizStats")||"{}")

let html=`<div class="card">
<h3>Statistiche</h3>
<p>Quiz fatti: ${stats.total||0}</p>
<p>Risposte corrette totali: ${stats.correct||0}</p>
<button onclick="location.reload()">Indietro</button>
</div>`

document.getElementById("menu").innerHTML=html

}
