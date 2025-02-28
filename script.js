const submit = document.querySelector("button");
const form = document.querySelector("form");
const color = document.querySelector("input");
const notesContainer = document.querySelector(".note-container");
const undo = document.querySelector(".undo-button");

// created and deleted notes
const createdNotes = [];
const deletedNotes = [];

// object ki values
const textarea = document.querySelector("textarea");

// window.addEventListener("load", undoStatus);
if (deletedNotes.length === 0) {
  undo.disabled = true;
}

form.addEventListener("submit", (e) => {

  e.preventDefault();

  let newNote = {

    text: textarea.value,
    color: color.value,
    timeStamp: new Date().toLocaleString(),
    position: Date.now(),

  };

  createdNotes.push(newNote);
  textarea.value = "";
  textarea.focus();
  displayNotes();

});
// this will got on created notes and give objects values to it and paste it in right side div

function displayNotes() {

  notesContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();

  createdNotes.forEach((note) => {

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.style.backgroundColor = note.color;

    const textValue = document.createElement("p");
    textValue.innerText = note.text;

    const timeStamp = document.createElement("span");
    timeStamp.innerText = note.timeStamp;
    timeStamp.classList.add("time-stamp");

    const close = document.createElement("span");
    close.classList.add("close");
    close.innerText = "X";

    // When a note gets deleted, splice the note object from the created array push the object to deleted array.

    close.addEventListener("click", (e) => {

      undo.disabled = false;
      const deletedNotesIndex = createdNotes.findIndex((n) => {
        return note.position === n.position;
        
      });

      deletedNotes.push(...createdNotes.splice(deletedNotesIndex, 1));
      notesContainer.removeChild(e.target.parentElement);

      // const edit = document.createElement("span");
      // edit.classList.add("edit", "fa-solid", "fa-pen-to-square");
    });


    // edit button


    const edit = document.createElement("span");
    edit.classList.add("edit", "fa-solid", "fa-pen-to-square");

    let editableInput = document.createElement("textarea");
      editableInput.value = note.text;
      editableInput.style.display = "none";
      noteDiv.append(editableInput);

    edit.addEventListener("click", (e) => {

      if (editableInput.style.display === "none") {
        editableInput.style.display = "block";
        editableInput.focus();
        textValue.style.display = "none";
      } else {
        
        note.text = editableInput.value;
        
        textValue.innerText = editableInput.value;
        textValue.style.display = "block";
        editableInput.style.display = "none";

      }

    });

    noteDiv.append(textValue, timeStamp, close,edit);
    fragment.append(noteDiv);

  });

  notesContainer.append(fragment);

}

// UNDO button

undo.addEventListener("click", (e) => {

    const lastDeletedNote = deletedNotes.pop();
    createdNotes.push(lastDeletedNote);

    createdNotes.sort((a , b) => {

        return a.position - b.position;
    });
    
    displayNotes();
    // undoStatus();

})

// function undoStatus () {
//     if (deletedNotes.length == 0) {
//         // undo.disabled = true;
//         alert("Nothing to add");
//     }
// }
