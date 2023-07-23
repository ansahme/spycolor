function getPlayers() {
    const playersContainer = document.getElementById("players-list")
    const numberOfPlayers = getNumberOfPlayers();
    const map = new Map();

    for (let i = 0; i < Number(numberOfPlayers); i++){
        const playerName = prompt(`Enter name of player ${i + 1}:`, `Player${i + 1}`);
        const id = `player${i + 1}-li`;
        map.set(`player${i + 1}`, new Player(playerName, `player${i + 1}`,id));
        
        const li = document.createElement('li');
       // li.innerHTML = `<div id="${id}"><h3 class="player-h3" id="player${i + 1}-h3">${playerName}: </h3><span class="score" id="score-${i + 1}">0</span></div>`;
         li.innerHTML = `<div>
			<ul>
             <li id="${id}" style="float:left"><h3 class="player-h3" id="player${i + 1}-h3">${playerName}:</h3></li>
             <li style="float:right"><span class="score" id="score-${i + 1}">0</span></li>
         </ul></div>`;
         playersContainer.appendChild(li);
    }

    return map;
}


function getNumberOfPlayers() {
    const userInput = prompt('How many players?:', 3);
    return userInput;
}


function setCurrentPlayer(player) {
    player.setActive();
}

function getNextPlayerId(player, total) {
    player.setInActive();
    const currPlayerNumber = Number(player.id.charAt(player.id.length - 1));
    const nextPlayerNumber = (currPlayerNumber + 1);
    return nextPlayerNumber > total ? `player1` : `player${nextPlayerNumber}`;
}


class Player {
    constructor(name, id, elementId) {
        this.name = name;
        this.score = 0;
        this.id = id;
        this.elementId = elementId;
    }

    setActive = () => {
        const element = document.getElementById(this.elementId);
        element.style.backgroundColor = `#cddc39`;
    }

    setInActive = () => {
        const element = document.getElementById(this.elementId);
        element.style.backgroundColor = ``;
    }

    addToScore() {
        this.score += 10;
        const scoreEle = document.getElementById(`score-${this.id.charAt(this.id.length - 1)}`);
        scoreEle.innerHTML = this.score;
    }
	
	deductScore(score){
		 this.score -= score;
        const scoreEle = document.getElementById(`score-${this.id.charAt(this.id.length - 1)}`);
        scoreEle.innerHTML = this.score;
	}
}

