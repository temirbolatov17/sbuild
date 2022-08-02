const orderButtons = document.querySelectorAll('.promotion__button');
const modalWrapper = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal-close');

function openModal() {
    modalWrapper.classList.remove('modal--closed');
    modalWrapper.classList.add('modal--opened');
}

function closeModal() {
    modalWrapper.classList.remove('modal--opened');
    modalWrapper.classList.add('modal--closed');
    removeEventListener('click', openModal);
}


orderButtons.forEach((buttonItem) => buttonItem.addEventListener('click', openModal));

modalCloseButton.addEventListener('click', closeModal);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    let formButton = document.querySelector('.modal-button');
    form.addEventListener('submit', formSend);
  
    async function formSend(e) {
      e.preventDefault();
  
      let error = formValidate(form);
      
      let formData = new FormData(form);
      
      if (error === 0) {
        formButton.classList.add('disabled');
        formButton.setAttribute('disabled', 'disabled');
        formButton.textContent = 'Отправляем...';
        let response = await fetch('sendmail.php', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          formButton.classList.remove('disabled');
          formButton.removeAttribute('disabled');
          formButton.textContent = 'Отправить';
          form.reset();
        } else {
          alert('Ошибка отправки');
          formButton.textContent = 'Отправить';
        }
      } else {
        alert('Заполните правильно поля');
      }
    }
  
    function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');
  
      for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i];
  
        formRemoveError(input);
  
        if (input.classList.contains('_email')) {
          if (emailTest(input)) {
            formAddError(input);
            error++;
          } 
        } else if (input.getAttribute('type') === 'tel') {
          if (telTest(input)) {
            formAddError(input);
            error++;
          }
        } else {
          if (input.value === '') {
            formAddError(input);
            error++;
          }
        }
      }
  
      return error;
    }
  
    function formAddError(input) {
      // input.parentElement.classList.add('_error');
      input.classList.add('_error');
    }
  
    function formRemoveError(input) {
      // input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
    }
  
    function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
  
    function telTest(input) {
      return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
    }
  });