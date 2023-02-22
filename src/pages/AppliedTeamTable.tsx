import { useGetAdminTeamsQuery } from "@/features/team/api";
import { Table } from "antd";

interface AppliedTeamTableProps {
  memberCount: 2 | 3;
  gender: "male" | "female";
}

export default function AppliedTeamTable({
  memberCount,
  gender,
}: AppliedTeamTableProps) {
  const { data } = useGetAdminTeamsQuery({
    membercount: memberCount,
    gender,
    status: `APPLIED`,
  });

  return (
    <Table
      dataSource={data?.teams}
      columns={[
        {
          title: `시간`,
          dataIndex: `appliedAt`,
        },
      ]}
    />
  );
}
