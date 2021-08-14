import { User } from "./list";
interface SearchPanelProps {
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
  userList: User[];
}
export const SearchPanel = ({
  params,
  setParams,
  userList,
}: SearchPanelProps) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={params.name}
          onChange={(e) => {
            setParams({
              ...params,
              name: e.target.value,
            });
          }}
        />
        <select
          value={params.personId}
          onChange={(e) => {
            setParams({
              ...params,
              personId: e.target.value,
            });
          }}
        >
          <option value={0}>负责人</option>
          {userList.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
