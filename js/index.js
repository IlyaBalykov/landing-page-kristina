//nodemon - for reset server when any file is changed
//mongoose - for easy fork with mongodb
//const express = require('express');
//const PORT = process.env.PORT || 5000; //try to get port from system variables or set or 5000

//const app = express()

//function to start server
//const start = () => {
 // try {
 //   app.listen(PORT, () => console.log(`server started on port ${PORT}`)); //start server
 // } catch (e) {
//    console.log(e);
 // }
//}

//start();
import i18Obj from "./translate.js";
import { News } from "./News.js";
import { authWithEmailAndPassword, getAuthForm } from "./auth.js";
import { renderAdminElements } from "./admin.js";

const dataAttr = document.querySelectorAll('[data-i18n]');
const lang = document.querySelector('.lang-list');
const loginBth = document.getElementById('login-btn');

const form = document.getElementById('form');
const inputNewsContent = form.querySelector('#inputNewsContent');
const submitBtn = form.querySelector('#submit');

export let userToken = "";

form.addEventListener('submit', submitNews);
loginBth.addEventListener('click', showModal);

window.onload = function () {
  getTranslate();
  News.get().then(() => console.log('Новости загружены!'));
}

function submitNews(event) {
  event.preventDefault();
  const news = {
      content: inputNewsContent.value,
      date: new Date()
  }
  submitBtn.disabled = true;
  News.create(news, userToken).then(() => {
    inputNewsContent.value = '';
    submitBtn.disabled = false;
  }) //can use create() method, because in news we use static

  News.get().then(() => {
    console.log('Новость отправлена на сервер!');
  });
}

lang.addEventListener('change', getTranslate)

function getTranslate() {
  dataAttr.forEach((element, index) => {
    element.textContent = ""
    element.textContent = i18Obj[lang.value][element.dataset.i18n]
    })
}

function showModal() {
  const modalContainer = document.querySelector('.modal');
  modalContainer.innerHTML = `${getAuthForm()}`;
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, { once: true }) //once:true - set event once, because everytime we render auth-form
}

function authFormHandler(event) {
  event.preventDefault();
  const email = event.target.querySelector('#auth-form__email').value;
  const password = event.target.querySelector('#auth-form__password').value;

  authWithEmailAndPassword(email ,password)
    .then(token => {
      userToken = token;
      sessionStorage.setItem("userToken", token);
      renderAdminElements()
    })
}