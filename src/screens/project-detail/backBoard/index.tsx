import { useLocation, useParams } from "react-router-dom";
import {
  useCreateBoard,
  useDetailSearchParams,
  useProjectInfo,
  useQueryProjectProcess,
} from "@/screens/project-detail/detail-custom-hooks";
import { Button, Form, Input, Select, Spin } from "antd";
import { SelectBiz } from "@/components/select-biz";
import { useRequstUsers } from "@/screens/project-list/project-list-hooks";
import { useDebounce } from "@/utils/custom-hooks";
import { cleanObject } from "@/utils";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ProjectTaskDetail, Tasks } from "@/screens/project-detail/type";
import {
  ProjectTask,
  ProjectTaskWraper,
} from "@/screens/project-detail/backBoard/projectKanban";
import { Row } from "@/components/Row";
import styled from "@emotion/styled";
import { useUrlQueryParams } from "@/utils/use-url-params";
import { FullPageWraper } from "@/components/Loading";
import { projectDetailContext } from "@/screens/project-detail";
import { DragDropContext } from "react-beautiful-dnd";
import { Drop, DropChild } from "@/utils/drag";
const { Option } = Select;

export const BackBoard = () => {
  const project = useContext(projectDetailContext);
  const [form] = Form.useForm();
  const { userList: processorList, isLoading: reqUsrLoading } =
    useRequstUsers(true);
  const { searchParam, resetSearchPrams } = useDetailSearchParams();
  useEffect(() => {
    form.setFieldsValue(searchParam);
  }, []);

  const { data: projectDetailList, isLoading: proProcessLoading } =
    useQueryProjectProcess(searchParam, project?.[0]?.id);
  const onValuesChange = (changedValues: any, allValues: any) => {
    resetSearchPrams(cleanObject(allValues));

    // console.log(debounceParams);
  };
  const onReset = () => {
    form.resetFields();
    resetSearchPrams({
      labelName: "",
      processorId: undefined,
      taskGroup: "",
      taskName: "",
    });
  };
  const onDragEnd = () => {};
  if (reqUsrLoading || proProcessLoading) {
    return (
      <FullPageWraper>
        <Spin size="large" />
      </FullPageWraper>
    );
  }
  // @ts-ignore
  return (
    <KanbanWraper>
      <h5 style={{ fontSize: "24px", fontWeight: "bold", margin: "20px 0" }}>
        {project?.[0]?.name}看板
      </h5>
      <Form
        form={form}
        name="control-hooks"
        onValuesChange={onValuesChange}
        layout={"inline"}
      >
        <Form.Item name="taskName">
          <Input placeholder={"任务名"} />
        </Form.Item>
        <Form.Item name="taskGroup">
          <Select allowClear style={{ width: "200px" }}>
            <Option value="">任务组</Option>
            <Option value="外卖组">外卖组</Option>
            <Option value="团购组">团购组</Option>
            <Option value="物料组">物料组</Option>
            <Option value="总部组">总部组</Option>
            <Option value="送餐组">送餐组</Option>
          </Select>
        </Form.Item>
        <Form.Item name="processorId">
          <SelectBiz
            style={{ width: "200px" }}
            allowClear
            options={processorList || []}
            optionProps={{
              valueKey: "id",
              textKey: "name",
              key: "id",
            }}
            defaultOptionText={"经办人"}
          />
        </Form.Item>
        <Form.Item name="labelName">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      <BoardWraper justifyContent={"space-between"}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Drop droppableId="board" type="COLUMN" direction="horizontal">
            <DropChild>
              {(projectDetailList?.board || []).map(
                (item: ProjectTaskDetail, index: number) => (
                  <ProjectTask
                    key={item.status}
                    projectProcessPart={item}
                    index={index}
                  />
                )
              )}
            </DropChild>
          </Drop>
        </DragDropContext>
        <CreateBoard />
      </BoardWraper>
    </KanbanWraper>
  );
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

const KanbanWraper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  width: 0;
`;
const BoardWraper = styled(Row)`
  flex: 1;
  margin-top: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
`;
