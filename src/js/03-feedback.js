import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};
const KEY_STORAGE = 'feedback-form-state';

refs.form.addEventListener('input', throttle(onInputsChange), 500);
refs.form.addEventListener('submit', onSubmit);

loadStorageData();

function onInputsChange() {
  localStorage.setItem(
    KEY_STORAGE,
    JSON.stringify({ email: refs.input.value, message: refs.textarea.value })
  );
}

function onSubmit(event) {
  event.preventDefault();
  console.log({ email: refs.input.value, message: refs.textarea.value });
  event.target.reset();
  localStorage.removeItem(KEY_STORAGE);
}

function loadStorageData() {
  try {
    const savedData = localStorage.getItem(KEY_STORAGE);
    if (savedData) {
      let { email, message } = JSON.parse(savedData);
      refs.input.value = email;
      refs.textarea.value = message;
    }
  } catch (error) {
    console.error(error.message);
  }
}