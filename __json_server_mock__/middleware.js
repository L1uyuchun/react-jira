const { users, projects } = require("./data");

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
    // const ratio = Math.random();
    const ratio = 1;
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
  } else if (req.method === "GET" && req.path === "/users") {
    res.json({
      code: 200,
      data: users,
    });
  } else if (req.method === "GET" && req.path === "/projects") {
    const params = req.query;
    const allData = projects;
    let result = [];
    if (!params.name && !params.personId) {
      result = allData;
    } else if (params.name && !params.personId) {
      result = allData.filter((item) => item.name.indexOf(params.name) !== -1);
    } else if (!params.name && params.personId) {
      result = allData.filter(
        (item) => item.personId === Number(params.personId)
      );
    } else {
      result = allData.filter(
        (item) =>
          item.personId === Number(params.personId) &&
          item.name.indexOf(params.name) !== -1
      );
    }
    res.json({
      code: 200,
      data: result,
    });
  } else if (req.method === "POST" && req.path === `/project/edit`) {
    const params = req.body;
    projects.some((item, index) => {
      if (item.id === params.id) {
        projects[index][params.field] = params.value;
        return true;
      }
    });
    res.json({
      code: 200,
      data: [],
    });
  } else if (req.method === "POST" && req.path === "/project/getInfoById") {
    if (!req.body.id) {
      res.json({
        code: 500,
        data: {
          msg: "'id' is required in parameter ",
        },
      });
    } else {
      res.json({
        code: 200,
        data: projects.filter((item) => item.id === req.body.id),
      });
    }
  } else if (req.method === "POST" && req.path === "/project/saveProject") {
    console.log(req.body);
    if (req.body.id) {
      const index = projects.findIndex((item) => item.id === req.body.id);
      projects.splice(index, 1, req.body);
    } else {
      const item = { id: projects[projects.length - 1].id + 1, ...req.body };
      projects.push(item);
    }

    res.json({
      code: 200,
      data: [],
    });
  } else if (req.method === "POST" && req.path === "/project/delete") {
    if (req.body.id) {
      const index = projects.findIndex((item) => item.id === req.body.id);
      projects.splice(index, 1);
    }

    res.json({
      code: 200,
      data: [],
    });
  } else if (req.method === "POST" && req.path === "/getProjectInfo") {
    res.json({
      code: 200,
      data: projects.filter((item) => item.id === req.body.id),
    });
  }
  next();
};
