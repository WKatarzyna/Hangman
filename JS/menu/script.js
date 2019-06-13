//ustawianie elementow tag HTML
let $container;
let $newUser;
let $usserAddbutton = document.createElement('button');
let $inputChange;
let $list;
//let $removeButton = document.createElement('button');
let listItem;
let oldValue;
let startButton= document.querySelector('.start');
//tablica użytkowników

//ustawienie local storage
let itemsArray = localStorage.getItem('persons') ? JSON.parse(localStorage.getItem('persons')) : []
let currentArray = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []
localStorage.setItem('persons', JSON.stringify(itemsArray));

const stored = JSON.parse(localStorage.getItem('persons'));
startButton.addEventListener('click', (event)=>{
    event.preventDefault();
    selectUser()
})
function selectUser(){
    for( let i=0; i < $list.length; i ++){
        localStorage.setItem('user', JSON.stringify(currentArray))
        currentArray.push({'name':$list.value});

    }
    document.location = "board.html";
}

function primary() {
    for (let i = 0; i < stored.length; i++) {
        listmaker();
        listItem.textContent =stored[i].name;
        //localStorage.setItem('current', JSON.stringify(currentArray));
    }
    $container = document.querySelector('.content');
    $newUser = document.createElement('input');
    $newUser.type = "text";
    $newUser.placeholder = "Dodaj użytkownika";
    $newUser.classList.add('name');
    $newUser.id ="newUser"
    $newUser.addEventListener('input',inputChange);
    $usserAddbutton.classList.add('useradd');
    $usserAddbutton.value = "user";
    $usserAddbutton.type = "button";
    $usserAddbutton.textContent = "Dodaj";
   // $removeButton.classList.add('remove');
    //$removeButton.textContent="Usuń listę";
    $container .appendChild($newUser);
    $container .appendChild($usserAddbutton);
   // $container .appendChild($removeButton);
}
function inputChange(event){
    oldValue =$newUser.placeholder; //przechowanie starej nazwy
    $inputChange = event.target.value;
    if(event.target.classList.contains('useradd')){
        addButton();
    }
}
function listmaker(){
    $list = document.querySelector('#userList');
    listItem= document.createElement('option');
    $list.appendChild(listItem);
}

function addButton() {
    let counter =0;
        if($inputChange !== "" && $inputChange !== null && $inputChange !== undefined ){
        for (let i = 0; i <itemsArray.length ; i++) {
            if (itemsArray[i].name === $inputChange) {
                counter++;
                break;
            }
        }
        if(counter ===0) {
            listmaker();
            itemsArray.push({'name':$inputChange, 'win':0,'loose': 0,});//nowy element listy
            localStorage.setItem('persons', JSON.stringify(itemsArray))//nowa watosc
            listItem.textContent += $inputChange;

        }

    }
}

$usserAddbutton.addEventListener('click',addButton)


function createRanking (){
    let persons= JSON.parse(localStorage.persons);
    persons.sort((a, b) => ( b.win - a.win)||( a.loose -b.loose));

    let table= document.querySelector('#ranking');

    for( let i =0; i<persons.length; i++){
        let tr = persons[i].length;
        tr= document.createElement('tr');
        let td = persons[i].length;
        td = document.createElement('td');
        table.appendChild(tr);
        tr.appendChild(td);
        td.textContent= "NAZWA: " + persons[i].name + " " + "WYGRANE: " + persons[i].win + " " + "PRZEGRANE: " + persons[i].loose ;
    }
}

createRanking();










document.addEventListener('DOMContentLoaded',primary);