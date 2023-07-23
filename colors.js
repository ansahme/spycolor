window.addEventListener("load", () => {
    const table = document.getElementById('table');
    const players = getPlayers();
    let currentPlayer =  generateColors(players.get('player1'));

    nextButton = document.getElementById('next-btn');
    nextButton.addEventListener("click", () => {
        while(table.rows.length > 0) {
            table.deleteRow(0);
        }

        const nextPlayer = getNextPlayerId(currentPlayer,players.size)
        currentPlayer = generateColors(players.get(nextPlayer));
    })

})

function generateColors(player) {
    setCurrentPlayer(player);
    const selectedIndex = createRandomIndices(colorObjects.length);
    const expectedIndex = Math.floor(Math.random() * 9);
    const answer = colorObjects[selectedIndex[expectedIndex]].name;

    
    const question = document.getElementById('question');

    question.innerHTML = `I spy with my little eye, the color ${answer}`;

    for (let i = 0; i < 9; i += 3) {
        const row = document.createElement('tr');

        const cell1 = document.createElement('td');
        cell1.style.backgroundColor = colorObjects[selectedIndex[i]].hex;
        setupCellClick(cell1, answer, colorObjects[selectedIndex[i]].name, player);
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.style.backgroundColor = colorObjects[selectedIndex[i+1]].hex;
        setupCellClick(cell2, answer, colorObjects[selectedIndex[i + 1]].name, player)
        row.appendChild(cell2);

        const cell3 = document.createElement('td');
        cell3.style.backgroundColor = colorObjects[selectedIndex[i+2]].hex;
        setupCellClick(cell3, answer, colorObjects[selectedIndex[i + 2]].name, player)
        row.appendChild(cell3);

        table.appendChild(row);
    }
    return player;

}



function setupCellClick(cell, answer, received, player) {
    cell.onclick = () => {
        const result = validate(answer, received)
        cell.textContent = (result ? `\u2713 YES!  \u263A ` : '\u274C');
        if (result) {
            setTextContrastSuccessColor(cell, cell.style.backgroundColor);
            player.addToScore();
        } else {
            setTextContrastColor(cell, cell.style.backgroundColor);
			player.deductScore(2);
        }
        
        
    }
}

function createRandomIndices(max) {
    const list = new Set();
    while (list.size < max) {
        const random = Math.floor(Math.random() * max);
        list.add(random);
    }

    return Array.from(list);
}    

function validate(expected, received) {
    return expected === received;
}

function getLuminance(rgbColor) {
    const [r, g, b] = rgbColor.match(/\d+/g).map(Number);

    // Calculate luminance using the formula for relative luminance (Y) of a color.
    const Y = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    return Y;
}

function setTextContrastColor(element, backgroundRGBColor) {
    const luminance = getLuminance(backgroundRGBColor);
    const textColor = luminance > 0.5 ? '#000000' : '#FFFFFF'; // Use black for light backgrounds, white for dark backgrounds

    element.style.color = textColor;
}

function setTextContrastSuccessColor(element, backgroundRGBColor) {
    const luminance = getLuminance(backgroundRGBColor);
    const textColor = luminance > 0.5 ? '#00FF000' : '#00FF00'; // Use black for light backgrounds, white for dark backgrounds

    element.style.color = textColor;
}

