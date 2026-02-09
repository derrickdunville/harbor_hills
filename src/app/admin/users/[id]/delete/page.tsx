"use client"

import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { DeleteConfirmation } from "@/app/admin/components/DeleteConfirmation";
import { useQueryClient } from "@tanstack/react-query";

export default function UserDeleteHardPage({
                                             params
                                           }: {
  params: Promise<{ id: string }>
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Unwrap the params promise (Next.js 15)
  const { id } = use(params);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Clear the list and the specific user from the cache
        await queryClient.invalidateQueries({ queryKey: ["users"] });
        await queryClient.removeQueries({ queryKey: ["user", id] });

        // Redirect to the main list since the detail page no longer exists
        router.push("/admin/users");
      }
    } catch (error) {
      console.error("Delete request failed:", error);
    }
  };

  return (
    <RouteModal
      title="Delete User"
      // If they close the modal via the backdrop/X,
      // they go back to the specific user's detail page
      onClosePath={`/admin/users/${id}`}
    >
      <DeleteConfirmation
        title="Confirm User Deletion"
        description="Are you sure you want to delete this user? This will revoke all access immediately. This action is permanent."
        onConfirm={handleDelete}
        onCancelAction={() => router.push(`/admin/users/${id}`)}
      />
    </RouteModal>
  );
}