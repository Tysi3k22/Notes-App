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
}

addNoteBtn.addEventListener("click", () => {
    let noteTitle = document.getElementById('Note').value;

    createItem(noteTitle, "", formatedDate);
})

function loadItems() {
    notesArr.forEach(el => {
        createItem(el.text, el.dis, el.date, false);
    });
}

function createItem(text, dis, date, save = true) {
    let div = document.createElement('div');
    let removeItemBtn = document.createElement('button')
    let header1 = document.createElement('h2');
    let header2 = document.createElement('h5');

    if(text === '') return;
    
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
    
    div.appendChild(header1)
    div.appendChild(removeItemBtn)
    div.appendChild(header2)
    notes.appendChild(div);
}

loadItems();