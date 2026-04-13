import { Table, Button } from "antd";
import { useList, useCrud } from "../../hooks/useCrud";
import { userService } from "../../services/userService";

export default function UserList() {
  const { data, isLoading } = useList("users", userService.getList);
  const crud = useCrud("users", userService);

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
            render: (_, r: any) => (
              <Button danger onClick={() => crud.delete.mutate(r.id)}>
                Delete
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
