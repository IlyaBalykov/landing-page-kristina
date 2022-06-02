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

const dataAttr = document.querySelectorAll('[data-i18n]');
const lang = document.querySelector('.lang-list');

const form = document.getElementById('form');
const inputNewsTitle = form.querySelector('#inputNewsTitle');
const inputNewsContent = form.querySelector('#inputNewsContent');
const submitBtn = form.querySelector('#submit');

form.addEventListener('submit', submitNews);

function submitNews(event) {
  event.preventDefault();
  const news = {
      title: inputNewsTitle.value.trim(),
      content: inputNewsContent.value,
      date: new Date().toJSON()
  }
  submitBtn.disabled = true;
  News.create(news).then(() => {
    inputNewsTitle.value = '';
    inputNewsContent.value = '';
    submitBtn.disabled = false;
  }) //can use create() method, because in news we use static
}
window.onload = getTranslate
lang.addEventListener('change', getTranslate)

function getTranslate() {
  dataAttr.forEach((element, index) => {
    element.textContent = ""
    element.textContent = i18Obj[lang.value][element.dataset.i18n]
    })
}
