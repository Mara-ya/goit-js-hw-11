import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = "feedback-form-state";

const parseStorageKey = JSON.parse(localStorage.getItem(STORAGE_KEY));
const formData = {...parseStorageKey};

form.addEventListener('submit', onFromSubmit);
form.addEventListener('input', throttle(onInput, 500));

completedForm();

function onFromSubmit(evt) {
    evt.preventDefault();
    console.log(formData);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData.email = '';
    formData.message = '';
}

function onInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
function completedForm() {
    formData.email === undefined ? form.elements.email.value = "" : form.elements.email.value = formData.email;
    formData.message === undefined ? form.elements.message.value = "" : form.elements.message.value = formData.message;
}