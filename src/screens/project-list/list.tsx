import { Table } from "antd";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { TableProps } from "antd/lib/table/Table";
import { Link } from "react-router-dom";

export interface Projects {
  id: number;
  name?: string;
  personId?: number;
  organization?: string;
}

export interface User {
  id: number;
  name: string;
}

interface listProps extends TableProps<Projects> {
  list: Projects[];
  userList: User[];
}

export const ListTable = ({ list, userList, ...props }: listProps) => {
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      width: 400,
      render: (value: string, row: Projects) => {
        return <Link to={`/project/${row.id}`}>{value}</Link>;
      },
    },
    {
      title: "部门",
      dataIndex: "organization",
      width: 400,
    },
    {
      title: "负责人",
      dataIndex: "organization",
      width: 400,
      render: (value: string, row: Projects) => {
        return userList.filter((user) => user.id === row.personId)[0]?.name;
      },
    },
    {
      title: "创建时间",
      dataIndex: "organization",
      render: (value: Date) => {
        return dayjs(value).format("YYYY-MM-DD");
      },
    },
  ];

  return (
    <ProjectList>
      <Table
        bordered
        columns={columns}
        dataSource={list}
        rowKey={"id"}
        pagination={false}
        {...props}
      />
    </ProjectList>
  );
};
const ProjectList = styled.div`
  padding: 0 20px;
`;
// const HeaderLeft = styled.div`
// `
