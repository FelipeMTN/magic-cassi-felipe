"use client";

import {
  Row,
  Text,
  Avatar,
} from "@once-ui-system/core";
import { Table, TableColumn } from "../../components/Table";

export default function TableClient() {
  type UserStatus = "active" | "invited" | "suspended";

  type UserRow = {
    id: string;
    name: string;
    username: string;
    email: string;
    role: "Owner" | "Admin" | "Member";
    status: UserStatus;
    createdAt: string;
  };

  const capitalizeFirst = (value: string) => {
    const v = value.trim();
    if (!v) return v;
    return v.charAt(0).toUpperCase();
  };

  const usersData: UserRow[] = [
    { id: "u_0001", name: "lorant one", username: "lorant", email: "lorant@once-ui.com", role: "Owner", status: "active", createdAt: "2025-01-04" },
    { id: "u_0002", name: "mia chen", username: "mia", email: "mia@once-ui.com", role: "Admin", status: "active", createdAt: "2025-01-05" },
    { id: "u_0003", name: "adam wright", username: "adam", email: "adam@once-ui.com", role: "Admin", status: "active", createdAt: "2025-01-06" },
    { id: "u_0004", name: "sofia rossi", username: "sofia", email: "sofia@once-ui.com", role: "Member", status: "invited", createdAt: "2025-01-07" },
    { id: "u_0005", name: "noah patel", username: "noah", email: "noah@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-08" },
    { id: "u_0006", name: "ava martin", username: "ava", email: "ava@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-09" },
    { id: "u_0007", name: "liam kim", username: "liam", email: "liam@once-ui.com", role: "Member", status: "suspended", createdAt: "2025-01-10" },
    { id: "u_0008", name: "olivia brown", username: "olivia", email: "olivia@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-11" },
    { id: "u_0009", name: "ethan singh", username: "ethan", email: "ethan@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-12" },
    { id: "u_0010", name: "isabella garcia", username: "isabella", email: "isabella@once-ui.com", role: "Member", status: "invited", createdAt: "2025-01-13" },
    { id: "u_0011", name: "benjamin lee", username: "ben", email: "ben@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-14" },
    { id: "u_0012", name: "amelia nguyen", username: "amelia", email: "amelia@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-15" },
    { id: "u_0013", name: "lucas wilson", username: "lucas", email: "lucas@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-16" },
    { id: "u_0014", name: "harper davis", username: "harper", email: "harper@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-17" },
    { id: "u_0015", name: "jackson miller", username: "jackson", email: "jackson@once-ui.com", role: "Member", status: "suspended", createdAt: "2025-01-18" },
    { id: "u_0016", name: "ella thompson", username: "ella", email: "ella@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-19" },
    { id: "u_0017", name: "henry moore", username: "henry", email: "henry@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-20" },
    { id: "u_0018", name: "charlotte taylor", username: "charlotte", email: "charlotte@once-ui.com", role: "Member", status: "invited", createdAt: "2025-01-21" },
    { id: "u_0019", name: "daniel anderson", username: "daniel", email: "daniel@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-22" },
    { id: "u_0020", name: "victoria thomas", username: "victoria", email: "victoria@once-ui.com", role: "Member", status: "active", createdAt: "2025-01-23" },
  ];

  const userColumns: TableColumn<UserRow>[] = [
    {
      key: "user",
      title: <Text variant="label-default-s">User</Text>,
      render: (item) => (
        <Row gap="12" vertical="center">
          <Avatar size="xs" value={capitalizeFirst(item.name)} />
          <Row gap="4" vertical="center">
            <Text variant="label-default-s">{item.name}</Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">@{item.username}</Text>
          </Row>
        </Row>
      ),
    },
    {
      key: "email",
      title: <Text variant="label-default-s">Email</Text>,
      render: (item) => <Text variant="label-default-s" onBackground="neutral-weak">{item.email}</Text>,
    },
    {
      key: "role",
      title: <Text variant="label-default-s">Role</Text>,
      render: (item) => <Text variant="label-default-s">{item.role}</Text>,
    },
    {
      key: "status",
      title: <Text variant="label-default-s">Status</Text>,
      render: (item) => <Text variant="label-default-s">{item.status}</Text>,
    },
    {
      key: "createdAt",
      title: <Text variant="label-default-s">Joined</Text>,
      align: "end",
      render: (item) => <Text variant="label-default-s" onBackground="neutral-weak">{item.createdAt}</Text>,
    },
  ];

  return (
    <Table
      background="surface"
      heading={<Text variant="heading-strong-s">Users</Text>}
      data={usersData}
      columns={userColumns}
      selectable
      initialItemsPerPage={10}
      itemsPerPageOptions={[10, 25, 50]}
      getId={(i) => i.id}
      showSearch
      filterFn={(item, q: string) => [
        item.id,
        item.name,
        item.username,
        item.email,
        item.role,
        item.status,
        item.createdAt,
      ].filter(Boolean).some((v) => String(v).toLowerCase().includes(q))}
    />
  );
};