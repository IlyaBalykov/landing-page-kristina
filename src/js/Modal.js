import { getAuthForm } from "./auth.js";
import { authFormHandler } from "./index.js";

export class Modal {
  static showAuth() {
    const modalContainer = document.querySelector('.modal');
    document.body.style.overflow = "hidden";
    modalContainer.addEventListener('click', (event) => {
      if (event.target.className.includes("modal_show")) {
        this.removeAuth();
      }
    })
    modalContainer.innerHTML = `${getAuthForm()}`;
    modalContainer.classList.toggle('modal_show');
    document
      .getElementById('auth-form')
      .addEventListener('submit', authFormHandler, { once: true }) //once:true - set event once, because everytime we render auth-form
  }
  
  static removeAuth() {
    const modalContainer = document.querySelector('.modal');
    const authForm = document.getElementById('auth-form');
    document.body.style.overflow = "auto";
    authForm.remove();
    modalContainer.classList.toggle('modal_show');
  }

  static showWait() {
    const modalContainer = document.querySelector('.modal');
    const animation = document.createElement("img");
    animation.setAttribute("src", "./assets/gif/animation-download.gif");
    animation.classList.add("modal__animation")
    modalContainer.append(animation);
    modalContainer.classList.toggle('modal_show');
  }

  static removeWait() {
    const modalContainer = document.querySelector('.modal');
    const animation = document.querySelector(".modal__animation");
    animation.remove();
    modalContainer.classList.toggle('modal_show');
  }
}