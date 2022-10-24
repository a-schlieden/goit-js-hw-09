const refs = {
  formEl: document.querySelector('.form'),
  stepFieldEl: document.querySelector('input[name="step"]'),
  delayFieldEl: document.querySelector('input[name="delay"]'),
  amountFieldEl: document.querySelector('input[name="amount"]'),
  submitBtnEl: document.querySelector('button[type="submit"]'),
};



refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const timeBefore = refs.delayFieldEl.value;
  console.log(timeBefore)
  const delay = refs.stepFieldEl.value;
  const amount = refs.amountFieldEl.value;
  console.log(delay)
  console.log(amount)
  setTimeout(() => {
    console.log('work ')
    createPromise(amount, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

  }, timeBefore);
}

//function createPromise(position, delay) {
//  const shouldResolve = Math.random() > 0.3;
// if (shouldResolve) {
// Fulfill 
//    resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
//  } else {
// Reject
//   reject(`❌ Rejected promise ${position} in ${delay}ms`);
//  }
//}


//createPromise(2, 1500)
 // .then(({ position, delay }) => {
 //   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
 // })
 // .catch(({ position, delay }) => {
//    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
 // });