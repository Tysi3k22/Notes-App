let addNoteBtn = document.getElementById('addNoteBtn')
let notes = document.getElementById('Notes')

const date = new Date();

let options = {
    day: "numeric",
    year: "numeric",
    month: "numeric",
};

let formatedDate = new Intl.DateTimeFormat("pl", options).format(date);

const notesArr = [];

function removeItem(item, element) {
    let index = notesArr.findIndex(item => item === item.text)

    if(index !== -1) {
        notesArr.slice(index, 1);
    }

    element.remove();
}

addNoteBtn.addEventListener("click", () => {
    let div = document.createElement('div');
    let removeItemBtn = document.createElement('button')
    let header1 = document.createElement('h2');
    let header2 = document.createElement('h5');

    let noteTitle = document.getElementById('Note').value;

    if(noteTitle === "") return;
    
    div.classList.add('notesItem');
    removeItemBtn.classList.add('removeItem')

    header1.innerHTML = noteTitle;
    header2.innerHTML = formatedDate;
    removeItemBtn.innerHTML = '🗑️';

    let item = {
        text: noteTitle,
        dis: '',
        date: formatedDate
    }

    removeItemBtn.addEventListener("click", () => {
        removeItem(item, div);
    })



    notesArr.push(item);

    div.appendChild(header1)
    div.appendChild(removeItemBtn)
    div.appendChild(header2)
    notes.appendChild(div);
})