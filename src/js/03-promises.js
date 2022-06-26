import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formData = document.querySelector('.form');

formData.addEventListener('submit', onSubmit)

function onSubmit(e){
  e.preventDefault();
  const {
  elements: { delay, step, amount }
  } = e.currentTarget;
  let delayTime = Number(delay.value);
  const stepTime = Number(step.value);
  const amountTime = Number(amount.value);

  for (let position = 1; position <= amountTime; position++){
    createPromise(position, delayTime)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    delayTime += stepTime;
  };
}

function createPromise(position, delay) {
  return new Promise((resolve,reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() =>{
      if (shouldResolve) {
        resolve({position, delay});
      }
      reject({position, delay});
    }, delay);
  });
}