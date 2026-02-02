"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { DeleteConfirmation } from "@/app/admin/components/DeleteConfirmation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function DeleteEventPage() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState<string | null>(null);

  const handleDelete = async () => {
    setApiError(null);

    try {
      const res = await fetch(`http://localhost:3333/api/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ["events"] });
        router.push("/admin/events");
      } else {
        const data = await res.json();
        setApiError(data.message || "An unexpected error occurred while deleting the event.");
      }
    } catch (error) {
      setApiError("Network error: Could not reach the server.");
      console.error("Delete failed", error);
    }
  };

  return (
    <RouteModal title="Delete Event">
      <DeleteConfirmation
        title="Are you absolutely sure?"
        description="This will permanently delete this event. This cannot be undone."
        onConfirm={handleDelete}
        onCancelAction={() => router.back()}
        error={apiError}
      />
    </RouteModal>
  );
}
