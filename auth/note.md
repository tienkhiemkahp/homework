# Authentication - Authorization

- Authentication: Xác minh danh tính
- Authorization: Xác minh quyền

2 cách xác thực (Authentication)

- Cookie-based Authentication
  Session ==> Lưu trữ phía server ==> Trả về session_id cho trình duyệt thông qua Cookie

- Token-based Authentication
  Lưu trữ thông tin user vào token (JWT = Json Web Token)

## Đăng xuất

Yêu cầu đăng xuất ==> Call API tới Server ==> Lưu accessToken vào Blacklist của Server ==> Xóa localStorage
