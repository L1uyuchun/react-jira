import { ProjectTaskDetail } from "@/screens/project-detail/type";
import styled from "@emotion/styled";
import { Row } from "@/components/Row";
import {
  CheckCircleTwoTone,
  EllipsisOutlined,
  MinusSquareTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import {
  useAddSubTaskReq,
  useCreateBoard,
  useDetailSearchParams,
  useGetType,
} from "@/screens/project-detail/detail-custom-hooks";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { projectDetailContext } from "@/screens/project-detail";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { Draggle, Drop, DropChild } from "@/utils/drag";
type ProjectTaskProps = { projectProcessPart: ProjectTaskDetail } & {
  index: number;
  key: string;
};

export const ProjectTask = ({
  projectProcessPart,
  ...rest
}: ProjectTaskProps) => {
  const onDragEnd = () => {};
  return (
    <Draggle
      draggableId={projectProcessPart["status"]}
      key={rest?.key}
      index={rest?.index}
    >
      <ProjectTaskWraper>
        <Header justifyContent={"space-between"}>
          <h1>{projectProcessPart?.["status"]}</h1>
          <EllipsisOutlined />
        </Header>
        <Drop
          droppableId={`droppableColumn${projectProcessPart["status"]}`}
          direction="vertical"
          type={"ROW"}
        >
          <DropChild style={{ minHeight: "5px" }}>
            {(projectProcessPart?.subTasks || []).map((item, index) => (
              <Draggle
                draggableId={`drag${item.id}`}
                key={item.id}
                index={index}
              >
                <SubTask>
                  <SubTaskName name={item.name} />
                  <SubTaskType id={item.id} />
                </SubTask>
              </Draggle>
            ))}
          </DropChild>
        </Drop>

        <AddSubTask boardType={projectProcessPart?.["status"]} />
      </ProjectTaskWraper>
    </Draggle>
  );
};

const SubTaskName = ({ name }: { name: string }) => {
  const { searchParam } = useDetailSearchParams();
  const searchTaskName = searchParam?.taskName;
  if (!searchTaskName) {
    return <div style={{ marginBottom: "10px" }}>{name}</div>;
  } else {
    const arr = name.split(searchTaskName);
    return (
      <div>
        {arr.map((item, index) =>
          item === arr[arr.length - 1] ? (
            <span key={index}>item</span>
          ) : (
            <span key={index}>
              <span>item</span>
              <span style={{ color: "red" }}>searchTaskName</span>
            </span>
          )
        )}
      </div>
    );
  }
};

const SubTaskType = ({ id }: { id: number }) => {
  const { data } = useGetType(id);
  return data?.type === "bug" ? <MinusSquareTwoTone /> : <CheckCircleTwoTone />;
};

const AddSubTask = ({ boardType, ...reset }: { boardType: string }) => {
  const project = useContext(projectDetailContext);
  const [isEdit, setIsEdit] = useState(false);
  const inputEl = useRef<any>(null);
  const { mutate } = useAddSubTaskReq();
  const handleAddSubTask = () => {
    setIsEdit(true);
  };
  useEffect(() => {
    if (!isEdit) {
      return;
    }
    inputEl.current?.focus();
  }, [isEdit]);
  const handleInputEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value) {
      mutate({
        projectId: project?.[0]?.id,
        boardType: boardType,
      });
    }
    setIsEdit(false);
  };
  return (
    <div>
      {isEdit ? (
        <Input
          ref={inputEl}
          placeholder={"请输入项目名称"}
          onPressEnter={handleInputEnter}
        />
      ) : (
        <div onClick={handleAddSubTask}>
          <PlusOutlined />
          创建事务
        </div>
      )}
    </div>
  );
};

export const ProjectTaskWraper = styled.div`
  flex: 1;
  padding: 10px;
  background-color: #eee;
  border-radius: 3px;
  height: 100%;
  margin-right: 10px;
  min-width: 250px;
`;

const Header = styled(Row)`
  > h1 {
    font-size: 16px;
    font-weight: bold;
  }
  margin-bottom: 20px;
`;
const SubTask = styled.div`
  min-height: 50px;
  background-color: #ffffff;
  margin-bottom: 10px;
  padding: 20px;
  font-size: 16px;
`;
