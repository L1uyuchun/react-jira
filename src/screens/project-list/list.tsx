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
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>负责人</th>
          </tr>
        </thead>
        <tbody>
          {list.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>
                {
                  userList.filter((user) => user.id === project.personId)[0]
                    ?.name
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
