import { Table, Button } from "antd";
import { useList, useCrud } from "../../hooks/useCrud";
import { projectService } from "../../services/projectService";

export default function ProjectList() {
  const { data, isLoading } = useList("projects", projectService.getList);
  const crud = useCrud("projects", projectService);

  return (
    <div>
      <Button type="primary" style={{ marginBottom: 10 }}>
        Create User
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
