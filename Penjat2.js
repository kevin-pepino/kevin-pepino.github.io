/********************/
/* Victor M. Falcon */
/* DAW2 - M06       */
/* 28 / 09 / 2022   */
/********************/

let wins = localStorage.getItem("wins"); //COUNTER FOR WINS
if(wins == null) wins = 0;
let losses = localStorage.getItem("losses"); //COUNTER FOR LOSSES
if(losses == null) losses = 0;
let matches = localStorage.getItem("matches"); //COUNTER FOR MATCHES
if(matches == null) matches = 0;
let text = ""; //THE SOLUTION INPUTTED BY THE PLAYER
let clear = ""; //THE SOLUTION INPUTTED BY THE PLAYER, ACCENTS CORRECTED
let toSolve = ""; //TO DISPLAY HOW MUCH HAS BEEN SOLVED
let answered = ""; //TOTAL OF LETTERS SOLVED
let counter = 0; //COMPARED TO CLEAR.LENGTH AS TO WHETHER THE GAME IS OVER OR NOT
let check = false; //CHECKS WHETHER TO WRITE UNDERSCORE OR NOT
let randomizer; //FOR RANDOM PROMPTS ON ANSWER
let fails = ""; //TOTAL ERRORS 
let spaces = 0; //TAKES SPACES INTO CONSIDERATION FOR THE CLEAR.LENGTH
let attempts = 6; //ATTEMPTS REMAINING

function answerInput()
{
    document.getElementById("title").innerText = "ENTER THE WORD TO GUESS";
    document.getElementById("buttons").innerHTML = `<input id="textvalue" type="text" value="" maxlength="30"><button type="submit" id="textbtn" onclick="novaPartida()">ENTER</button>`;
    document.getElementById("quit").innerHTML = `<button class="quitbtn" onclick="continueToMenu()">GO BACK</button>`;
}

//STARTS A NEW GAME FROM SCRATCH. RESETS ALL VARIABLES TO ITS DEFAULT STATE
function novaPartida()
{
    text = document.getElementById("textvalue").value;
    if(text.length == 0)
    {
        document.getElementById("title").innerText = "TRY INPUTTING IT AGAIN";
    }
    
    else
    {
        answered = "";
        attempts = 6;
        fails = "";
        spaces = 0;
        counter = 0;
        clear = "";

        //CORRECTS ACCENTS FOR THE SENTENCE
        for(i = 0; i < text.length; i++)
        {
            clear += letterCheck(text.charAt(i));
        }

        //CAPITALIZES THE SENTENCE
        clear = clear.toUpperCase();

        for(i = 0; i < clear.length; i++)
        {
            if(clear.charAt(i) == ' ' || 
               clear.charAt(i) == '\''||
               clear.charAt(i) == '"'||
               clear.charAt(i) == '.'||
               clear.charAt(i) == ','||
               clear.charAt(i) == '!'||
               clear.charAt(i) == '?'||
               clear.charAt(i) == '-') 
            {
                spaces++;
            }
        }
        eraseButtons();

        document.getElementById("title").innerText = "GAME START";
        printTable();
    }
}

//PRINTS THE WORD INTO THE VARIABLE toSolve ACCORDING TO HOW MUCH IT HAS BEEN SOLVED
function printTable()
{
    counter = 0;
    toSolve = "";
    check = false;
    document.getElementById("abecedari").innerHTML = "";
    for(i = 0; i < clear.length; i++)
    {
        if(answered.length > 0)
        {
            for(j = 0; j < answered.length; j++)
            {
                if(clear.charAt(i) == ' ')
                {
                    toSolve += ' ';
                    check = true;
                    break;
                }

                else if(clear.charAt(i) == "'")
                {
                    toSolve += "'";
                    check = true;
                    break;
                }

                else if(clear.charAt(i) == "\"")
                {
                    toSolve += "\"";
                    check = true;
                    break;
                }

                else if(clear.charAt(i) == ".")
                {
                    toSolve += ".";
                    check = true;
                    break;
                }

                else if(clear.charAt(i) == ",")
                {
                    toSolve += ",";
                    check = true;
                    break;
                }

                else if(clear.charAt(i) == "?")
                {
                    toSolve += "?";
                    check = true;
                    break;
                }

                else if(clear.charAt(i) == "!")
                {
                    toSolve += "!";
                    check = true;
                    break;
                }

                else if(clear.charAt(i) == "-")
                {
                    toSolve += "-";
                    check = true;
                    break;
                }

                else if(answered.charAt(j) == clear.charAt(i)) 
                {
                    toSolve += clear.charAt(i);
                    counter++;
                    check = true;
                    break;
                }
            }
            if(!check)
            {
                toSolve += "_";
                
            }
            check = false;
        }
        else
        {
            if(clear.charAt(i) == ' ') toSolve += ' ';
            else if(clear.charAt(i) == '\'') toSolve += '\'';
            else if(clear.charAt(i) == '"') toSolve += '"';
            else if(clear.charAt(i) == '.') toSolve += '.';
            else if(clear.charAt(i) == ',') toSolve += ',';
            else if(clear.charAt(i) == '?') toSolve += '?';
            else if(clear.charAt(i) == '!') toSolve += '!';
            else if(clear.charAt(i) == '-') toSolve += '-';
            else toSolve += '_';
        }
    }
    document.getElementById("jocPenjat").innerHTML = `<div id="texto">${toSolve}</div><div id="imatge"></div>`;
    mostraImatge();
    crearAbecedari();
    document.getElementById("quit").innerHTML = `<button class="quitbtn" onclick="quitGame()">GIVE UP</button>`;

    ending();
}

//GOES BACK TO MENU, BUT ADDS A LOSS TO ITS COUNTER
function quitGame()
{
    document.getElementById("jocPenjat").innerHTML = "";
    document.getElementById("abecedari").innerHTML = "";
    document.getElementById("quit").innerHTML = "";
    resetButtons();
    losses++;
    localStorage.setItem("losses", losses);
    matches++;
    localStorage.setItem("matches", matches);
}

//MAKES AN INPUT ACCORDING TO WHICH BUTTON WAS SELECTED
function clickLletra(letter)    
{
    //COMPARES THE LETTER TO THE SOLUTION
    for(i = 0; i < clear.length; i++)
    {
        if(letter == clear.charAt(i))
        {
            answered += letter;
            check = true;
            
            randomizer = getRandomInt(3)
            switch(randomizer)
            {   
                case 0: document.getElementById("title").innerText = "GOOD JOB!";
                        break;
                case 1: document.getElementById("title").innerText = "NICE!";
                        break;
                case 2: document.getElementById("title").innerText = "KEEP GOING!";
                        break;
            }
            break;
        }
    }

    //SUBTRACTS A LIFE / ATTEMPT IF THE PLAYER MISSES
    if(!check)
    {
        attempts--;
        mostraImatge();
        if(fails.length < 1)
        {
            fails += letter;
        }
        else
        {
            fails += ' / ' + letter;
        }
        randomizer = getRandomInt(3)
        switch(randomizer)
        {   
            case 0: document.getElementById("title").innerText = "OH NO!";
                    break;
            case 1: document.getElementById("title").innerText = "LOOK OUT!";
                    break;
            case 2: document.getElementById("title").innerText = "TRY AGAIN!";
                    break;
        }
    }
    check = false;
    printTable();
    crearAbecedari();
}

//IF THE WORD IS SOLVED OR THE PLAYER RUNS OUT OF ATTEMPTS, THIS WILL ACTIVATE
function ending()
{
    if(counter == clear.length - spaces)
    {
        wins++;
        localStorage.setItem("wins", wins);
        matches++;
        localStorage.setItem("matches", matches);
        document.getElementById("title").innerText = "WELL DONE! YOU WIN!";
        document.getElementById("quit").innerHTML = `<button class="quitbtn" onclick="continueToMenu()">CONTINUE</button>`;
    }

    //IF THE PLAYER RUNS OUT OF ATTEMPTS, THIS WILL DISPLAY
    else if(attempts == 0)
    {
        losses++;
        localStorage.setItem("losses", losses);
        matches++;
        localStorage.setItem("matches", matches);
        document.getElementById("title").innerText = "TOO BAD! YOU LOSE!";
        document.getElementById("quit").innerHTML = `<button class="quitbtn" onclick="continueToMenu()">CONTINUE</button>`;
    }
}

//RESETS THE GAME RIGHT AFTER FINISHING A GAME
function continueToMenu()
{
    document.getElementById("title").innerText = "HANGMAN";
    document.getElementById("abecedari").innerHTML = "";
    document.getElementById("jocPenjat").innerHTML = "";
    document.getElementById("quit").innerHTML = "";
    resetButtons();
}

//DISPLAYS THE TOTAL OF WINS AND LOSSES
function estadistiques()
{
    document.getElementById("quit").innerHTML = "";
    let perWins = Math.round(100 * wins / (matches));
    let perLosses = Math.round(100 * losses / (matches));

    if(wins == 0 && losses == 0 && matches == 0)
    {
        perWins = 0;
        perLosses = 0;
    }

    else
    {
        perWins = Math.round(100 * wins / (matches));
        perLosses = Math.round(100 * losses / (matches)); 
    }

    document.getElementById("title").innerText = "STATISTICS";
    document.getElementById("buttons").innerHTML = `<div id="texto"><div>Total Matches Played: ${matches}</div>
    <div>·Matches Won: (${perWins}%) ${wins}</div>
    <div>·Matches Lost: (${perLosses}%) ${losses}</div></div>
    <button id="btn" onclick="resetButtons()">RETURN</button>`;    
}

//CORRECTS ACCENTS FROM VOWELS
function letterCheck(correction)
{
    if(correction == 'à') correction = 'a';
    else if(correction == 'è' || correction == 'é') correction = 'e';
    else if(correction == 'í' || correction == 'ï') correction = 'i';
    else if(correction == 'ò' || correction == 'ó') correction = 'o';
    else if(correction == 'ú' || correction == 'ü') correction = 'u';

    return correction;
}

//GENERATES ALPHABET BUTTONS
function crearAbecedari()
{
    let abc = "ABCÇDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let sortida = "";
    let buttonCheck = true;

    for(i = 0; i < abc.length; i++)
    {
        for(j = 0; j < answered.length; j++)
        {
            if(abc.charAt(i) == answered.charAt(j))
            {
                buttonCheck = false;
                break;
            }
        }

        for(j = 0; j < fails.length; j++)
        {
            if(abc.charAt(i) == fails.charAt(j)) 
            {
                buttonCheck = false;
                break;
            }
        }

        if(buttonCheck)
        {
            if(counter == clear.length - spaces || attempts == 0) 
                if(attempts == 0) sortida = `<div id="texto">THE SOLUTION WAS "${clear}"</div>`;
                else sortida = "";
            else sortida += `<button class="input" type="button" onclick="clickLletra('${abc.charAt(i).toUpperCase()}')">${abc.charAt(i).toUpperCase()}</button>`;
            
        }
        buttonCheck = true;
    }
    document.getElementById("abecedari").innerHTML = sortida;
}

//DELETES THE MAIN MENU BUTTONS
function eraseButtons()
{
    document.getElementById("buttons").innerHTML = "";
}

//RESETS THE BUTTONS AND TITLE TO THE MAIN MENU
function resetButtons()
{
    document.getElementById("title").innerText = "HANGMAN";
    document.getElementById("buttons").innerHTML = `<button type="button" onclick="answerInput()" id="btn">START GAME</button>
    <button type="button" onclick="estadistiques()" id="btn">STATISTICS</button>`;
    document.getElementById("quit").innerHTML = `<button class="quitbtn" onclick="resetData()">RESET SCORES</button>`;
}

//DISPLAYS THE IMAGE ACCORDING TO THE NUMBER OF ATTEMPTS REMAINING
function mostraImatge()
{
    document.getElementById("imatge").innerHTML = `<img src="img/penjat_${6 - attempts}.png" id="imatgePenjat">`
}

//GENERATES RANDOM NUMBER FOR A RANDOM PROMPT
function getRandomInt(maxx)
{
    return Math.floor(Math.random() * maxx);
}

//RESETS ALL DATA FROM LOCALSTORAGE
function resetData()
{
    document.getElementById("quit").innerHTML = `<div id="texto2">DATA HAS BEEN SUCCESSFULLY RESET!</div>`;
    wins = 0;
    losses = 0;
    matches = 0;
    localStorage.setItem("wins", wins);
    localStorage.setItem("losses", losses);
    localStorage.setItem("matches", matches);
}