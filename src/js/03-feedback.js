import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = "feedback-form-state";
const formData = {};

form.addEventListener('submit', onFromSubmit);
form.addEventListener('input', throttle(onInput, 500));

completedForm();

function onFromSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function onInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function completedForm() {
    const localData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(localData){
        console.log(localData);
        form.elements.email.value = localData.email;
        form.elements.message.value = localData.message;
    }
}