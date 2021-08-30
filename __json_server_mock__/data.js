exports.users = [
  {
    id: 1,
    name: "张三",
  },
  {
    id: 2,
    name: "李四",
  },
  {
    id: 3,
    name: "王五",
  },
  {
    id: 4,
    name: "赵六",
  },
];
exports.projects = [
  {
    id: 1,
    name: "骑手管理",
    personId: 1,
    organization: "外卖组",
    creatTime: 1629163924000,
    isCollection: 1,
  },
  {
    id: 2,
    name: "团购APP",
    personId: 2,
    organization: "团购组",
    creatTime: 1629163924000,
    isCollection: 1,
  },
  {
    id: 3,
    name: "物料管理系统",
    personId: 2,
    organization: "物料组",
    creatTime: 1629163924000,
    isCollection: 1,
  },
  {
    id: 4,
    name: "总部管理系统",
    personId: 3,
    organization: "总部组",
    creatTime: 1629163924000,
    isCollection: 0,
  },
  {
    id: 5,
    name: "送餐路线规划系统",
    personId: 4,
    organization: "送餐组",
    creatTime: 1629163924000,
    isCollection: 0,
  },
];

exports.projectsDetails = {
  id: 1,
  name: "骑手管理",
  personId: 1,
  organization: "外卖组",
  creatTime: 1629163924000,
  isCollection: 0,
  board: [
    {
      status: "待完成", //
      subTasks: [
        {
          name: "性能优化",
          id: 1,
        },
      ],
    },
    {
      status: "开发中", //
      subTasks: [
        {
          name: "登录页面开发",
          id: 2,
        },
        {
          name: "项目页面开发",
          id: 3,
        },
        {
          name: "项目详情页面开发",
          id: 4,
        },
        {
          name: "布局页面开发",
          id: 5,
        },
      ],
    },
    {
      status: "已完成", //
      subTasks: null,
    },
  ],
};

exports.taskType = [
  {
    id: 1,
    type: "bug",
  },
  {
    id: 2,
    type: "task",
  },
  {
    id: 3,
    type: "bug",
  },
  {
    id: 4,
    type: "bug",
  },
  {
    id: 5,
    type: "task",
  },
  {
    id: 6,
    type: "task",
  },
];
