
document.addEventListener('DOMContentLoaded', function() {
    ///Get the score elements
    const scoreRedElement = document.querySelector('.scoreboard_scoreRed');
    const scoreYellowElement = document.querySelector('.scoreboard_scoreYellow');

    /// Get the buttons
    /// there are 6 buttons in total, 3 for each team
    const buttonRedMinus = document.getElementById('scoreboard_controls-buttonRed-');
    const buttonRedReset = document.getElementById('scoreboard_controls-buttonRedReset');
    const buttonRedPlus = document.getElementById('scoreboard_controls-buttonRed+');
    const buttonYellowMinus = document.getElementById('scoreboard_controls-buttonYellow-');
    const buttonYellowReset = document.getElementById('scoreboard_controls-buttonYellowReset');
    const buttonYellowPlus = document.getElementById('scoreboard_controls-buttonYellow+');

    /// Add event listeners to the buttons, when button is clicked the 
    ///event listener will update the score
    buttonRedMinus.addEventListener('click', () => updateScore('scoreRed', -1));
    buttonRedReset.addEventListener('click', () => resetScore('scoreRed'));
    buttonRedPlus.addEventListener('click', () => updateScore('scoreRed', 1));
    buttonYellowMinus.addEventListener('click', () => updateScore('scoreYellow', -1));
    buttonYellowReset.addEventListener('click', () => resetScore('scoreYellow'));
    buttonYellowPlus.addEventListener('click', () => updateScore('scoreYellow', 1));

    /// Function to update the score
    function updateScore(team, value) {
        const currentScore = parseInt(document.querySelector(`.scoreboard_${team}`).textContent);
        const newScore = currentScore + value;

        /// Update the score element
        document.querySelector(`.scoreboard_${team}`).textContent = newScore;
    }

    /// Function to reset the score
    function resetScore(team) {
        ///Reset the score to 0
        document.querySelector(`.scoreboard_${team}`).textContent = 0;
    }
    document.getElementById('saveCSVButton').addEventListener('click', saveScoresToCSV);

});






