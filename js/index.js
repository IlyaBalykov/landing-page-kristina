import i18Obj from "./translate.js";

const dataAttr = document.querySelectorAll('[data-i18n]')
const lang = document.querySelector('.lang-list')

window.onload = getTranslate
lang.addEventListener('change', getTranslate)

function getTranslate() {
  dataAttr.forEach((element, index) => {
    element.textContent = ""
    element.textContent = i18Obj[lang.value][element.dataset.i18n]
    })
}

function getTran() {

}