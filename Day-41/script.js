const apiUrl = `https://api-auth-two.vercel.app`
var isLogined;
var isFirstTime = true;

document.body.addEventListener("submit", (e) => {
    if (e.target.classList.contains("auth-form")) {
        e.preventDefault()
        if (e.target.classList.contains("login-form")) {
            let loginEmail = e.target.querySelector("#loginEmail").value;
            let loginPassword = e.target.querySelector("#loginPassword").value
            if (!loginEmail || !loginPassword) {
                showMessage(e.target, "vui lòng điền đầy đủ email và password")
            } else {
                setLoadingBtn(e.target)
                handleLogin(e.target, loginEmail, loginPassword)
            }
        }
        if (e.target.classList.contains("register-form")) {
            let registerUsername = e.target.querySelector("#registerUsername").value;
            let registerEmail = e.target.querySelector("#registerEmail").value;
            let registerPassword = e.target.querySelector("#registerPassword").value;
            if (!registerEmail || !registerPassword || !registerUsername) {
                showMessage(e.target, "vui lòng điền đầy đủ email, password và username")
            } else {
                setLoadingBtn(e.target)
                handleRegister(e.target, registerEmail, registerPassword, registerUsername)
            }
        }
        if (e.target.classList.contains("post-form")){
            const title = e.target.querySelector("#title").value;
            const content = e.target.querySelector("#content").value
            console.log(e.target);
            handlePostBlog(e.target, title, content)
        }
    }
})

const showMessage = (form, msg) => {
    const msgEl = form.querySelector(".msg-el")
    msgEl.innerHTML = `<div class="alert alert-danger text-center">${msg}</div>`
}

const handleLogin = async (form, loginEmail, loginPassword) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: loginEmail, password: loginPassword})
    })
    const loginData = await response.json()
    if (loginData.code === 200) {
        localStorage.setItem("access_token", loginData.data.accessToken);
        localStorage.setItem("refresh_token", loginData.data.refreshToken);
        isLogined = true;
        isFirstTime = false
        render(true, loginData)
    } else {
        showMessage(form, `${loginData.message}`)
    }
    removeLoadingBtn(form)
}

const handlePostBlog = async (form, title, content) => {
    console.log(JSON.stringify({title: title, content: content}));
    const response = await fetch(`${apiUrl}/auth/blogs`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({title: title, content: content})
    })
    const postData = await response.json()
    if (postData.code === 200) {
        showMessage(form, `${loginData.message}`)
        render(true, loginData)
    } else {
        // showMessage(form, `${loginData.message}`)
    }
    removeLoadingBtn(form)
}

const handleRefreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token")
    if (refreshToken) {
        const response = await fetch(`${apiUrl}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        })
        const tokenData = await response.json()
        if (tokenData.code === 200) {
            localStorage.setItem("access_token", tokenData.data.token.accessToken);
            localStorage.setItem("refresh_token", tokenData.data.token.refreshToken);
            return true;
        } else {
            handleLogout();
            return false;
        }
    } else {
        handleLogout();
        return false;
    }
}

const handleRegister = async (form, registerEmail, registerPassword, registerUsername) => {
    const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: registerEmail, password: registerPassword, name: registerUsername})
    })
    const registerData = await response.json()
    if (registerData.code === 201) {
        showMessage(form, `${registerData.message}`)
    } else {
        showMessage(form, `Tạo tài khoản thất bại`)
    }
    console.log(registerData);
    removeLoadingBtn(form)
}

const setLoadingBtn = (form) => {
    const btn = form.querySelector(".btn");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span><span> Loading...</span>`;
};
const removeLoadingBtn = (form) => {
    const btn = form.querySelector(".btn");
    btn.innerText = "Đăng nhập";
    btn.disabled = false;
};
const handleLogout = () => {
    isFirstTime = false;
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    isLogined = false;
    render(false);
};
const render = (status, loginData) => {
    isLogined = localStorage.getItem("access_token") ? true : false;
    if (status || isFirstTime === true) {
        document.body.innerHTML = `
        <div class="home-page">
            <header class="header d-flex justify-content-between align-items-center">
                <h1 class="ms-3">My Blog</h1>
                <div class="btn-group">
                    <a href="#" class="logout-header-btn btn btn-danger me-3 ${isLogined ? `` : `d-none`}">Log Out</a>
                    <a href="#" class="login-header-btn btn btn-primary me-3 ${isLogined ? `d-none` : ``}">Log in</a>
                </div>
            </header>
            <div class="container mt-5 ${isLogined ? `` : `d-none`}" style="max-width: 600px">
                <h2 class="text-center mb-4">Create a New Post</h2>
                <form class="auth-form post-form">
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
                        <button type="submit" class="btn btn-primary">Post</button>
                    </div>
                </form>
            </div>
            <div class="render-post">
            </div>
            <footer class="footer text-center py-3">
                <p>&copy; 2024 My Blog. All rights reserved.</p>
            </footer>
        </div>
        `
        const loginHeaderBtn = document.querySelector(".login-header-btn")
        loginHeaderBtn.addEventListener("click", () => {
            isFirstTime = false;
            render()
        })
        const logoutHeaderBtn = document.querySelector(".logout-header-btn")
        logoutHeaderBtn.addEventListener("click", handleLogout)
        const renderPostEl = document.querySelector(".render-post")
        handleScroll(1, renderPostEl)
    } else {
        document.body.innerHTML = `
        <div class="auth-form-page">
            <header class="header d-flex justify-content-between align-items-center">
                <h1 class="ms-3">My Blog</h1>
            </header>
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
            <footer class="footer">
                <p>&copy; 2024 My App. All rights reserved.</p>
            </footer>
        </div>
        `
    }
}

document.addEventListener("DOMContentLoaded", render);

// Infinity scroll
const getBlogs = async (pageNumber, renderPostEl) => {
    const response = await fetch(`${apiUrl}/blogs?limit=10&page=${pageNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });
    const blogs = await response.json();
    renderPage(blogs.data, renderPostEl)  
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
        if (rate === 1) {
            setTimeout(function () {
                pageNumber += 1;
                getBlogs(pageNumber, renderPostEl)
            }, 400)
        }
    }) 
}


