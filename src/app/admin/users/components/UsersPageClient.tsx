"use client"

import { useUsers } from "@/app/admin/hooks/useUsers";
import { ManagementPageLayout } from "@/app/admin/components/ManagementPageLayout";
import { Text } from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";
import { User } from "@/app/admin/types/user";

export default function UsersPageClient() {
  const userColumns = [
    {
      key: 'username',
      header: 'Username',
      sortable: true,
      render: (user: User) => (
        <Text fontWeight="bold" color="blue.700">{user.username}</Text>
      )
    },
    { key: 'email', header: 'Email', sortable: true },
    {
      key: 'createdAt',
      header: 'Joined',
      sortable: true,
      render: (user: User) => new Date(user.createdAt).toLocaleDateString()
    }
  ];

  return (
    <ManagementPageLayout
      title="User Management"
      description="View and manage system users, roles, and resident access"
      icon={<LuUser size={24} />}
      colorPalette="blue"
      createHref="/admin/users/create"
      useDataHook={useUsers}
      columns={userColumns}
      basePath="/admin/users"
    />
  );
}
