let image = document.querySelector('img');
image.classList.add('hanged');
const categories = [["kot", "lew", "kapibara"],
    [ "madryt", "amsterdam", "praga"],
    [ "ptaki"]];
let chosenCategory;// wybrana kategoria
let word; //wylosowane słowo
let placeholder;
let counter=0;
let lives =5;
let substring;
let hintText="";
let returnButton= document.querySelector('#menu');
let persons = JSON.parse(localStorage.persons);
let userName= document.querySelector('#userName');
let currentUser = JSON.parse(localStorage.getItem('user'));
userName.textContent = currentUser[0].name;
let ifCorrect = document.querySelector('#correct') ;
let ifFailure=document.querySelector('#failed');

let buttonslist =document.querySelectorAll('.guessBox');
let key;
let duplicates=[];

//let keyHolder;
function createBoard(){
    let parent = document.querySelector('.wrapper')
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for( let i = 0 ; i < 26; i ++){
        let box = document.createElement('button');
        parent.appendChild(box);
        box.classList.add('guessBox');
        box.id = i+ 1;
        box.textContent = letters[i];
        letters[i] ++;
    }
}
createBoard();
function startGame () {
    //keyHolder=[];
    document.addEventListener('keydown', event => {
        event.preventDefault();

        const charList = 'abcdefghijklmnopqrstuvwxyz';
        key = event.key.toLowerCase();
        if (charList.indexOf(key) === -1) return;
        keyHolder =[];
        keyHolder.push(key)
        event.keyCode.onkeydown= keyHandler();

        for (let j = 0; j < buttonslist.length; j++) {
            if(buttonslist[j].innerHTML ==keyHolder) {
                buttonslist[j].classList.add('red');
                buttonslist[j].disabled = true;
            }}


    });


}
startGame();




function keyHandler () {

    let hang = 0;
    let selectLive = document.querySelector('#mylives');
    selectLive.textContent = "Twoje życia : " + lives;

    if (duplicates.includes(key)) {
    }

    else {
        duplicates.push(key);

        for (let i = 0; i < keyHolder.length; i++) {
            substring = placeholder.textContent;
            selectLive.textContent = "Twoje życia : " + lives;
            if (lives <= 0) {
                document.querySelector('#clue').textContent = "Przegrałeś wylosuj ponownie! Poprawnym słowem było słowo : " + word;
            } else if (placeholder.innerHTML === word) {
                document.querySelector('#clue').textContent = " Brawo! Wygrałeś!";
            } else {
                for (let j = 0; j < word.length; j++) {
                    if (word.charAt(j) === keyHolder[i]) {
                        let substring1 = substring.substring(0, j);
                        let substring2 = substring.substring(j + 1, substring.length);
                        substring = substring1 + word.charAt(j) + substring2;
                        placeholder.innerHTML = substring;
                        hang = 1;


                    }
                }
                if (hang === 0) {

                    let image = document.querySelector('img');
                    lives--;
                    selectLive.textContent = "Twoje życia : " + lives;
                    counter++;
                    image.src = "./images/" + counter + ".png";

                }

                hang = 0;
                //localStorage aktualizowanie przegranych
                if (lives <= 0) {
                    document.querySelector('#clue').textContent = "Przegrałeś wylosuj ponownie! Poprawnym słowem było słowo : " + word;
                    ifFailure.textContent = "Przegrana";
                    let elems = document.getElementsByClassName("guessBox");
                    for (let i = 0; i < elems.length; i++) {
                        elems[i].disabled = true;
                        elems[i].classList.add('red');
                        document.onkeydown = function (e) {
                            e.preventDefault();
                        }//blokada inputu
                    }
                    for (let i = 0; i < persons.length; i++) {
                        if (currentUser[0].name === persons[i].name) {
                            persons[i].loose += 1
                            break;
                        }
                    }
                    localStorage.setItem("persons", JSON.stringify(persons));
                }
                // LocalStorage aktualizowanie wygranych
                else if (placeholder.innerHTML === word) {
                    document.querySelector('#clue').textContent = " Brawo! Wygrałeś!";
                    ifCorrect.textContent = "Wygrana";
                    let elems = document.getElementsByClassName("guessBox");
                    for (let i = 0; i < elems.length; i++) {
                        elems[i].disabled = true;
                        elems[i].classList.add('red');
                        document.onkeydown = function (e) {
                            e.preventDefault();
                        }//blokada inputu
                    }
                    for (let i = 0; i < persons.length; i++) {
                        if (currentUser[0].name === persons[i].name) {
                            persons[i].win += 1
                            break;
                        }
                    }
                    localStorage.setItem("persons", JSON.stringify(persons));
                }
            }
            ;
        }

    }
}
// Ustawianie wyboru kategorii
function chooseCat () {
    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    console.log(word);
    if (chosenCategory === categories[0]) {
        document.querySelector('#clue').textContent= "Wybrana kategoria: zwięrzeta";
    }
    if (chosenCategory === categories[1]) {
        document.querySelector('#clue').textContent = "Wybrana kategoria: miasta";
    }
    if (chosenCategory === categories[2]) {
        document.querySelector('#clue').textContent = "Wybrana kategoria: film";
    }
}
chooseCat();
let buttonHint;
buttonHint = document.querySelector('#hint');
buttonHint.addEventListener('click',function (){
    const hints = [
        ["zwierzę domowe ", "ssak lądowy z rodziny kotowatych","największy żyjący współcześnie gatunek gryzonia "],
        [" położone nad rzeką Manzanares", " zwany Wenecją Północy", "Miasto stu wież"],
        ["w reżyserii Alfreda Hitchcocka"]
    ];
    let catagoryIndex = categories.indexOf(chosenCategory);
    let hintIndex = chosenCategory.indexOf(word);
    hintText= document.querySelector('#displayHint')
    hintText.innerHTML = hints [catagoryIndex][hintIndex];

});
result();

function result() {
    placeholder = document.querySelector('.hold');
    placeholder.style.letterSpacing ="10px";
    for (let i = 0; i < word.length; i++) {
        placeholder.innerHTML +="_";
    }
}


function clickManager() {
    let hang =0;
    let selectLive = document.querySelector('#mylives');
    selectLive.textContent ="Twoje życia : " + lives;
    buttonslist = document.querySelectorAll('.guessBox');

    for (let i = 0; i < buttonslist.length; i++) {

        buttonslist[i].addEventListener("click", function () {

            substring = placeholder.textContent;

            if (lives <= 0) {
                document.querySelector('#clue').textContent = "Przegrałeś wylosuj ponownie! Poprawnym słowem było słowo : " + word;
            }
            else if(placeholder.innerHTML === word){
                document.querySelector('#clue').textContent = " Brawo! Wygrałeś!" ;
            }
            else {
                selectLive.textContent = "Twoje życia : " + lives;
                buttonslist[i].classList.add('red');
                buttonslist[i].disabled = true;

                for (let j = 0; j < word.length; j++) {
                    if (word.charAt(j) ===   buttonslist[i].innerHTML) {

                        let substring1 = substring.substring(0, j);
                        let substring2 = substring.substring(j + 1, substring.length);
                        substring = substring1 + word.charAt(j) + substring2;
                        placeholder.innerHTML = substring;
                        hang = 1;

                    }
                }
                if (hang === 0) {

                    let image = document.querySelector('img');
                    lives--;
                    selectLive.textContent = "Twoje życia : " + lives;
                    counter++;
                    image.src = "./images/" + counter + ".png";
                }
                hang = 0;

            //localStorage aktualizowanie przegranych
            if (lives <= 0) {
                document.querySelector('#clue').textContent = "Przegrałeś wylosuj ponownie! Poprawnym słowem było słowo : " + word;
                ifFailure.textContent= "Przegrana";
                let elems = document.getElementsByClassName("guessBox");
                for(let i = 0; i < elems.length; i++) {
                    elems[i].disabled = true;
                    elems[i].classList.add('red');
                }
                for (let i = 0; i < persons.length; i++) {
                    if(currentUser[0].name === persons[i].name){
                        persons[i].loose +=1
                        break;
                    }
                }
                localStorage.setItem("persons", JSON.stringify(persons));
            }
            // LocalStorage aktualizowanie wygranych
            else if(placeholder.innerHTML === word){
                document.querySelector('#clue').textContent = " Brawo! Wygrałeś!";
                ifCorrect.textContent = "Wygrana";
                let elems = document.getElementsByClassName("guessBox");
                for(let i = 0; i < elems.length; i++) {
                    elems[i].disabled = true;
                    elems[i].classList.add('red');
                }
                for (let i = 0; i < persons.length; i++) {
                    if(currentUser[0].name === persons[i].name){
                        persons[i].win +=1;
                        break;
                    }
                }
                localStorage.setItem("persons", JSON.stringify(persons));
               }
            }});
    }
}
clickManager();
let resetButton =document.querySelector('#reset');
resetButton.addEventListener('click', function(){
    let elems = document.getElementsByClassName("guessBox");
    for(let i = 0; i < elems.length; i++) {
        elems[i].disabled = false;
        elems[i].classList.remove('red');
    }
    chooseCat();
    lives=5;
    hintText.innerHTML = "";
    keyHolder=[];
    duplicates=[];
    let selectLive = document.querySelector('#mylives');
    selectLive.textContent ="Twoje życia : " + lives;
    ifCorrect.textContent = "";
    ifFailure.textContent= "";
    counter=0;
    image.src = "./images/" + counter+".png";
    placeholder.innerHTML ="";
    for (let i = 0; i < word.length; i++) {
        placeholder.innerHTML +="_";
    }
    substring = placeholder.textContent;
});

returnButton.addEventListener('click', function(){
    localStorage.removeItem('user');
})


