// grab elements from the DOM
const letters = document.querySelector("#letter_container");
const options = document.querySelector("#options_container");
const userInput = document.querySelector("#user_input_container");
const newGame = document.querySelector("#new_game_container");
const newGameButton = document.querySelector("#new_game_button");
const board = document.querySelector("#board")
const result = document.querySelector("#result_prompt")
const pinned = document.querySelector(".pinned")

//genres and anime for the genre
const genres = {
    shonen:[
        'Demon Slayer',
        'Spy x Family',
        'Chainsaw Man',
        'Bleach TYBW',
        'Attack on Titan'
    ],
    shoujo:[
        'Romantic Killer',
        'Kaguya-sama',
        'My Dress Up Darling',
        'Call of the Night',
        'Fruits Basket'
    ],
    seinen:[
        'Bungo Stray Dogs',
        'Mushi-shi',
        'Fate/Zero',
        'Ghost In The Shell',
        'Monster'
    ],
    josei:[
        'Chihayafuru',
        'Princess Jellyfish',
        'Honey and Clover',
        'Bunny Drop',
        'Nana'
    ]
};
//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display genres buttons
const displayGenres = () =>{
   options.innerHTML += '<h3>Please Select a Genre</h3>';
    let buttonCon = document.createElement('div');
    for (let value in genres) {
        buttonCon.innerHTML += `<button class ="genres" onclick="createWord('${value}')">${value}</button>`;     
    }
    options.appendChild(buttonCon)
}

// make all buttons blocked
const blocker = () => {
    let genreButtons = document.querySelectorAll('.genres');
    let letterButtons = document.querySelectorAll('.letters');
    //disable all options
    genreButtons.forEach((button) =>{
        button.disabled = true;
    });

    //disable all letters
    letterButtons.forEach((button) =>{
        button.disabled.true;
    });
    newGame.classList.remove('hide');
};

//word creater
const createWord = (optionValue) => {
    let genreButtons = document.querySelectorAll('.genres');
    // if optionValue is the same as the innertext then highlight the button
    genreButtons.forEach((button) =>{
        if(button.innerText.toLowerCase() === optionValue) {
            button.classList.add('active');
        }
        button.disabled = true;
    })

    //initailly hide letters and clear previous word
    letters.classList.remove('hide');
    userInput.innerText = "";

    let optionArray = genres[optionValue];
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();
     //replace everyletter with span containing dash
    let displayItem = chosenWord.replace(/./g,`<span class = "dashes">_</span>`);
    //display each element as span
    userInput.innerHTML = displayItem;
};
// function to trigger my rocket animation
const start = () => {
    pinned.classList.remove("hide")
}
//initial function (called when page loads up or when new game button is pressed
const initializer = () => {
    winCount = 0;
    count = 0;

    //remove all content from DOM and and hide all the letters button
    userInput.innerHTML = "";
    options.innerHTML = ""; 
    letters.classList.add("hide");
    newGame.classList.add("hide");
    letters.innerHTML = "";
    
    //creating letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        //numbers for a to z
        button.innerText = String.fromCharCode(i);
        //letter button click
        button.addEventListener("click", () =>{
            let charArray = chosenWord.split("");
            //filters the character array for any dashes slashes or spaces
            let filtered = charArray.filter(space = (multi) => { return multi == ' ' || multi == '/' || multi == '-'});
            // a variable equal to the length of previous array to be subracted from char array for win count 
            let difference = filtered.length;
            let dashes = document.getElementsByClassName("dashes");
            //if array has the clicked button replace the dash if not draw on canvas
            if (charArray.includes(button.innerText)){
                charArray.forEach((char, index) =>{
                    //if letter is array is the same as button
                    if (char === button.innerText){
                        //replace dash with letter
                        dashes[index].innerText = char;
                        //increase counter by 1
                        winCount += 1;
                        //if win count equals word length minus spaces dashes or slashes
                        if(winCount == (charArray.length-difference)){
                            start()
                            result.innerHTML = `<h2 class='winning_message'>You Won!!</h2><p>Checkout this Anime <span>${chosenWord}</span></p>`;
                            //block all buttons
                            blocker();
                        }
                    }
                });
            }else{
                //lose count
                count += 1;
                //for drawing Hero
                drawMan(count);
                //count == 6 because of total body parts
                if (count == 6){
                    result.innerHTML = `<h2 class='losing_message'>Game Over</h2><p>You should still probably give <span>${chosenWord}</span> a watch</p>`;
                    blocker();
                }
            }
            //disable clicked button
            button.disabled = true;
        })
        letters.append(button);
    }
    displayGenres();
    //call to canvasCreator to reset canvas
    let {initialDrawing} = canvasCreator();
    //Initial drawing would draw the frame
    initialDrawing();
};

//canvas
const canvasCreator = () => {
    let context = board.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 8;

    //drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };
    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };
    const body = () =>{
        drawLine(70, 40, 70, 80);
    };
    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    }
    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };
    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };
    const rightLeg =() => {
        drawLine(70, 80, 90, 110);
    };

    //initial frame
    const initialDrawing = () => {
        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
   
    };

    return{initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg};
    };
    
    //draw the man
    const drawMan = (count) => {
        let {head, body, leftArm, rightArm, leftLeg, rightLeg} = canvasCreator();
        switch(count){
            case 1:
                head();
                break;
            case 2:
                body();
                break;
            case 3:
                leftArm();
                break;
            case 4:
                rightArm();
                break;
            case 5:
                leftLeg();
                break;
            case 6:
                rightLeg();
                break;
            default:
                break;

        }
    };


    //New Game
    newGameButton.addEventListener("click", initializer);
    window.onload = initializer;