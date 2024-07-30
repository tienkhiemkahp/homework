import { httpClient } from "./client.js";

const root = document.querySelector("#root");
const loginBtn = document.querySelector(".login-btn");
const logoutBtn = document.querySelector(".logout-btn");
let userName = ``;
let isLogin;
let firstTime = true;

const render = async () => {
  isLogin = (await localStorage.getItem("login_token")) ? true : false;
  if (!isLogin && !firstTime) {
    logoutBtn.style.display = "none";
    loginBtn.style.display = "none";
    root.innerHTML = `
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
        `;
  } else if (isLogin || firstTime) {
    if (isLogin) {
      firstTime = false;
    }
    logoutBtn.style.display = firstTime ? "none" : "block";
    root.innerHTML = `
        <div class="container mt-5" style="max-width: 600px">
            <h2 class="text-center mb-4">Create a New Post</h2>
            <form class="auth-form post-form">
            <div class="msg-el"></div>
            <div>User Name: ${userName}</div>
                <div class="msg-el"></div>
                <div class="mb-4">
                    <label class="form-label" for="title">Title</label>
                    <input type="text" id="title" class="form-control" placeholder="Enter the title">
                </div>
                <div class="mb-4">
                    <label class="form-label" for="content">Content</label>
                    <textarea id="content" class="form-control" rows="5" placeholder="Enter the content"></textarea>
                </div>
                <div class="mb-4">
                    <label class="form-label" for="postDate">Post Date and Time</label>
                    <input type="datetime-local" id="postDate" class="form-control">
                </div>
                <div class="text-center">
                    <button type="submit" class="post-blog btn btn-primary">Post</button>
                </div>
            </form>
        </div>
        <div class="render-post"></div>
        `;
    document.querySelector(".post-form").style.display = firstTime
      ? "none"
      : "block";
    const renderPost = root.querySelector(".render-post");
    handleScroll(1, renderPost);
  }
};

// hiển thị loading
const setLoadingBtn = (form) => {
  const btn = form.querySelector(".btn");
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span><span> Loading...</span>`;
};
const removeLoadingBtn = (form, btnName) => {
  const btn = form.querySelector(".btn");
  btn.innerText = btnName;
  btn.disabled = false;
};
// Show message

const showMessage = (form, msg, alertStatus) => {
  const msgEl = form.querySelector(".msg-el");
  msgEl.innerHTML = `<div class="alert alert-${alertStatus} text-center">${msg}</div>`;
};
const removeMessage = (form) => {
  const msgEl = form.querySelector(".msg-el");
  msgEl.innerHTML = ``;
};
// add submit event
document.body.addEventListener("submit", async (e) => {
  if (e.target.classList.contains("auth-form")) {
    e.preventDefault();
    if (e.target.classList.contains("login-form")) {
      let loginEmail = e.target.querySelector("#loginEmail").value;
      let loginPassword = e.target.querySelector("#loginPassword").value;
      setLoadingBtn(e.target);
      removeMessage(e.target);
      const loginData = await handleLogin(e.target, loginEmail, loginPassword);
      removeLoadingBtn(e.target, "sign in");
      if (!loginData) {
        showMessage(e.target, `Sai email hoặc mặt khẩu`, `danger`);
      } else {
        userName = loginData.data.name;
        localStorage.setItem(
          "login_token",
          JSON.stringify({
            accessToken: loginData.data.accessToken,
            refreshToken: loginData.data.refreshToken,
          })
        );
        render();
      }
    }
    if (e.target.classList.contains("register-form")) {
      let registerUsername = e.target.querySelector("#registerUsername").value;
      let registerEmail = e.target.querySelector("#registerEmail").value;
      let registerPassword = e.target.querySelector("#registerPassword").value;
      setLoadingBtn(e.target);
      removeMessage(e.target);
      const registerData = await handleRegister(
        e.target,
        registerEmail,
        registerPassword,
        registerUsername
      );
      removeLoadingBtn(e.target, `Sign up`);
      if (!registerData) {
        showMessage(e.target, `Đăng kí thất bại`, `danger`);
      } else {
        showMessage(e.target, `Đăng kí thành công`, `success`);
      }
    }
    if (e.target.classList.contains("post-form")) {
      const title = e.target.querySelector("#title").value;
      const content = e.target.querySelector("#content").value;
      setLoadingBtn(e.target);
      const postStatus = await handlePostBlog(e.target, title, content);
      removeLoadingBtn(e.target, 'post');
      if (postStatus) {
        if (postStatus.code === 200) {
          showMessage(e.target, "Đăng bài thành công", `success`);
          setTimeout(function () {
            render();
          }, 1500);
        }
      } else {
        showMessage(
          e.target,
          "Phiên đăng nhập hết hạn, không thể đăng bài !",
          `danger`
        );
        setTimeout(function () {
          localStorage.removeItem("login_token");
          render();
        }, 2000);
      }
    }
  }
});

const handleLogin = async (form, email, password) => {
  if (!email || !password) {
    showMessage(form, "Vui lòng điền đầy đủ tài khoản và mật khẩu", `danger`);
  } else {
    try {
      const { response, data } = await httpClient.post(`/auth/login`, {
        email,
        password,
      });
      if (!response.ok) {
        return false;
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
};
const handleRegister = async (form, email, password, name) => {
  if (!email || !password || !name) {
    showMessage(form, "Vui lòng điền đầy đủ thông tin", `danger`);
  } else if (password && password.length < 8) {
    showMessage(form, "Password phải có ít nhất 8 kí tự", `danger`);
  } else {
    try {
      const { response, data } = await httpClient.post(`/auth/register`, {
        email,
        password,
        name,
      });
      if (!response.ok) {
        return false;
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
};
const handleLogout = async () => {
  try {
    const loginToken = localStorage.getItem("login_token");
    if (!loginToken) {
      throw new Error("Không tìm thấy token.");
    }
    const { accessToken } = JSON.parse(loginToken);
    httpClient.token = accessToken;
    const { response } = await httpClient.post("/auth/logout");
    if (!response.ok) {
      throw new Error("Đăng xuất không thành công.");
    }
    localStorage.removeItem("login_token");
    render();
  } catch (error) {
    localStorage.removeItem("login_token");
    render();
    console.error("Lỗi khi đăng xuất:", error);
  }
};
const getBlogsData = async (pageNumber) => {
  try {
    const { response, data } = await httpClient.get(
      `/blogs?limit=10&page=${pageNumber}`
    );
    if (!response.ok) {
      return false;
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};
const getBlogs = async (pageNumber, renderPostEl) => {
  const blogs = await getBlogsData(pageNumber);
  renderPage(blogs.data, renderPostEl);
};
const renderPage = (blogs, renderPostEl) => {
  renderPostEl.innerHTML += `${blogs
    .map(
      ({ title, content, userId, timeUp }) =>
        `<div class="container mt-5" style="max-width: 600px;">
            <div class="post-container">
                <div class="post-meta">
                    <span><strong>User:</strong><a href="#">${
                      userId.name
                    }</a></span>
                      |
                    <span><strong>Date:</strong> ${moment(timeUp).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}</span>
                    |
                    <span>${moment(timeUp).fromNow()}</span>
                </div>
                <div class="post-title mt-2">
                    <h2>${title}</h2>
                </div>
                <div class="post-content mt-3">
                    <p>${content}</p>
                </div>
            </div>
        </div>`
    )
    .join("")}`;
};

const handleScroll = async (pageNumber, renderPostEl) => {
  getBlogs(pageNumber, renderPostEl);
  window.addEventListener("scroll", function () {
    var rate =
      (window.scrollY + window.innerHeight) /
      document.documentElement.scrollHeight;
    if (rate == 1) {
      setTimeout(async function () {
        pageNumber += 1;
        await getBlogs(pageNumber, renderPostEl);
      }, 400);
    }
  });
};
const handlePostBlog = async (form, title, content) => {
  if (!title || !content) {
    showMessage(form, "Vui lòng điền đầy đủ thông tin", `danger`);
  } else {
    try {
      const loginToken = localStorage.getItem("login_token");
      if (!loginToken) {
        throw new Error("Không tìm thấy token.");
      }
      const { accessToken } = JSON.parse(loginToken);
      httpClient.token = accessToken;
      const { response, data } = await httpClient.post("/blogs", {
        title,
        content,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }
};

loginBtn.addEventListener("click", function () {
  firstTime = false;
  render();
});
logoutBtn.addEventListener("click", handleLogout);
document.addEventListener("DOMContentLoaded", render());
