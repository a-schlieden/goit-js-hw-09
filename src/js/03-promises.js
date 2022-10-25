import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  stepFieldEl: document.querySelector('input[name="step"]'),
  delayFieldEl: document.querySelector('input[name="delay"]'),
  amountFieldEl: document.querySelector('input[name="amount"]'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let firstDelay = Number(refs.delayFieldEl.value); //
  let stepDelay = Number(refs.stepFieldEl.value);
  let amount = refs.amountFieldEl.value;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay} ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay} ms`
        );
      });
    firstDelay += stepDelay;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
