"use client";

import { BoardSeat, useBoardSeats } from "@/app/admin/hooks/useBoardSeats";
import { ManagementPageLayout } from "@/app/admin/components/ManagementPageLayout";
import { Badge, Text } from "@chakra-ui/react";
import { LuRockingChair } from "react-icons/lu";

export default function BoardManagementClient() {
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString();
  };

  const boardSeatColumns = [
    {
      key: 'title',
      header: 'Position',
      sortable: true,
      render: (boardSeat: BoardSeat) => (
        <Text fontWeight="bold">{boardSeat.title}</Text>
      )
    },
    {
      key: 'user_id',
      header: 'Member',
      sortable: true,
      render: (boardSeat: BoardSeat) => (
        <Text fontWeight="medium" color={boardSeat.user ? "fg.default" : "orange.600"}>
          {boardSeat?.user?.username || "Unassigned"}
        </Text>
      )
    },
    {
      key: 'term_start',
      header: 'Term Start',
      sortable: true,
      render: (boardSeat: BoardSeat) => (
        <Text color="fg.muted">{formatDate(boardSeat.term_start)}</Text>
      )
    },
    {
      key: 'term_end',
      header: 'Term End',
      sortable: true,
      render: (boardSeat: BoardSeat) => (
        <Text color="fg.muted">{formatDate(boardSeat.term_end)}</Text>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: false,
      render: (boardSeat: BoardSeat) => (
        <Badge variant="subtle" colorPalette={boardSeat.user ? "green" : "orange"}>
          {boardSeat.user ? "Occupied" : "Vacant"}
        </Badge>
      )
    }
  ];

  return (
    <ManagementPageLayout
      title="Board Management"
      description="Manage official board positions, assignments, and term limits"
      icon={<LuRockingChair size={24} />}
      colorPalette="orange"
      createHref="/admin/board_seats/create"
      createLabel="Create Board Seat"
      useDataHook={useBoardSeats}
      columns={boardSeatColumns}
      basePath="/admin/board_seats"
      defaultSortKey="display_order"
      defaultSortOrder="ASC"
    />
  );
}
