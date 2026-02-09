"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { DeleteConfirmation } from "@/app/admin/components/DeleteConfirmation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function DeleteUserModal() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState<string | null>(null);

    console.log("DeleteUserModal");
  const handleDelete = async () => {
    setApiError(null); // Reset error state on new attempt
    console.log("handleDelete");

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
        router.push("/admin/users");
      } else {
        // Try to parse error message from server
        const data = await res.json();
        setApiError(data.message || "An unexpected error occurred while deleting the user.");
      }
    } catch (error) {
      console.log("This thing errored out");
      setApiError("Network error: Could not reach the server.");
      console.error("Delete failed", error);
    }
  };

  return (
    <RouteModal title="Delete User">
      <DeleteConfirmation
        title="Are you absolutely sure?"
        description="This will permanently remove this user account and all associated access. This action cannot be undone."
        onConfirm={handleDelete}
        onCancelAction={() => router.back()}
        error={apiError} // Pass the error state down
      />
    </RouteModal>
  );
}