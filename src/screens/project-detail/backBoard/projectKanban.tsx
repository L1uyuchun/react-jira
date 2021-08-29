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
  useGetType,
} from "@/screens/project-detail/detail-custom-hooks";
import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  LegacyRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { projectDetailContext } from "@/screens/project-detail";

export const ProjectTask = ({
  projectProcessPart,
  ...rest
}: {
  projectProcessPart?: ProjectTaskDetail;
}) => {
  if (projectProcessPart) {
    return (
      <ProjectTaskWraper>
        <Header justifyContent={"space-between"}>
          <h1>{projectProcessPart?.["status"]}</h1>
          <EllipsisOutlined />
        </Header>
        {(projectProcessPart?.subTasks || []).map((item) => (
          <SubTask key={item.name}>
            <div style={{ marginBottom: "10px" }}>{item.name}</div>
            <SubTaskType id={item.id} />
          </SubTask>
        ))}
        <AddSubTask boardType={projectProcessPart?.["status"]} />
      </ProjectTaskWraper>
    );
  } else {
    return <CreateBoard />;
  }
};

const SubTaskType = ({ id }: { id: number }) => {
  const { data } = useGetType(id);
  return data?.type === "bug" ? <MinusSquareTwoTone /> : <CheckCircleTwoTone />;
};

const CreateBoard = () => {
  const [inutValue, setInutValue] = useState("");
  const project = useContext(projectDetailContext);
  const { mutate } = useCreateBoard(project?.[0]?.id);
  const onPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    mutate({
      projectId: project?.[0]?.id,
      status: (event.target as HTMLInputElement).value,
    });
    setInutValue("");
  };
  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInutValue(evt.target.value);
  };

  return (
    <ProjectTaskWraper>
      <Input
        placeholder={"新建看板名称"}
        value={inutValue}
        onPressEnter={onPressEnter}
        onChange={onChange}
      />
    </ProjectTaskWraper>
  );
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

const ProjectTaskWraper = styled.div`
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
