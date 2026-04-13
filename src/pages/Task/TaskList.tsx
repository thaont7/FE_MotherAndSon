import { Table, Button } from "antd";
import { useList, useCrud } from "../../hooks/useCrud";
import { taskService } from "../../services/taskService";

export default function TaskList() {
  const { data, isLoading } = useList("tasks", taskService.getList);
  const crud = useCrud("tasks", taskService);

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
            render: (_, r:any) => (
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
