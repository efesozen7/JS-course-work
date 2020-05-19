/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores,activePlayer, gamePlaying, winNum;
//var readFromHTML = document.querySelector("#score-0").textContent;
//To select an ID # is used. #current-1
//To select a class . is used. .dice
//To change a css property use .style

function init(){
    gamePlaying = true;
    roundScores = 0;
    scores = [0,0];    
    activePlayer = 0;
    document.querySelector(".dice").style.display = 'none';
    document.querySelector(".dice2").style.display = 'none';

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";   
    document.querySelector(".player-0-panel").classList.remove('active'); 
    document.querySelector(".player-0-panel").classList.add('active');
    document.querySelector(".player-1-panel").classList.remove('active');
    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector(".player-1-panel").classList.remove('winner');






}



function nextPlayer(){
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');
    activePlayer>0 ? activePlayer = 0 : activePlayer = 1;
    roundScores = 0;
    document.querySelector(".player-"+activePlayer+"-panel").classList.add('active');
    }

    init();
//ROLL BUTTON
document.querySelector(".btn-roll").addEventListener("click", function (){
 if(gamePlaying){
    //roll the dice
    
    var dice = Math.floor(Math.random()*6)+1;
    var dice2 = Math.floor(Math.random()*6+1);
 
    var docQuerSelDice = document.querySelector(".dice");
    var docQuerSelDice2 = document.querySelector(".dice2");
    //display the result of the dice 
    docQuerSelDice.style.display = 'block';
    docQuerSelDice2.style.display = 'block';
    docQuerSelDice.src = 'dice-'+dice+'.png';
    docQuerSelDice2.src = 'dice-'+dice2+'.png';
    
    
    if(dice=== 6 && dice2 === 6){
        scores[activePlayer] = 0;
        document.querySelector("#score-"+activePlayer).textContent = scores[activePlayer];
        nextPlayer();
    }
    //add dice to roundScores
    if(dice !== 1 && dice2 !== 1){
        roundScores = roundScores + dice + dice2;

    }else{

        nextPlayer();

    }
    //display the score on current 
    document.querySelector("#current-" + activePlayer).textContent = roundScores;
 }

});


// HOLD BUTTON!!!!!
document.querySelector(".btn-hold").addEventListener("click",function(){
    if(gamePlaying){
   //update scores
    scores[activePlayer] +=roundScores;
    
    //decide to game winning score
    var input = document.querySelector(".win-num").value;
    if(input){
        var winningScore = input;
    }else{
        winningScore = 100;
    }

    //update UI
    document.getElementById("score-"+activePlayer).textContent = scores[activePlayer];
   
    //Reset current scores
    

    if(scores[activePlayer]>winningScore){
        document.querySelector("#name-"+activePlayer).textContent = "Winner!";
        document.querySelector(".dice").style.display = 'none';
        document.querySelector(".dice2").style.display = 'none';
        document.querySelector(".player-"+activePlayer+"-panel").classList.add('winner');
        document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');
        gamePlaying = false;

    }else{
    nextPlayer();
    }
}
});

document.querySelector(".btn-new").addEventListener("click",init);




