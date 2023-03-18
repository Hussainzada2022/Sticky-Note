import "./bootstrap.css";
import "./style.css";
// vaiables
const form = document.querySelector("form");
const inpt = form.querySelector("input");
const saveBtn = document.querySelector("#btn");
const clearAll = document.querySelector("#clear-btn");
const displayNote = document.querySelector("#list-note");
const notes = []

//calling all eventlisteners

  // preventing from submiting
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  document.addEventListener("DOMContentLoaded", loadData);
  saveBtn.addEventListener("click", saveNote);
  clearAll.addEventListener("click", clearData);
  displayNote.addEventListener("click", DeleteNote);


//functions

// for the first time this get data from localstorage
function loadData (){
  if (localStorage.length > 0) {
    const Data = localStorage.getItem("note");
    const ArryData = Data.split(",");
    ArryData.forEach((element) => {
      const content = `<ul><li><h3>${element}</h3><span class="delete">Delete</span></li></ul>`;
      displayNote.innerHTML += content;
    });
  } else {
    displayNote.innerHTML = `<h3 class="alert-danger">You do not have any note here</h3>`;
    setTimeout(() => {
      displayNote.innerHTML = "";
    }, 3000);
  }
};

/// this function get the value of the input and save that
function saveNote(){
  const note = inpt.value;
  if (note.length > 1) {
    notes.push(note)
    const content = `<ul><li><h3>${note}</h3><span class="delete">Delete</span></li></ul>`;
    displayNote.innerHTML += content;
    localStorage.setItem("note", notes);
    inpt.value = "";
  }
};
/// delete just one note
function DeleteNote(e){
  if (e.target.classList.contains("delete")) {
    let words = e.target.parentElement.textContent; // this return all textContent li with all space
    words = words.trim(); // with this we remove space
    let DeleteWord = words.slice(0, words.length - 6); // with this we take out the delete words
    let justNote = DeleteWord.trim(); // now we have only text
    justNote = justNote.trim()

    const allNote = localStorage.getItem("note");
    const newList = allNote.split(",");
    const found = newList.indexOf(justNote);
    const newNote = newList.splice(found, 1); // we deleted the word from localstorage
     localStorage.setItem("note", newList);
     e.target.parentElement.remove();
  }
};

/// delete all notes

function clearData(){
  localStorage.removeItem("note");
  displayNote.innerHTML = `<h1 class="alert-success">Deleted successfully</h1>`;
  setTimeout(() => {
    displayNote.innerHTML = "";
  }, 3000);
};
