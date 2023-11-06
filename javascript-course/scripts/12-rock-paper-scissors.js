      // Score object
      // Fetches from local storage
      let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
      };

    // when you remove from local stroage in resetScore func, you need to reset score object.
    // If you dont, this code will crap out when you try to access score.ties/etc. in pickWinner()
    /*
    if(!score){
      score = {
        wins:0,
        losses:0,
        ties:0
      }
    }
    */
    // This code is used by Default Operator above

    updateScoreElement();

    // resetResultElement();
    // resetMovesElement();

    // Pick Conputer Move function
    function pickComputerMove(){
      const randomn_num = Math.random();
      let computer_pick = undefined; // Global variable
      if(randomn_num >= 0 && randomn_num < 1/3){
        computer_pick = 'rock';
      } else if(randomn_num >= 1/3 && randomn_num < 2/3){
        computer_pick = 'paper';
      } else {
        computer_pick = 'scissors';
      }
      return computer_pick;
    }

    // Pick Winner Function
    function playGame(user){
      comp = pickComputerMove();
      if(user==comp){
        score.ties++;
        result = 'Tie';
      } else if(user=='rock'&& comp=='scissors' || user=='paper' && comp=='rock' || user=='scissors' && comp=='paper') {
        score.wins++;
        result = 'Win';
      } else {
        score.losses++;
        result = 'Loss';
      }

      // Local Storage
      // Local storage can only save strings
      localStorage.setItem('score', JSON.stringify(score));
      
      updateResultElement(result);
      updateMovesElement(user, comp);
      updateScoreElement();

      //alert(`You picked ${user}. Computer picked ${comp}. Result is ${result}. Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`)
    };

    // Score Element Section
    function updateScoreElement(){
      document.querySelector(".js-score").innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
    }

    // Result Element Section
    function updateResultElement(result){
      if(result==='Tie'){
        document.querySelector(".js-result").innerHTML = 'You tied.'
      } else if(result==='Win'){
        document.querySelector(".js-result").innerHTML = 'You won.'
      } else {
        document.querySelector(".js-result").innerHTML = 'You lost.'
      };
    }

    function resetResultElement(){
      document.querySelector('.js-result').innerHTML = 'Pick a move.'
    }

    // Moves Element Section
    function updateMovesElement(user, comp){
      // document.querySelector(".js-moves").innerHTML = `You chose ${user}. The computer chose ${comp}.`;
      document.querySelector(".js-moves").innerHTML = `You
      <img src="./images/${user}-emoji.png" class="move-icon">
      <img src="./images/${comp}-emoji.png" class="move-icon">
      Computer.`
    }
    
    // function resetMovesElement(){
    //   document.querySelector(".js-moves").innerHTML = 'Your moves will show up here.'
    // }

    // Reset Score Function
    function resetScore(){
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
      // resetResultElement();
      // resetMovesElement();
    }

    let isAutoPlaying = false;
    let intervalId; // undefined

    /*
      Why we don't replace function autoPlay()
      with an arrow function:
      - Below is easier to read
      - function <name> allows for hoisting
    */

    // Autoplay Function
    function autoPlay() {
      if(!isAutoPlaying){
        isAutoPlaying = true;

        // intervalId = setInterval(function(){
        //   const playerMove = pickComputerMove();
        //   playGame(playerMove);
        // }, 1000);

        // Arrow function substitute
        intervalId = setInterval( () => {
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }, 1000);

      } else {
        isAutoPlaying = false;
        clearInterval(intervalId);
      }
    }

    // OnClick substitutions
    document.querySelector('.js-rock-button').addEventListener('click', () => {
      playGame('rock');
    });

    document.querySelector('.js-paper-button').addEventListener('click', () => {
      playGame('paper');
    });

    document.querySelector('.js-scissors-button').addEventListener('click', () => {
      playGame('scissors');
    });

    // KeyDown Commands
    document.body.addEventListener('keydown', (event) => {
      if(event.key==='r'){
        playGame('rock');
      } else if(event.key==='p'){
        playGame('paper');
      } else if(event.key=='s'){
        playGame('scissors');
      };
    });