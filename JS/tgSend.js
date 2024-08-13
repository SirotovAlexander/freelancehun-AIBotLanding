const callbackForm = document.querySelector('.modal-form');

const TOKEN = '7269358105:AAE_8aVO-ouQICocE1yo2ApT-0ZZXe9Oa9E';
const CHAT_ID = '-1002237131608';
const URL_TG = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

callbackForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  if (
    callbackForm.name.value === '' &&
    callbackForm.phone.value === '' &&
    callbackForm.email.value === '' &&
    callbackForm.telegram.value === '' &&
    callbackForm.coment.value === ''
  ) {
    alert('Введіть якісь дані!!!!');
    return;
  }
  let message = `<b>Контактна інформація з сайту</b> \n`;

  const formData = Array.from(new FormData(callbackForm)).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  for (let i = 0; i < formData.length; i++) {
    const element = formData[i];
    message += `<b>${element.value}</b> \n`;
  }

  console.log(message);

  axios
    .post(URL_TG, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message,
    })
    .then(res => {
      alert('Наш менеджер зателефонує Вам! Гарного дня');
      callbackForm.name.value = '';
      callbackForm.phone.value = '';
      callbackForm.email.value = '';
      callbackForm.telegram.value = '';
      callbackForm.coment.value = '';

      const modal = document.querySelector('[data-modal]');
      modal.classList.toggle('is-hidden');
    })
    .catch(err => {
      callbackForm.name.value = '';
      callbackForm.phone.value = '';
      callbackForm.email.value = '';
      callbackForm.telegram.value = '';
      callbackForm.coment.value = '';
      console.warn(err.massege);
      alert(err.massege);
    });
}
