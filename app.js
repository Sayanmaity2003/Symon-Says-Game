let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let highScore = 0;
let started = false; //we have used this to start the game only once "on the first key press"
let level = 0;

let h2 = document.querySelector("h2");
//Step 1
document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game is Started");
        started = true;
        levelUp();
    }
});

//Step 2
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function levelUp(){
    userSeq = [];
    level++;    
    h2.innerText = level;

    //random btn choose
    let randIdx = Math.floor(Math.random()*3); //Randomly selects index 0 - 2
    let randColor = btns[randIdx]; //set the color according to the index of the array
    let randBtn = document.querySelector(`.${randColor}`); //set the button according to the color
    gameSeq.push(randColor);
    console.log("Game: ",gameSeq);
    gameFlash(randBtn);
}

//step 2
function checkAns(idx){
    // console.log("Current level: ",level);
    // let idx = level-1;
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        if(highScore<level){
            highScore = level;
        }
        // console.log(highScore);
        h2.innerHTML = `Game Over! Your score is <b>${level}</b><br><i>High Score is ${highScore}<i></br>Press ant key to start`;
        h2.style.color = "blue";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "white";
        }, 180);
        reset();
    }
}
function btnPress(){
    // console.dir(this);
    let btn = this;
    userFlash(btn);
    userSeq.push(btn.getAttribute("id"));
    console.log("User: ",userSeq);
    // console.log(userSeq);
    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){  // it adds click property to all the buttons
    // console.dir(btn);
    btn.addEventListener("click",btnPress);
}
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}