"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { DeleteConfirmation } from "@/app/admin/components/DeleteConfirmation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function DeleteBoatSlipModal() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState<string | null>(null);

  const handleDelete = async () => {
    setApiError(null); // Reset error state on new attempt

    try {
      const res = await fetch(`http://localhost:3333/api/boat_slips/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ["boat_slips"] });
        router.push("/admin/boat_slips");
      } else {
        // Try to parse error message from server
        const data = await res.json();
        setApiError(data.message || "An unexpected error occurred while deleting the boat slip.");
      }
    } catch (error) {
      setApiError("Network error: Could not reach the server.");
      console.error("Delete failed", error);
    }
  };

  return (
    <RouteModal title="Delete Boat Slip">
      <DeleteConfirmation
        title="Are you absolutely sure?"
        description="This will permanently delete this boat slip. If this boat slips is assigned to a home the assignment will be removed. This action cannot be undone."
        onConfirm={handleDelete}
        onCancelAction={() => router.back()}
        error={apiError} // Pass the error state down
      />
    </RouteModal>
  );
}