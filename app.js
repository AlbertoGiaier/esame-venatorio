
let questionsSet = []
let current = 0
let score = 0
let examMode = false

function shuffle(arr){
return arr.sort(()=>Math.random()-0.5)
}

function startTraining(){

examMode = false

questionsSet = shuffle([...questions]).slice(0,20)

startQuiz()

}

function startExam(){

examMode = true

questionsSet = shuffle([...questions]).slice(0,50)

startQuiz()

}

function startQuiz(){

document.getElementById("menu").style.display="none"

current = 0
score = 0

render()

}

function render(){

let q = questionsSet[current]

let html = ""

html += `<h3>Domanda ${current+1}/${questionsSet.length}</h3>`

html += `<p>${q.question}</p>`

q.answers.forEach((a,i)=>{

html += `
<div class="answer">
<label>
<input type="checkbox" value="${i}">
${a}
</label>
</div>
`

})

html += `<button onclick="submitAnswer()">Conferma risposta</button>`

document.getElementById("quiz").innerHTML = html

}

function submitAnswer(){

let q = questionsSet[current]

let checked = [...document.querySelectorAll("input:checked")].map(e=>parseInt(e.value))

checked.sort()

let correct = [...q.correct].sort()

let isCorrect = JSON.stringify(checked) === JSON.stringify(correct)

if(isCorrect) score++

showResult(correct,checked)

}

function showResult(correct,checked){

let answers = document.querySelectorAll(".answer")

answers.forEach((el,i)=>{

if(correct.includes(i)) el.classList.add("correct")

if(checked.includes(i) && !correct.includes(i))
el.classList.add("wrong")

})

document.getElementById("quiz").innerHTML +=
`<button onclick="next()">Prossima domanda</button>`

}

function next(){

current++

if(current >= questionsSet.length){

finish()

return

}

render()

}

function finish(){

document.getElementById("quiz").innerHTML =

`<h2>Quiz terminato</h2>
<p>Punteggio: ${score}/${questionsSet.length}</p>
<button onclick="location.reload()">Menu</button>`

}
