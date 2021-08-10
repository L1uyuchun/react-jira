export const ListTable = ({ list, userList }) => {
  console.log(list, userList);
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
