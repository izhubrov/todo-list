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
  if (evt.target.classList.contains('button_type_edit')) {
    let noteElement = evt.target.closest('.note');
    const noteTitle = noteElement.querySelector('.note__title');

    inputTodo.value = noteTitle.textContent;
    console.log(inputTodo.value);

    enableValidation()

    buttonAdd.classList.remove('button_type_add');
    buttonAdd.classList.add('button_type_edit');
    form.removeEventListener('submit', handleAddNote);
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      noteTitle.textContent = inputTodo.value;
      form.reset();
      noteElement = '';
      buttonAdd.classList.add('button_type_add');
      buttonAdd.classList.remove('button_type_edit');
      setInitialStateOfButtonAdd();
    })
  }
}

render();

function setInitialStateOfButtonAdd() {
  buttonAdd.classList.add('button__inactive');
  buttonAdd.setAttribute('disabled',true);
}

setInitialStateOfButtonAdd();

function setValidityStateofButtonAdd() {
  buttonAdd.classList.remove('button__inactive');
  buttonAdd.removeAttribute('disabled');
}

function isValidInput() {
  return inputTodo.validity.valid;
}

function enableValidation() {
  if (isValidInput() && inputTodo.value !== '') {
    setValidityStateofButtonAdd() 
  }
  else {
    setInitialStateOfButtonAdd()
  }
}

function handleAddNote(evt) {
  evt.preventDefault();
  const newItem = getNote({title: inputTodo.value});
  notes.prepend(newItem);

  form.reset();
  setInitialStateOfButtonAdd()  
}


form.addEventListener('submit', handleAddNote);
inputTodo.addEventListener('input', enableValidation);

