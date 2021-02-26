const page = document.querySelector('.page');
const notes = page.querySelector('.notes');
const form = page.querySelector('.todo__form');
const inputTodo = form.querySelector('.todo__input');
const buttonAdd = form.querySelector('.button');
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
  noteElement.addEventListener('click', handleRemoveNote);
  noteElement.addEventListener('click', handleDuplicateNote);
  noteElement.addEventListener('click', handleEditNote);

  return noteElement;
}

function handleRemoveNote(evt) {
  if (evt.target.classList.contains('button_type_remove')) {
    evt.target.closest('.note').classList.remove('note__opened');
  }
}

function handleDuplicateNote(evt) {
  if (evt.target.classList.contains('button_type_duplicate')) {
    const noteElement = evt.target.closest('.note');

    const DuplicatedElement = getNote(noteElement);
    DuplicatedElement.querySelector('.note__title').textContent = noteElement.querySelector('.note__title').textContent;

    noteElement.after(DuplicatedElement);
  }
}

function handleEditNote(evt) {

}

render();

function setInitialStateOfButtonAdd() {
  buttonAdd.classList.add('button__inactive');
  buttonAdd.setAttribute('disabled',true);
}

setInitialStateOfButtonAdd();

function IsInvalidInput() {
  return inputTodo.validity.valid;
}

function enableValidation() {
  if (isInvalidInput() === 'false') {
    buttonAdd.classList.remove('button__inactive');
    buttonAdd.removeAttribute('disabled');
  }
}

function handleAddNote(evt) {
  evt.preventDefault();
  const newItem = getNote({title: inputTodo.value});
  notes.prepend(newItem);

  form.reset();
}


form.addEventListener('submit', handleAddNote);
inputTodo.addEventListener('input', enableValidation);

