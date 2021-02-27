const page = document.querySelector('.page');
const notes = page.querySelector('.notes');
const form = page.querySelector('.todo__form');
const inputTodo = form.querySelector('.todo__input');
const inputError = form.querySelector('.todo__input-error');
const buttonAdd = form.querySelector('.button');
const noteTemplate = page.querySelector('.note-template').content;

const noteItem = noteTemplate.querySelector('.note');
let editedNote ='';
let nextNote ='';

// Отрисовка изначального списка Todo
function render() {
  const initialArrayOfElements = initialNotes.map(getNote);
  notes.prepend(...initialArrayOfElements);
}

// Создание элемента - одно дело Todo
function getNote(item) {
  const noteElement = noteItem.cloneNode(true);
  const noteTitle = noteElement.querySelector('.note__title');

  noteTitle.textContent = item.title;
  noteElement.addEventListener('click', handleRemoveNote);
  noteElement.addEventListener('click', handleDuplicateNote);
  noteElement.addEventListener('click', handleEditNote);

  return noteElement;
}

//Работа со слушателями кнопок Удалить, Дублировать и Редактировать
function handleRemoveNote(evt) {
  if (evt.target.classList.contains('button_type_remove')) {
    evt.target.closest('.note').remove();
  }
}

function handleDuplicateNote(evt) {
  if (evt.target.classList.contains('button_type_duplicate')) {
    const noteElement = evt.target.closest('.note');

    const duplicatedElement = getNote(noteElement);
    duplicatedElement.querySelector('.note__title').textContent = noteElement.querySelector('.note__title').textContent;

    noteElement.after(duplicatedElement);
  }
}

function handleEditNote(evt) {
  if (evt.target.classList.contains('button_type_edit')) {
    
    const noteElement = evt.target.closest('.note');
    const noteTitle = noteElement.querySelector('.note__title');

    inputTodo.value = noteTitle.textContent;
    editedNote = noteElement;
    nextNote = noteElement.nextElementSibling;//нужен, если удалили элемент, который нажали редактировать

    setValidityStateOfButtonAdd()

    buttonAdd.classList.remove('button_type_add');
    buttonAdd.classList.add('button_type_edit');
  }
}

render();

//Работа с состояниями кнопок и валидацией
function setInitialStateOfButtonAdd() {
  buttonAdd.classList.add('button__inactive');
  buttonAdd.setAttribute('disabled',true);
}

setInitialStateOfButtonAdd();

function setValidityStateOfButtonAdd() {
  buttonAdd.classList.remove('button__inactive');
  buttonAdd.removeAttribute('disabled');
}

function isValidInput() {
  return inputTodo.validity.valid;
}

function showInputError() {
  inputError.classList.add('todo__input-error_active');
  inputTodo.classList.add('todo__input_type_error');
  inputError.textContent = inputTodo.validationMessage;
}

function hideInputError() {
  inputError.classList.remove('todo__input-error_active');
  inputTodo.classList.remove('todo__input_type_error');
  inputError.textContent = '';
}

function enableValidation() {
  if (isValidInput() && inputTodo.value !== '') {
    setValidityStateOfButtonAdd()
    hideInputError()
  }
  else {
    setInitialStateOfButtonAdd()
      if (inputTodo.value == '') {
        hideInputError();
      }
    showInputError()
  }
}

// Ищем, где разместить отредактированное дело
function setEditedNote (newItem) {
  if (editedNote) {
    editedNote.replaceWith(newItem);
    editedNote = '';
  } 
    //проверка на то, если нажали редактировать элемент, но после его удалили...
  else if (nextNote){
    nextNote.before(newItem);
    nextNote = '';
  }
    //проверка на то, если нажали редактировать элемент, но после его удалили и удалили его нижнего соседа...
  else {
    notes.prepend(newItem);
  }

  buttonAdd.classList.remove('button_type_edit');
  buttonAdd.classList.add('button_type_add');
}

// Слушатель на добавление или редактирование (изменение) дела ToDo
function handleAddOrReplaceNote(evt) {
  evt.preventDefault();
  const newItem = getNote({title: inputTodo.value});
  if (buttonAdd.classList.contains('button_type_add')) {
    notes.prepend(newItem);
  } else {
    setEditedNote(newItem)
  }

  form.reset();
  setInitialStateOfButtonAdd()  
}


form.addEventListener('submit', handleAddOrReplaceNote);
inputTodo.addEventListener('input', enableValidation);

