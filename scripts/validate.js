//Работа с состояниями кнопок и валидацией
function setInitialStateOfButtonAdd() {
  buttonAddOrReplace.classList.add('button__inactive');
  buttonAddOrReplace.setAttribute('disabled', true);
}

setInitialStateOfButtonAdd()

function setValidityStateOfButtonAdd() {
  if (isEmptyInput()) return;
  buttonAddOrReplace.classList.remove('button__inactive');
  buttonAddOrReplace.removeAttribute('disabled');
}

function isValidInput() {
  return inputTodo.validity.valid;
}

function isEmptyInput() {
  return inputTodo.value === '';
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

function checkInputValidity() {
  if ( isValidInput() ) {
    setValidityStateOfButtonAdd()
    hideInputError()
  }
  else {
    if (isEmptyInput()) hideInputError()
    else showInputError()
    setInitialStateOfButtonAdd()
  }
}

function enableValidation() {
  form.addEventListener('submit', setInitialStateOfButtonAdd);
  inputTodo.addEventListener('focus', setValidityStateOfButtonAdd);
  inputTodo.addEventListener('input', checkInputValidity);
}

enableValidation()

