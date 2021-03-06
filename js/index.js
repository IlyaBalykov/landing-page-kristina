import i18Obj from "./translate.js";
import { News } from "./News.js";
import { Modal } from "./Modal.js";
import { hideUserMenu, renderAdminElements } from "./admin.js";
import { authWithEmailAndPassword } from "./auth.js";

const dataAttr = document.querySelectorAll('[data-i18n]');
const lang = document.querySelector('.lang-list');
const loginBth = document.getElementById('login-btn');

export let userToken = "";

loginBth.addEventListener('click', loginAction);

window.onload = function () {
  getTranslate();
  News.get().then(() => {
    console.log('Новости загружены!')
    if(sessionStorage.getItem("userToken")) {
      userToken = sessionStorage.getItem("userToken")
      renderAdminElements()
    } else {
      userToken = "";
    }
  });
}

export function authFormHandler(event) {
  event.preventDefault();
  const email = event.target.querySelector('#auth-form__email').value;
  const password = event.target.querySelector('#auth-form__password').value;

  authWithEmailAndPassword(email ,password)
    .then(token => {
      userToken = token;
      sessionStorage.setItem("userToken", token);
      Modal.removeModal();
      renderAdminElements();
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
  userToken? hideUserMenu():Modal.showAuth();
}

// TODO update page when News.submit or News.delete