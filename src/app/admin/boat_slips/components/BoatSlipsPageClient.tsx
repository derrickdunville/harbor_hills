"use client"

import { useBoatSlips } from "@/app/admin/hooks/useBoatSlips";
import { ManagementPageLayout } from "@/app/admin/components/ManagementPageLayout";
import { Badge, Text, Stack } from "@chakra-ui/react";
import { LuAnchor } from "react-icons/lu";
import { BoatSlip } from "@/app/admin/types/boatSlip";

export default function BoatSlipsPageClient() {
  const boatSlipColumns = [
    {
      key: 'stall_number',
      header: 'Stall',
      sortable: true,
      render: (slip: BoatSlip) => (
        <Text fontWeight="bold">#{slip.stall_number}</Text>
      )
    },
    {
      key: 'home',
      header: 'Assigned To',
      sortable: true,
      render: (boatSlip: BoatSlip) => boatSlip.home ? (
        <Text fontWeight="medium" fontSize="sm">{boatSlip.home.address_line_1}</Text>
      ) : (
        <Badge variant="solid" colorPalette="teal">
          Available
        </Badge>
      )
    },
    {
      key: 'createdAt',
      header: 'Created At',
      sortable: true,
      render: (slip: BoatSlip) => new Date(slip.createdAt).toLocaleDateString()
    }
  ];

  return (
    <ManagementPageLayout
      title="Boat Slip Management"
      description="Track and assign marina stalls to community residences"
      icon={<LuAnchor size={24} />}
      colorPalette="teal"
      createHref="/admin/boat_slips/create"
      useDataHook={useBoatSlips}
      columns={boatSlipColumns}
      basePath="/admin/boat_slips"
    />
  );
}
