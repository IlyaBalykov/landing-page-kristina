import { News } from "./News.js";

export function renderAdminElements() {
  const newsContainer = document.querySelectorAll('.new-news');

  newsContainer.forEach(element => {
    const removeBtn = document.createElement('button');

    removeBtn.classList.add('news__delete-btn');
    removeBtn.textContent = 'Remove';
    element.append(removeBtn);
    
    removeBtn.addEventListener('click', deleteNews )
  })
}

function deleteNews(event) {
  News.delete(event).then()
}