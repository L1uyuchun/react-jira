import { Table } from "antd";

interface Projects {
  id: number;
  name: string;
  personId: number;
  organization: string;
}

export interface User {
  id: number;
  name: string;
}

interface listProps {
  list: Projects[];
  userList: User[];
}

export const ListTable = ({ list, userList }: listProps) => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "负责人",
      dataIndex: "organization",
      render: (value: string, row: Projects) => {
        return userList.filter((user) => user.id === row.personId)[0]?.name;
      },
    },
  ];
  return (
    <div style={{ width: "600px" }}>
      <Table
        columns={columns}
        dataSource={list}
        rowKey={"id"}
        pagination={false}
      />
    </div>
  );
};
