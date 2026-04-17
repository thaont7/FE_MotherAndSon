import { Table, Button } from "antd";
import { useList } from "../../hooks/useCrud";
import { userService } from "../../services/userService";

export default function UserList() {
  const { data, isLoading } = useList("users", userService.getList);

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 10 }}>
        Create
      </Button>
      <Table
        loading={isLoading}
        dataSource={data || []}
        rowKey="id"
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Title/Name", dataIndex: "name" },
          {
            title: "Action",
            render: (_, r: any) => <Button danger>Delete</Button>,
          },
        ]}
      />
    </div>
  );
}
