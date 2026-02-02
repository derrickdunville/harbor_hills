"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { DeleteConfirmation } from "@/app/admin/components/DeleteConfirmation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function DeleteHomeModal() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState<string | null>(null);

  console.log("DeleteHomeModal");
  const handleDelete = async () => {
    setApiError(null); // Reset error state on new attempt
    console.log("handleDelete");

    try {
      const res = await fetch(`http://localhost:3333/api/homes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ["homes"] });
        router.push("/admin/homes");
      } else {
        // Try to parse error message from server
        const data = await res.json();
        setApiError(data.message || "An unexpected error occurred while deleting the home.");
      }
    } catch (error) {
      console.log("This thing errored out");
      setApiError("Network error: Could not reach the server.");
      console.error("Delete failed", error);
    }
  };

  return (
    <RouteModal title="Delete Home">
      <DeleteConfirmation
        title="Are you absolutely sure?"
        description="This will permanently delete this home. All residents and boat slips will be unassigned but not deleted. This action cannot be undone."
        onConfirm={handleDelete}
        onCancelAction={() => router.back()}
        error={apiError} // Pass the error state down
      />
    </RouteModal>
  );
}