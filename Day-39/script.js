const apiUrl = "http://localhost:3000/posts";
const container = document.querySelector(".container");
var number = 10;
const getApi = async (number) => {
    const response = await fetch(`${apiUrl}?_page=1&_limit=${number}`)
    const posts = await response.json()
    renderPage(posts.slice(-5).reverse())
}

const renderPage = (posts) => {
    container.innerHTML += `${posts.map(({user, title, content, date}) =>
`<div class="col-md-9" style="width: 90vh">
    <div class="card mb-3" style="height: 33.333333vh; width: 100%">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="https://picsum.photos/${Math.floor(Math.random() * 50) + 300}" class="card-img img-fluid" alt="Card image">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h2 class="card-title user-name">${user}</h2>
                    <h4 class="card-subtitle mb-2 title">${title}</h4>
                    <p class="card-text content">${content}</p>
                    <p class="card-text"><small class="text-muted date">${date}</small></p>
                </div>
            </div>
        </div>
    </div>
</div>`
  ).join("")}`

}

const handleScroll = () => {
    getApi(number)
    window.addEventListener('scroll', function () {
        var rate = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
        if (rate === 1) {
            this.setTimeout(function () {
                number += 5;
                getApi(number)
            }, 400)
        }
    }) 
}
handleScroll()






  