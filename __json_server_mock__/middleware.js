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
  } else if (req.method === "GET" && req.path === "/islogin") {
    // 模拟登录失效，有50%的机会失效
    const ratio = Math.random();
    if (req.headers.authorization === "Bearer 123" && ratio >= 0.5) {
      res.json({
        code: 200,
        data: {
          token: "123",
          name: "liuyc",
          personId: "1",
        },
      });
    } else {
      res.json({
        code: 401,
        data: {
          token: null,
          msg: "请重新登录",
        },
      });
    }
  }
  next();
};
