// import {response} from "express";
export class News {
    static create(news) {
        return fetch('https://landing-page-kristina-default-rtdb.europe-west1.firebasedatabase.app/news.json', {
            method: 'POST',
            body: JSON.stringify(news), // convert body of request (news) to JSON
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => console.log(response))
    }

    static get() {
        return fetch('https://landing-page-kristina-default-rtdb.europe-west1.firebasedatabase.app/news.json')
            .then(response => response.json())
            .then(newsList => News.renderNews(newsList)) // not this.renderList, because newsist will be [Objectobject] if 'this'
    }

    static renderNews(newsList) {
        const newsSection = document.querySelector(".main-news")
        while (newsSection.firstChild) {
            newsSection.removeChild(newsSection.firstChild)
        }
        for (let newsId in newsList) {
            const newsContainer = document.createElement("article");
            const time = document.createElement('time')
            const content = document.createElement('p');

            newsContainer.className = "new-news";
            
            time.className = "news-date";
            time.setAttribute('datetime', `${newsList[newsId].date}` )
            time.textContent = newsList[newsId].date;
            
            content.className = "news-content"
            content.textContent = newsList[newsId].content;
            newsContainer.append(time, content);
            newsSection.append(newsContainer);
            
            console.log(newsList[newsId].date)
        }
    }
}