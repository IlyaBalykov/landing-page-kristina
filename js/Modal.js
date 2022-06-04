import { getAuthForm } from "./auth.js";
import { authFormHandler } from "./index.js";

export class Modal {
  static showAuth() {
    const modalContainer = document.querySelector('.modal');
    modalContainer.innerHTML = `${getAuthForm()}`;
    document
      .getElementById('auth-form')
      .addEventListener('submit', authFormHandler, {once: true}) //once:true - set event once, because everytime we render auth-form
  }
  
  static removeModal () {
    const authForm = document.getElementById('auth-form')
    authForm.remove()
  }

  static showNotification() {

  }
}
