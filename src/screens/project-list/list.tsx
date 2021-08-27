import { Dropdown, Menu, Table } from "antd";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { TableProps } from "antd/lib/table/Table";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "@/components/Star";
import {
  useCreateProjectParam,
  useDeleteProjects,
  useEditProject,
  useEditStar,
} from "@/screens/project-list/project-list-hooks";
import { EllipsisOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";

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
  const queryClient = useQueryClient();
  const { mutate } = useEditStar();
  const { deleteMutate } = useDeleteProjects();
  const { setEditUrlParams } = useCreateProjectParam();
  const navigate = useNavigate();

  const editIsCollection = (
    value: string | number | null | undefined | [] | {},
    id: number
  ) => {
    mutate({ id, field: "isCollection", value });
  };
  const deleteProject = (id: number) => {
    deleteMutate({ id });
  };
  const goToProjectDetail = (row: Projects) => {
    navigate(`/project/${row.id}/board`, { state: row });
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
        return (
          <div
            onClick={() => goToProjectDetail(row)}
            style={{ color: "#1890ff", cursor: "pointer" }}
          >
            {value}
          </div>
        );
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
    {
      render: (value: Date, record: Projects) => {
        return (
          <Dropdown
            overlay={
              <Menu style={{ width: "100px" }}>
                <Menu.Item
                  onClick={() => setEditUrlParams({ editProject: record.id })}
                  key={"edit"}
                >
                  编辑
                </Menu.Item>
                <Menu.Item
                  key={"delete"}
                  onClick={() => deleteProject(record.id)}
                >
                  删除
                </Menu.Item>
              </Menu>
            }
          >
            <EllipsisOutlined />
          </Dropdown>
        );
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
