/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES:
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, prevDice, winScore, dice;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    gamePlaying = true; // game starts with the roll click
    if(gamePlaying){

        // 1. Random Number
        dices[0].current = Math.floor(Math.random() * 6) + 1; 
        dices[1].current = Math.floor(Math.random() * 6) + 1; 

        // 2. Display the result
        var diceDOM = document.querySelector('.dice-0');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dices[0].current + '.png';
        var diceDOM = document.querySelector('.dice-1');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dices[1].current + '.png';

        // Display the last dice before getting the new value from the new dice after click
        document.querySelector('#prev-roll-' + activePlayer + '-0').textContent = dices[0].previous;
        document.querySelector('#prev-roll-' + activePlayer + '-1').textContent = dices[1].previous;

        // refreshes the preDice variable with the new dice value  

        // 3. update the round score if the rolled number was not a 1 

        if((dices[0].current === 6 && dices[1].current === 6) || (dices[0].previous === 6 && dices[0].current === 6) || (dices[1].previous === 6 && dices[1].current === 6 ) || (dices[0].previous === 6 && dices[1].current === 6) || (dices[1].previous === 6 && dices[0].current === 6)){ 
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = '0'; 
            nextPlayer();
        } else if((dices[0].current !== 1) && (dices[1].current !== 1)){
            // Add score
            roundScore += dices[0].current;
            roundScore += dices[1].current;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        } else {
            nextPlayer();
        }
        dices[0].previous = dices[0].current;
        dices[1].previous = dices[1].current;
    }
}); // Anonymous function

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        // document.querySelector('#prev-roll-' + activePlayer).textContent = dice.previous; 
        // 1. Add current score to global score
        scores[activePlayer] += roundScore;

        // 2. Update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // 3. Check if player won the game
        if(scores[activePlayer] >= winScore){
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
}); // Anonymous function

function nextPlayer(){
    dices[0].previous = dices[0].current;
    dices[1].previous = dices[1].current;

    document.querySelector('#prev-roll-' + activePlayer + '-0').textContent = dices[0].previous;
    document.querySelector('#prev-roll-' + activePlayer + '-1').textContent = dices[1].previous;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    dices[0].current = 0;
    dices[1].current = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.set-score-button').addEventListener('click', function(){
    if(!gamePlaying){ // score is only changeable when the game has not started
        winScore = document.querySelector('.set-score').value;
        document.querySelector('.winner-score').textContent = 'WINNER SCORE: ' + winScore;
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    winScore = 100; // set to default
    gamePlaying = false;
    dices = [
        {
            current: 0,
            previous: 0,
        },
        {
            current: 0,
            previous: 0,
        }
    ];  

    document.querySelector('.dice-0').style.display = 'none'; // using querySelector to change the CSS of an element
    document.querySelector('.dice-1').style.display = 'none'; // using querySelector to change the CSS of an element


    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('prev-roll-0-0').textContent = '0';
    document.getElementById('prev-roll-0-1').textContent = '0';
    document.getElementById('prev-roll-1-0').textContent = '0';
    document.getElementById('prev-roll-1-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.winner-score').textContent = 'WINNER SCORE: ' + winScore;
}
