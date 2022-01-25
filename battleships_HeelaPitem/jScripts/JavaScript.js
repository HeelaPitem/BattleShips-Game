var score = 100;
var quantity;
var data = [];
var hits = 0;

//Click on BattleShip Icon
function openGameContainer() {
    document.getElementById("gameContainer").style.display = 'flex';
    document.getElementById("openingPanel").style.display = 'block';
    document.getElementById("battleshipBtn").style.display = 'none';
    document.getElementById("overlay").style.display = 'block';
}

//After "Start Game" click
function startGameBtn() {

    quantity = document.getElementById("quantity").value;
    randomize(quantity);

    if (quantity > 0) {
        document.getElementById("openingPanel").style.display = 'none';
        document.getElementById("gamePanel").style.display = 'block';
        document.getElementById("restartBtn").style.display = 'inline';
        document.getElementById("info").innerHTML = "";
        document.getElementById("info").style.display = 'none';
        createTable(quantity);
    }
    else {
        document.getElementById("info").innerHTML = "Please select a number between 1 and 10.";
        document.getElementById("info").style.display = 'block';
    }
}

function exit() {
    location.reload();
}

function restart() {
    document.getElementById("openingPanel").style.display = 'block';
    document.getElementById("gamePanel").style.display = 'none';
    document.getElementById("restartBtn").style.display = 'none';
    document.getElementById('tableContainer').removeChild(document.getElementById('gameTable'));
    score = 100;
    data = [];
    hits = 0;
    document.getElementById("score").innerHTML = score;
    document.getElementById("info").innerHTML = "";
    document.getElementById("info").style.display = 'none';
    document.getElementById("info").classList.remove("green");
}

//Creating new Game Table
function createTable(tableSize) {

    let table = document.createElement('table');
    table.id = "gameTable";
    let tbody = document.createElement('tbody');
    var newRow = document.createElement('tr');

    data.forEach((value, i) => {
        var newCell = document.createElement('td');
        newCell.value = value;
        newCell.id = "cell" + i;
        newCell.style.width = (100 / tableSize) + "%";
        newCell.setAttribute("onclick", "revealImg(this)");
        newRow.appendChild(newCell);
        tbody.appendChild(newRow);;

        var next = i + 1;
        if (next % tableSize == 0 && next != data.length) {
            newRow = document.createElement('tr');
            tbody.appendChild(newRow);;
        }
    });
    table.appendChild(tbody);
    document.getElementById('tableContainer').appendChild(table);
}


//Check if clicked cell is hit or miss
function revealImg(x) {

    var cellId = x.id;
    document.getElementById(cellId).removeAttribute("onclick");
    
    //if user misses
    if (x.value == 0) {
        var newScore = Math.floor(score - (100 / (quantity ** 2)));
        document.getElementById("score").innerHTML = newScore;
        score = newScore;

        if (score > 50) {
            x.classList.add("ocean");
        }
        else {
            document.getElementById("gamePanel").style.display = 'none';
            document.getElementById("info").innerHTML = "Oh no! You lost, but no worries! Click the 'restart' button to try again.";
            document.getElementById("info").style.display = 'block';
        }
    }
    else {
        x.classList.add("target");
        hits++;
        if(hits == quantity){
            document.getElementById("gamePanel").style.display = 'none';
            document.getElementById("info").innerHTML = "Yay, You win! Click the 'restart' button to play again.";
            document.getElementById("info").style.display = 'block';  
            document.getElementById("info").className = "green";  
        }
    }
}

//randomize ships in board game
function randomize(x) {

    var cellNum = x ** 2;
    const rndSet = new Set()

    while (rndSet.size < x) {
        var rnd = Math.floor(Math.random() * cellNum);
        rndSet.add(rnd)
    }
    for (var i = 0; i < cellNum; i++) {
        if (rndSet.has(i)) {
            data[i] = 1;
        }
        else {
            data[i] = 0;
        }
    }
}