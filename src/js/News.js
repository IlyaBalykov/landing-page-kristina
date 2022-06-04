export class News {
    static create(news) {
        const userToken = sessionStorage.getItem("userToken");
        if (!userToken) {
            return Promise.resolve('<p>ERROR</p>')
        }

        return fetch(`https://landing-page-kristina-default-rtdb.europe-west1.firebasedatabase.app/news.json?auth=${userToken}`, {
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
            newsContainer.dataset.uid = `${newsId}`;
            newsContainer.dataset.lang = "eng";

            time.className = "news-date";
            time.setAttribute('datetime', `${newsList[newsId].date}` )
            time.textContent = `${new Date(newsList[newsId].date).toLocaleDateString()}`;
            
            content.className = "news-content"
            content.textContent = newsList[newsId].content;
            newsContainer.append(time, content);
            newsSection.append(newsContainer);
        }
    }
    static delete(event) {
        const userToken = sessionStorage.getItem("userToken");
        let uid = event.target.parentNode.dataset.uid
        return fetch(`https://landing-page-kristina-default-rtdb.europe-west1.firebasedatabase.app/news/${uid}.json?auth=${userToken}`, {
            method: "DELETE",
            headers: {
                'Content-Type':'application/json'
            },
        })
    }
}