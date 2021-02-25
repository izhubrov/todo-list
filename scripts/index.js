const page = document.querySelector('.page');
const notes = page.querySelector('.notes');
const noteTemplate = page.querySelector('.note-template').content;

const noteItem = noteTemplate.querySelector('.note');

initialNotes.forEach((item) => {
  notes.prepend(getNote(item));
});

function getNote (item) {
  const noteElement = noteItem.cloneNode(true);
  const noteTitle = noteElement.querySelector('.note__title');

  noteTitle.textContent = item.title;


  return noteElement;
}
