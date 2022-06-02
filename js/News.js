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
}