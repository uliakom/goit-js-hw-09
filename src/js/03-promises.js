
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputForm = document.querySelector('form');
inputForm.addEventListener('submit', onSubmitFormData);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
   return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notify.success(`Fulfilled promise ${position} in ${delay}ms`));
      } else {
        reject(Notify.failure(`Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}

function onSubmitFormData(event) {
  event.preventDefault();
  let delay = Number(event.currentTarget.delay.value);
  let step = Number(event.currentTarget.step.value);
  let amount = Number(event.currentTarget.amount.value);
  for (let i = 1; i <= amount; i += 1){
    delay += step;
    createPromise(i, delay)
      .then(success => console.log('✅ Fulfilled promise'))
      .catch(error => console.log('❌ Rejected promise')); 
  } 
};

