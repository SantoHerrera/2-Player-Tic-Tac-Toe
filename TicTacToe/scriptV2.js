"use strict";

let AppJs = (function () {

    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let whoseTurn = 0;

    let players = {
        //should have player name
        //name: prompt("Player 2 name"),
        0: {
            mark: "O",
            idBoxClicked: []
        },
        1: {
            mark: "X",
            idBoxClicked: []
        },
        changeTurn: function () {
            whoseTurn = whoseTurn === 1 ? 0 : 1;
        },
        pushAndRearrangeArray: function (whichPlayer, aNumber) {

            let currentPlayer = this[whichPlayer].idBoxClicked;

            currentPlayer.push(aNumber);
            //rearranges array from smallest to largest
            currentPlayer.sort((a, b) => {
                return a - b;
            });
        },
        checkWin: function (combos, clicked) {
            for (let i = 0; i < combos.length; i++) {
                for (let j = combos[i].length - 1; j > -1; j--) {
                    let aTest = combos[i][j];
                    let includesATest = clicked.includes(aTest);

                    if (!includesATest) { break; }

                    if (includesATest && combos[i].length == combos[i].length - j) {
                        return true;
                    }
                }
            } return false;
        },
        clearIdBoxClicked: function (filledArray) {
            let arrayPassedIn = filledArray;

            arrayPassedIn = [];

            return arrayPassedIn;
        }
    }

    let editHTML = {
        editH1: function (changeTextTo) {
            let h1 = document.getElementById("playersturn");

            h1.innerHTML = changeTextTo;
        },
        markBox: function (whatMark) {

            let clicked = event.target;

            clicked.textContent = whatMark;
        },
        appendElement: function (element, tag) {
            let typeOFElement = document.createElement(tag);
            element.appendChild(typeOFElement);
        },
        removeEventListen: function (elementCLickedArray, removeFunction) {
            for (let i = 0; i < elementCLickedArray.length; i++) {
                elementCLickedArray[i].removeEventListener("click", removeFunction);
            }
        }
    }

    let handlers = {
        recordClicked: function (e) {

            players.pushAndRearrangeArray(whoseTurn, e);

            let checkOnPLayer = players[whoseTurn];

            if (checkOnPLayer.idBoxClicked.length >= 3) {
                let didYouWin = players.checkWin(winCombos, checkOnPLayer.idBoxClicked);

                didYouWin ? editHTML.editH1(`Player ${players[whoseTurn].mark} has Won`) : console.log("youve but lost");
            }
        },
        restartGame: function () {
            players.clearIdBoxClicked(players[whoseTurn].idBoxClicked);
            //console.log(players[whoseTurn].idBoxClicked, "inside restartGame");

            // players.removeEventListener(allGridBoxes, runThis)
            editHTML.removeEventListen(allGridBoxes, runThis);
        },
        startGame: function () {
            editHTML.markBox(players[whoseTurn].mark);
            //handlers.updateHTML(players[whoseTurn].mark);


            players.changeTurn();
            handlers.recordClicked(parseInt(event.target.id));
            // console.log(players[whoseTurn].idBoxClicked);

            editHTML.editH1(players[whoseTurn].mark);

            event.target.removeEventListener("click", handlers.startGame);
        }
    }

    let allGridBoxes = document.getElementsByClassName("grid");

    for (let i = 0; i < allGridBoxes.length; i++) {
        allGridBoxes[i].addEventListener("click", function runThis(e) {

            editHTML.editH1(players[whoseTurn].mark);

            players.changeTurn();

            editHTML.markBox(players[whoseTurn].mark);
            //handlers.updateHTML(players[whoseTurn].mark);

            handlers.recordClicked(parseInt(e.target.id));
            // console.log(players[whoseTurn].idBoxClicked);

            //shoudl append CHild span
            e.target.removeEventListener("click", runThis);

            //console.log(whoseTurn, players[whoseTurn].idBoxClicked);

            // console.log(this);

        }


        )

    }

    let button = document.getElementById("restartGameButton");

    button.addEventListener("click", function restart(e) {
        handlers.restartGame();

    })

})();

//let divBoard = document.getElementById("thegrid");
//instaed of adding event lister to the grid, add it too all elemetns inside grid
//that way I can remove it 

//check how many element are embedded into thegrid

//let someFuckeryClass = document.getElementsByClassName("grid");
//for(let i = 0; i < someFuckeryClass.length; i++){
//	console.log(someFuckeryClass[i]);
//};

//divBoard.addEventListener("click", AppJs.changeTurn);




    //should have a linked object with player1 being a node and player2 being the nested object
    //these object will have info such as player names, what symbol they are X or Y,
    //an array of the boxes clicked, this array will reorganize the box id pushed from smallesst to largest


//addeventlisten





//on the HTML form for player names submit button have onclick run function
//that funciton will go through div id="theGrid" and give them addEventLIstener("click", appJs(PARAMETER));
//
//appJS parameter will be an event.target.id
//
/*
checkWinner: function (combos, clicked, player) {
    let rowOfCom = [];
    let threeStrikes = [];

    for (let i = 0; i < combos.length; i++) {
        //
        CombosXY = combos[i];
        for (let j = 0; j < clicked.length; j++) {
            if (rowOfCom.includes(clicked[j])) {
                threeStrikes.push(clicked[j]);
                if (threeStrikes.length === 3) {
                    alert(player + " has won");
                }
            }
        }
        threeStrikes = [];
    }
}
*/






/*
updateHTML: function (e) {
    //this function doesnt get called
    editHTML.markBox(e);
    players.changeTurn();
    editHTML.editH1(e);
}
*/