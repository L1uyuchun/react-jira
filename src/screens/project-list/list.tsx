import { Table } from "antd";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { TableProps } from "antd/lib/table/Table";
import { Link } from "react-router-dom";
import { Star } from "@/components/Star";
import { useEditProject } from "@/screens/project-list/api-custom-hooks";

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
  entry: () => void;
}

export const ListTable = ({ list, userList, entry, ...props }: listProps) => {
  const { projectEdit } = useEditProject();
  const editIsCollection = (
    value: string | number | null | undefined | [] | {},
    id: number
  ) => {
    projectEdit({ id, field: "isCollection", value }).then((res) => {
      entry();
    });
  };
  const columns = [
    {
      dataIndex: "isCollection",
      render: (value: string, row: Projects) => {
        return (
          <Star
            checked={!!value}
            onChange={(value: number) => editIsCollection(value, row.id)}
          />
        );
      },
      title: () => <Star checked={true} disabled></Star>,
    },
    {
      title: "名称",
      dataIndex: "name",
      render: (value: string, row: Projects) => {
        return <Link to={`/project/${row.id}`}>{value}</Link>;
      },
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      dataIndex: "organization",
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
