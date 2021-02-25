const page = document.querySelector('.page');
const notes = page.querySelector('.notes');
const noteTemplate = page.querySelector('.note-template').content;

const noteItem = noteTemplate.querySelector('.note');

function render() {
  const initialArrayOfElements = initialNotes.map(getNote);
  notes.prepend(...initialArrayOfElements);
}

function getNote(item) {
  const noteElement = noteItem.cloneNode(true);
  const noteTitle = noteElement.querySelector('.note__title');

  noteTitle.textContent = item.title;


  return noteElement;
}

render();