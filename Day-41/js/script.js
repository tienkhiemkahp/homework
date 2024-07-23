import { config } from "./config.js";
import { setTokenStorage , getTokenStorage } from "./storage.js";
import { httpClient } from "./client.js";
httpClient.baseUrl = config.SERVER_API;

const root = document.querySelector("#root");
const logoutBtn = document.querySelector(".logout-btn");
let userName = ``;
let isLogin;


const render = async () => {
    isLogin = localStorage.getItem("login_token") ? true : false;
    if (!isLogin) {
        logoutBtn.style.display = "none";
        root.innerHTML = 
        `
        <div class="container mt-5 form-container" style="width: 40%; height: 77vh;">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="pills-login-tab" data-bs-toggle="pill" href="#pills-login" role="tab"
                        aria-controls="pills-login" aria-selected="true">Login</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="pills-register-tab" data-bs-toggle="pill" href="#pills-register" role="tab"
                        aria-controls="pills-register" aria-selected="false">Register</a>
                    </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                        <form class="auth-form login-form">
                            <div class="msg-el"></div>
                            <div class="mb-4">
                                <label class="form-label" for="loginEmail">Email or username</label>
                                <input type="email" id="loginEmail" class="form-control" />
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="loginPassword">Password</label>
                                <input type="password" id="loginPassword" class="form-control" />
                            </div>
                            <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
                        </form>
                    </div>
                    <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                        <form class="auth-form register-form">
                            <div class="msg-el"></div>
                            <div class="mb-4">
                                <label class="form-label" for="registerUsername">Username</label>
                                <input type="text" id="registerUsername" class="form-control" />
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="registerEmail">Email</label>
                                <input type="email" id="registerEmail" class="form-control" />
                            </div>
                            <div class="mb-4">
                                <label class="form-label" for="registerPassword">Password</label>
                                <input type="password" id="registerPassword" class="form-control" />
                            </div>
                            <button type="submit" class="btn btn-primary btn-block mb-3">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        `
    } else {
        logoutBtn.style.display = "block";
        root.innerHTML = 
        `
        <div class="container mt-5" style="max-width: 600px">
            <h2 class="text-center mb-4">Create a New Post</h2>
            <form class="auth-form post-form">
            <div class="msg-el"></div>
            <div>User Name: ${userName}</div>
                <div class="msg-el"></div>
                <div class="mb-4">
                    <label class="form-label" for="title">Title</label>
                    <input type="text" id="title" class="form-control" placeholder="Enter the title" required>
                </div>
                <div class="mb-4">
                    <label class="form-label" for="content">Content</label>
                    <textarea id="content" class="form-control" rows="5" placeholder="Enter the content" required></textarea>
                </div>
                <div class="mb-4">
                    <label class="form-label" for="postDate">Post Date and Time</label>
                    <input type="datetime-local" id="postDate" class="form-control" required>
                </div>
                <div class="text-center">
                    <button type="submit" class="post-blog btn btn-primary">Post</button>
                </div>
            </form>
        </div>
        <div class="render-post"></div>
        `
        const renderPost = root.querySelector(".render-post")
        handleScroll(1, renderPost)
    }
}

// Refreshtoken

const getRefreshToken = async () => {
    try {
        const refreshToken = JSON.parse(localStorage.getItem("login_token")).refresh_token
        const {response, data} = await httpClient.post('/auth/refresh-token', {refreshToken})
        console.log(data);
        const tokens = {
            access_token: data.data.token.accessToken,
            refresh_token: data.data.token.refreshToken
        }
        setTokenStorage(tokens)
        console.log(tokens);
        httpClient.token = tokens.access_token;
    } catch {
        localStorage.removeItem("login_token")
        httpClient.token = null;
        render()
    }
}

setInterval(function () {
    if (isLogin) {
        getRefreshToken()
    }
}, 1600)


// Thêm loading

const setLoadingBtn = (form) => {
    const btn = form.querySelector(".btn");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span><span> Loading...</span>`;
};
const removeLoadingBtn = (form) => {
    const btn = form.querySelector(".btn");
    btn.innerText = "Sign in";
    btn.disabled = false;
};
// Show message

const showMessage = (form, msg) => {
    const msgEl = form.querySelector(".msg-el")
    msgEl.innerHTML = `<div class="alert alert-danger text-center">${msg}</div>`
}

// add submit event
document.body.addEventListener("submit", (e) => {
    if (e.target.classList.contains("auth-form")) {
        e.preventDefault()
        if (e.target.classList.contains("login-form")) {
            let loginEmail = e.target.querySelector("#loginEmail").value;
            let loginPassword = e.target.querySelector("#loginPassword").value
            handleLogin(e.target, loginEmail, loginPassword)

        }
        if (e.target.classList.contains("register-form")) {
            let registerUsername = e.target.querySelector("#registerUsername").value;
            let registerEmail = e.target.querySelector("#registerEmail").value;
            let registerPassword = e.target.querySelector("#registerPassword").value;
            handleRegister(e.target, registerUsername, registerEmail, registerPassword)
        }
        if (e.target.classList.contains("post-form")){
            const title = e.target.querySelector("#title").value;
            const content = e.target.querySelector("#content").value
            handlePostBlog(e.target, title, content)
        }
    }
})

// Add Logout

// logoutBtn.addEventListener()

const handleLogin = async function (loginForm, email, password) {
    if(!email || !password) {
        showMessage(loginForm, `Vui lòng điền đầy đủ email và password`)
    } else {
        try {
            setLoadingBtn(loginForm)
            const {response, data} = await httpClient.post('/auth/login', {email, password})
            if (response.ok && data.code === 200 && data.status_code === "SUCCESS") {
                console.log(`Đăng nhập thành công`);
            }
            console.log(data);
            const tokens = {
                access_token: data.data.accessToken,
                refresh_token: data.data.refreshToken
            }
            setTokenStorage(tokens)
            httpClient.token = tokens.access_token;
            userName = data.data.name
            render()
        } catch (e) {
            showMessage(loginForm, `Đăng nhập thất bại`)
            console.log(e)
        }
        removeLoadingBtn(loginForm)
    }
}
const handleRegister = async function (registerForm,name , email, password ) {
    if(!email || !password || !name) {
        showMessage(registerForm, `Vui lòng điền đầy đủ name, email và password`)
    } else {
        try {
            setLoadingBtn(registerForm)
            const {response, data} = await httpClient.post('/auth/register', {email, password, name})
            console.log(data);
            if (response.ok && data.code === 201 && data.status_code === "SUCCESS") {
                showMessage(registerForm, "Đăng kí thành công")
            }
        } catch (e) {
            showMessage(registerForm, `Đăng kí thất bại`)
            console.log(e)
        }
        removeLoadingBtn(registerForm)
    }
}

const handleLogout = async function () {
    try {
      const token = JSON.parse(localStorage.getItem("login_token")).access_token;
      if (!token) {
        throw new Error("Không có token để đăng xuất");
      }
      const { response, data } = await httpClient.post(`/auth/logout`, null, {token});
      if (!response.ok) {
        throw new Error(data.message || "Đăng xuất thất bại");
      }
      localStorage.removeItem("login_token") 
      console.log("Đăng xuất thành công:", data.message);
      render(); 
  
    } catch (error) {
      console.error("Lỗi đăng xuất:", error.message);
    }
  };

const getBlogs = async (pageNumber, renderPostEl) => {
    try {
        const {response, data} = await httpClient.get(`/blogs?limit=10&page=${pageNumber}`)
        renderPage(data.data, renderPostEl)
    } catch (e) {
        console.log(e);
    }
    
}
const renderPage = (blogs, renderPostEl) => {
    renderPostEl.innerHTML += `${blogs.map(({title, content, userId, timeUp}) =>
        `<div class="container mt-5" style="max-width: 600px;">
            <div class="post-container">
                <div class="post-meta">
                    <span><strong>User:</strong> ${userId.name}</span> |
                    <span><strong>Date:</strong> ${timeUp.split('T')[0]} ${timeUp.split('T')[1].slice(0,8)}</span>
                </div>
                <div class="post-title mt-2">
                    <h2>${title}</h2>
                </div>
                <div class="post-content mt-3">
                    <p>${content}</p>
                </div>
            </div>
        </div>`
    ).join("")}`
}

const handleScroll = (pageNumber, renderPostEl) => {

    getBlogs(pageNumber, renderPostEl)
    window.addEventListener('scroll', function () {
        var rate = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
        if (rate == 1) {
            setTimeout(function () {
                pageNumber += 1;
                getBlogs(pageNumber, renderPostEl)
            }, 400)
        }
    }) 
}
const handlePostBlog = async(postForm, title, content) => {
    const token = JSON.parse(localStorage.getItem("login_token")).access_token;
    const {response, data} = await httpClient.post('/blogs', {title, content}, {token})
    if (response.ok && data.code === 200 && data.status_code === "SUCCESS") {
        render()
    }
}
logoutBtn.addEventListener("click", handleLogout);

document.addEventListener("DOMContentLoaded",render())

