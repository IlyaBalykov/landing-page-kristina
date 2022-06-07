import { News } from "./News.js";

export function renderAdminElements() {
  const newsContainer = document.getElementById('news');
  const newsList = newsContainer.querySelectorAll('.new-news');
  const newsForm = document.createElement("form");

  //Show user menu

  showUserMenu()

  // Add remove btn
  newsList.forEach(element => {
    const removeBtn = document.createElement("button");

    removeBtn.classList.add('news__delete-btn');
    removeBtn.textContent = "Delete";

    element.append(removeBtn);

    removeBtn.addEventListener('click', deleteNews)
  })

  // Add area for make news
  newsForm.id = "form";
  newsForm.classList.add("news__input-form");
  newsForm.classList.add("input-form");
  newsContainer.append(newsForm);

  newsForm.innerHTML = renderNewsForm()

  function renderNewsForm() {
    return `
      <label class="input-form__title" for="inputNewsContent">News</label>
      <textarea id="inputNewsContent" class="input-form__text" rows="8"></textarea>
      <div class = "input-form__keyword">
        <input id="keyword" class="input-form__keyword-input" type="text" placeholder="type keyword for URL">
        <input id="keyword-url" class="input-form__keyword-url" type="url" placeholder="type URL">
      </div>
        <input id="submit-news" class="input-form__submit-btn" type="submit" value = "Public">
    `
  }

  const form = document.getElementById('form');

  form.addEventListener('submit', submitNews);
}
  // Create user menu
export function showUserMenu() {
    const loginBtn = document.getElementById("login-btn");

    loginBtn.textContent = "Log out";
    
}

export function hideUserMenu() {
  const headerContainer = document.querySelector(".header-container");
  const loginBtn = document.getElementById("login-btn");
  const loginMenu = document.createElement("div");
  sessionStorage.removeItem("userToken");
  loginBtn.value = "Log in";
  location.reload();
}

function submitNews(event) {
  const inputNewsContent = document.getElementById('inputNewsContent');
  const inputKeyword = document.getElementById('keyword');
  const inputKeywordUrl = document.getElementById('keyword-url');
  const submitBtn = document.getElementById('submit-news');
  event.preventDefault();
  const news = {
    content: inputNewsContent.value,
    keyword: inputKeyword.value,
    keywordUrl: inputKeywordUrl.value,
    date: new Date()
  }
  submitBtn.disabled = true;
  News.create(news).then(() => {
    inputNewsContent.value = '';
    inputKeyword.value = '';
    inputKeywordUrl.value = '';
    submitBtn.disabled = false;
  }) //can use create() method, because in news we use static

  News.get().then(() => {
    console.log('Новость отправлена на сервер!');
    window.location.reload();
  });
}

function deleteNews(event) {
  News.delete(event).then(() => {
    window.location.reload();
  })
}
