const page = document.querySelector('.page');
const notes = page.querySelector('.notes');
const overlay = page.querySelector('.overlay');
const form = page.querySelector('.todo__form');
const inputTodo = form.querySelector('.todo__input');
const inputError = form.querySelector('.todo__input-error');
const buttonAddOrReplace = form.querySelector('.button');
const noteTemplate = page.querySelector('.note-template').content;
const noteItem = noteTemplate.querySelector('.note');
let editedNote ='';

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
    const noteElementDuplicate = evt.target.closest('.note');
    const noteTitle = noteElementDuplicate.querySelector('.note__title');

    const duplicatedElement = getNote(noteElementDuplicate);

    duplicatedElement.querySelector('.note__title').textContent = noteTitle.textContent;

    noteElementDuplicate.after(duplicatedElement);
  }
}

function changeIconOfButton(previousIcon, newIcon) {
  buttonAddOrReplace.classList.remove(previousIcon);
  buttonAddOrReplace.classList.add(newIcon);
}

function handleEditNote(evt) {
  if (evt.target.classList.contains('button_type_edit')) {
    const noteElement = evt.target.closest('.note');
    const noteTitle = noteElement.querySelector('.note__title');

    overlay.classList.add('overlay__active');
    inputTodo.value = noteTitle.textContent;
    editedNote = noteElement;
    inputTodo.focus()

    changeIconOfButton('button_type_add', 'button_type_edit');
  }
}

render();


// Размещаем отредактированное дело
function setEditedNote (newItem) {

  editedNote.replaceWith(newItem);

  editedNote = '';

  changeIconOfButton('button_type_edit', 'button_type_add');
  overlay.classList.remove('overlay__active');
}

// Слушатель на добавление или редактирование (изменение) дела ToDo
function handleAddOrReplaceNote(evt) {
  evt.preventDefault();
  const newItem = getNote({title: inputTodo.value});

  if (buttonAddOrReplace.classList.contains('button_type_add')) {
    notes.prepend(newItem);//если активна кнопка добавить, то размещаем новое задание в конце списка Todo
  } else {
    setEditedNote(newItem)//если активна кнопка редактировать, то размещаем отредактированную карточку заместо предыдущей
  }

  form.reset();
}


form.addEventListener('submit', handleAddOrReplaceNote);


