//Submit form ==> Lấy dữ liệu ==> Validate
const serverApi = `https://api.escuelajs.co/api/v1`;

document.body.addEventListener("submit", async (e) => {
  if (e.target.classList.contains("login-form")) {
    e.preventDefault();
    const loginForm = e.target;
    const { email, password } = Object.fromEntries([...new FormData(e.target)]);
    const errors = {};
    if (!email) {
      errors.email = "Vui lòng nhập email";
    }
    if (!password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }
    const errorElList = loginForm.querySelectorAll(".error");
    errorElList.forEach((errorEl) => {
      errorEl.innerText = "";
    });
    if (Object.keys(errors).length) {
      Object.keys(errors).forEach((key) => {
        const error = errors[key];
        const errorEl = loginForm.querySelector(`.error-${key}`);
        if (errorEl) {
          errorEl.innerText = error;
        }
      });
    } else {
      //Call API
      //https://api.escuelajs.co/api/v1/auth/login
      setLoadingBtn(loginForm);
      const loginData = await sendLogin({
        email,
        password,
      });
      removeLoadingBtn(loginForm);
      console.log(loginData);
      if (!loginData) {
        showMessage(loginForm, "Email hoặc mật khẩu không chính xác", "danger");
      } else {
        localStorage.setItem("login_token", JSON.stringify(loginData));
        render();
      }
    }
  }
});

const sendLogin = async (loginData) => {
  try {
    const response = await fetch(`${serverApi}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Unauthorize");
    }
    return response.json();
  } catch {
    return false;
  }
};

const getProfile = async () => {
  try {
    const { access_token: accessToken } = JSON.parse(
      localStorage.getItem("login_token")
    );
    console.log(localStorage.getItem("login_token"));
    const response = await fetch(`${serverApi}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Unauthorize");
    }
    return response.json();
  } catch {
    return false;
  }
};

const showMessage = (loginForm, msg, type = "success") => {
  const msgEl = loginForm.querySelector(".msg");
  msgEl.innerHTML = `<div class="alert alert-${type} text-center">${msg}</div>`;
};

const setLoadingBtn = (loginForm) => {
  const btn = loginForm.querySelector(".btn");
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span><span> Loading...</span>`;
};
const removeLoadingBtn = (loginForm) => {
  const btn = loginForm.querySelector(".btn");
  btn.innerText = "Đăng nhập";
  btn.disabled = false;
};

const sendRefreshToken = async () => {
  try {
    const { refresh_token: refreshToken } = JSON.parse(
      localStorage.getItem("login_token")
    );
    const response = await fetch(`${serverApi}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) {
      throw new Error("Unauthorize");
    }
    return response.json();
  } catch (e) {
    return false;
  }
};

const showProfile = async () => {
  const user = await getProfile();
  if (user) {
    const profileNameEl = document.querySelector(".profile-name");
    profileNameEl.innerText = user.name;
  } else {
    //Call Refresh Token
    const newToken = await sendRefreshToken();
    if (newToken) {
      localStorage.setItem("login_token", JSON.stringify(newToken));
      showProfile();
    } else {
      localStorage.removeItem("login_token");
      render();
    }
  }
};

const handleLogout = () => {
  localStorage.removeItem("login_token");
  render();
};

const render = () => {
  const status = localStorage.getItem("login_token") ? true : false; //Trạng thái đăng nhập
  if (status) {
    document.body.innerHTML = `<div class="container py-3">
      <h2>Chào mừng bạn đến với F8</h2>
      <ul class="list-unstyled d-flex gap-2">
        <li>Chào bạn: <span class="profile-name">Loading...</span></li>
        <li><a href="#" onclick="handleLogout()">Đăng xuất</a></li>
      </ul>
    </div>`;
    showProfile();
  } else {
    document.body.innerHTML = `<div class="w-50 mx-auto py-3">
      <h2 class="text-center">Đăng nhập</h2>
      <form action="" class="login-form">
        <div class="msg"></div>
        <div class="mb-3">
          <label for="">Email</label>
          <input
            type="text"
            name="email"
            class="form-control"
            placeholder="Email..."
          />
          <span class="text-danger error error-email"></span>
        </div>
        <div class="mb-3">
          <label for="">Mật khẩu</label>
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder="Mật khẩu..."
          />
          <span class="text-danger error error-password"></span>
        </div>
        <div class="d-grid">
          <button class="btn btn-primary">Đăng nhập</button>
        </div>
      </form>
    </div>`;
  }
};
document.addEventListener("DOMContentLoaded", render);
