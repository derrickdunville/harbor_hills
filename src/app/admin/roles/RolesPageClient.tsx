"use client"

import { useRoles } from "@/app/admin/hooks/useRoles";
import { ManagementPageLayout } from "@/app/admin/components/ManagementPageLayout";
import { Badge, Text, HStack } from "@chakra-ui/react";
import { LuShieldCheck } from "react-icons/lu";
import { Role } from "@/app/admin/types/role";

export default function RolesPageClient() {
  const roleColumns = [
    {
      key: 'name',
      header: 'Role Name',
      sortable: true,
      render: (role: Role) => (
        <Text fontWeight="bold" textTransform="capitalize" color="pink.700">
          {role.name}
        </Text>
      )
    },
    {
      key: 'scopes',
      header: 'Permissions / Scopes',
      sortable: false,
      render: (role: Role) => {
        const scopes = role.scopes
          ? role.scopes.map((scope) => scope.trim()).filter(Boolean)
          : [];
        if (scopes.length === 0) {
          return (
            <Text color="fg.subtle" fontStyle="italic" fontSize="xs">
              No scopes assigned
            </Text>
          );
        }
        return (
          <HStack gap="1" flexWrap="wrap">
            {scopes.map((scope: string) => (
              <Badge key={scope} variant="subtle" size="sm" colorPalette="pink">
                {scope}
              </Badge>
            ))}
          </HStack>
        );
      }
    },
    {
      key: 'createdAt',
      header: 'Created At',
      sortable: true,
      render: (role: Role) => new Date(role.createdAt).toLocaleDateString()
    }
  ];

  return (
    <ManagementPageLayout
      title="Role Management"
      description="Define system permissions and access levels for users"
      icon={<LuShieldCheck size={24} />}
      colorPalette="pink"
      useDataHook={useRoles}
      columns={roleColumns}
      basePath="/admin/roles"
      // Note: We leave createHref undefined if role creation is handled elsewhere
    />
  );
}
