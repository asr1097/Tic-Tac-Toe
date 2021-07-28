const TicTacToe = (() => {

    //factory function for a player object
    const Player = (symbol, name) => {
        return {symbol, name}
    };
    
    //player on the move
    let player;

    //global player objects
    let px;
    let po;

    //represents current board
    let boardObj = {
        "0": "",
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": "",
        'counter': 0
    }

    // combinations of squares
    // needed for a win
    let winningComb = [
        //rows
        ["0","1","2"],
        ["3","4","5"],
        ["6","7","8"],
        //columns
        ["0","3","6"],
        ["1","4","7"],
        ["2","5","8"],
        //diagonals
        ["0","4","8"],
        ["2","4","6"]
    ]

    // symbol array for checkWinner()
    let symbolArray = ['X', 'O'];
    
    //generate HTML
    const createBoard = () => {
        let wraper = document.querySelector('.wraper');
        let gridDiv = document.createElement('div');
        gridDiv.classList.add('gridDiv');
        for (let i = 0; i < 9; i++) {
            let gdiv = document.createElement('div');
            gdiv.setAttribute('id', `gdiv${i}`,);
            gdiv.classList.add('gdiv');
            gdiv.dataset.square = `${i}`;
            gridDiv.appendChild(gdiv);
        }
        wraper.appendChild(gridDiv);

        //event listener for 'click' on grid squares
        document.querySelectorAll('.gdiv').forEach(gdiv => gdiv.addEventListener('click',
         addMove));
        
    }
    
    //adds the move to boardObj and some other stuff
    const addMove = (ev) => {
        //get data-square value from target HTML element square;
        //AKA the number of target square
        let square = ev.currentTarget;
        let squareNum = square.dataset.square;

        // check if the clicked square has already
        // been clicked; if so, return  
        if (boardObj[squareNum]) {return};

        //render symbol on square
        renderArray(square);

        //update boardObj
        boardObj[squareNum] = player.symbol;
        boardObj['counter'] += 1;

        //change player for next move
        if (player === px) {player = po}    
        else {player = px};

        //check winner if 5 moves played
        if (boardObj['counter'] >= 5) {
            checkWinner();
        };
    }

    //renders symbol on a grid square
    const renderArray = (sq) => {
        sq.textContent = player.symbol;
    }

    //checks for winner;
    //loops through boardObj keys 3 by 3,
    //according to winningComb combinations and
    //checks if all 3 squares(keys) have the same symbol;
    //inner for loop loops through symbolArray--
    //--first checks for 'X', then for 'O'
    const checkWinner = () => {
        for (let i = 0; i < winningComb.length; i++){
            for (let j = 0; j < 2; j++) {
                if ((!!boardObj[winningComb[i][0]] && !!boardObj[winningComb[i][1]] && !!boardObj[winningComb[i][2]]) &&
                    (boardObj[winningComb[i][0]] === symbolArray[j]) && 
                    (boardObj[winningComb[i][1]] === symbolArray[j]) &&
                    (boardObj[winningComb[i][2]] === symbolArray[j])) 
                    {if (px.symbol === symbolArray[j]){
                        setTimeout(finished(`${px.name}`), 50)} 
                    else{setTimeout(finished(`${po.name}`), 50)}}
    }}};

    //show the names form, hide the form and
    //start the game when 'start' button is clicked
    const startGame = () => {
        document.querySelector('.formDiv').classList.toggle('form-hide');
        //get players names from form when 'start' is clicked,
        //creates players' objects and calls createBoard
        document.querySelector('.start-btn').addEventListener('click', getData);
    }    

    const finished = (name) => {
        document.querySelectorAll('.gdiv').forEach(btn => btn.removeEventListener('click',
            addMove));
        document.querySelector('.finished').classList.toggle('finished-hide');
        document.querySelector('.winner').textContent = name + ' is the winner!';
        document.querySelector('.restart-btn').addEventListener('click', restart);
    }
    const getData = () => {
        let nameX = document.forms['nameinput']['playerx'].value;
        let nameO = document.forms['nameinput']['playero'].value;
        createPlayers(nameX, nameO);
        document.querySelector('.start-btn').removeEventListener('click', getData);
        document.querySelector('.formDiv').classList.toggle('form-hide');
        if (document.querySelector('.gridDiv') === null) {
            createBoard()}
        else {document.querySelectorAll('.gdiv').forEach(gdiv => gdiv.addEventListener('click',
                addMove))}
    }
    
    const createPlayers = (nameX, nameO) => {
        px = Player("X", nameX);
        po = Player("O", nameO);
        if (px.name === "") {px.name = "Player 'X'"}
        if (po. name === "") {po.name = "Player 'O'"}
        player = px;
    }

    const restart = () => {
        document.querySelector('.restart-btn').removeEventListener('click', restart);
        document.querySelector('.finished').classList.toggle('finished-hide');
        for (let i = 0; i < 9; i++) {
            boardObj[`${i}`] = "";
        }
        boardObj['counter'] = 0;
        player = undefined;
        px = undefined;
        po = undefined;
        document.querySelectorAll('.gdiv').forEach(gd => gd.textContent = "");
        startGame();
    }

    return {startGame}
})();

TicTacToe.startGame();