"use client"

import { useHomes } from "@/app/admin/hooks/useHomes";
import { ManagementPageLayout } from "@/app/admin/components/ManagementPageLayout";
import { LuHouse } from "react-icons/lu";
import { Home } from "@/app/admin/types/home";

export default function HomesPageClient() {
  const homesColumns = [
    { key: 'address_line_1', header: 'Address', sortable: true },
    { key: 'city', header: 'City', sortable: true },
    {
      key: 'createdAt',
      header: 'Created At',
      sortable: true,
      render: (home: Home) => new Date(home.createdAt).toLocaleDateString()
    }
  ];

  return (
    <ManagementPageLayout
      title="Homes Management"
      description="View and manage community residences and property data"
      icon={<LuHouse size={24} />}
      colorPalette="purple"
      createHref="/admin/homes/create"
      createLabel="Create Home"
      useDataHook={useHomes}
      columns={homesColumns}
      basePath="/admin/homes"
    />
  );
}
