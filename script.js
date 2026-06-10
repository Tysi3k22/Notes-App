let addNoteBtn = document.getElementById('addNoteBtn')
let notes = document.getElementById('Notes')

const date = new Date();

let options = {
    day: "numeric",
    year: "numeric",
    month: "numeric",
};

let formatedDate = new Intl.DateTimeFormat("pl", options).format(date);

const notesArr = JSON.parse(localStorage.getItem('notesArr')) || [];

function saveItem(item) {
    notesArr.push(item);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('notesArr' ,JSON.stringify(notesArr));
}

function removeItem(item, element) {
    const index = notesArr.findIndex(note => note.text === item.text);

    if (index !== -1) {
        notesArr.splice(index, 1);
        saveToLocalStorage();
    }

    element.remove();
    updateCounter();
}

addNoteBtn.addEventListener("click", () => {
    let noteTitle = document.getElementById('Note').value;

    createItem(noteTitle, "", formatedDate);
    document.getElementById('Note').value = '';
})

function loadItems() {
    notesArr.forEach(el => {
        createItem(el.text, el.dis, el.date, false);
    });
}
 
function updateCounter() {
    document.getElementById('notesCounter').innerHTML = notesArr.length + ' notes';
}

function createItem(text, dis, date, save = true) {
    let div = document.createElement('div');
    let leftSide = document.createElement('div');
    let leftSideBar = document.createElement('div');
    let rightSide = document.createElement('div');
    let removeItemBtn = document.createElement('button')
    let header1 = document.createElement('h2');
    let header2 = document.createElement('h5');

    if(text === '') return;
    
    leftSideBar.classList.add('leftSideBar')
    div.classList.add('notesItem');
    removeItemBtn.classList.add('removeItem')

    header1.innerHTML = text;
    header2.innerHTML = date;
    removeItemBtn.innerHTML = '🗑️';

    let item = {
        text: text,
        dis: dis, // miejsce na potecjalny tekst
        date: date
    }

    removeItemBtn.addEventListener("click", () => {
        removeItem(item, div);
    })


    if(save) saveItem(item);

    updateCounter();
    
    leftSide.appendChild(leftSideBar)
    leftSide.appendChild(header1)
    leftSide.appendChild(header2)
    rightSide.appendChild(removeItemBtn)
    div.appendChild(leftSide)
    div.appendChild(rightSide)
    notes.appendChild(div);
}

loadItems();