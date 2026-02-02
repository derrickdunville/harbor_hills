"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { DeleteConfirmation } from "@/app/admin/components/DeleteConfirmation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function DeleteBoardSeatModal() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState<string | null>(null);

  const handleDelete = async () => {
    setApiError(null); // Reset error state on new attempt

    try {
      const res = await fetch(`http://localhost:3333/api/board_seats/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ["board_seats"] });
        router.push("/admin/board_seats");
      } else {
        const data = await res.json();
        setApiError(data.message || "An unexpected error occurred while deleting the board seat.");
      }
    } catch (error) {
      setApiError("Network error: Could not reach the server.");
      console.error("Delete failed", error);
    }
  };

  return (
    <RouteModal title="Delete Board Seat">
      <DeleteConfirmation
        title="Are you absolutely sure?"
        description="This will permanently delete this board seat. If this board seat has a member assigned to it, the member will be unassigned automatically."
        onConfirm={handleDelete}
        onCancelAction={() => router.back()}
        error={apiError} // Pass the error state down
      />
    </RouteModal>
  );
}