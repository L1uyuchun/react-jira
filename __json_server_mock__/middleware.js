// module.exports = (req, res, next) => {
//     res.header('X-Hello', 'World')
//     next()
// }
module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "admin" && req.body.password === "admin") {
      res.json({
        code: 200,
        data: {
          token: "123",
          msg: "登录成功",
          name: "liuyc",
          personId: "1",
        },
      });
    } else {
      res.json({
        code: 400,
        data: {
          token: null,
          msg: "用户名或者密码错误",
        },
      });
    }
  }
  next();
};
