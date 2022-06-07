import i18Obj from "./translate.js";
import { News } from "./News.js";
import { Modal } from "./Modal.js";
import { hideUserMenu, renderAdminElements } from "./admin.js";
import { authWithEmailAndPassword } from "./auth.js";


const dataAttr = document.querySelectorAll('[data-i18n]');
const lang = document.querySelector('.lang-list');
const loginBth = document.getElementById('login-btn');

loginBth.addEventListener('click', loginAction);

window.onload = function () {
  getTranslate();
  News.get().then(() => {
    console.log('Новости загружены!')
  if(sessionStorage.getItem("userToken") && (sessionStorage.getItem("userToken") !== undefined)) {
      renderAdminElements()
    }
  });
}

export async function authFormHandler(event) {
  Modal.removeAuth()
  Modal.showWait();
  event.preventDefault();
  const email = event.target.querySelector('#auth-form__email').value;
  const password = event.target.querySelector('#auth-form__password').value;

  await authWithEmailAndPassword(email ,password)
    .then(token => {
      if(token !== undefined) {
        sessionStorage.setItem("userToken", token);
        renderAdminElements();
        Modal.removeWait();
      } else {
        alert("Неверный логин или пароль");
      }
    })
}

lang.addEventListener('change', getTranslate);

function getTranslate() {
  dataAttr.forEach((element, index) => {
    element.textContent = ""
    element.textContent = i18Obj[lang.value][element.dataset.i18n]
    })
}

function loginAction () {
  sessionStorage.getItem("userToken")? hideUserMenu():Modal.showAuth();
}
