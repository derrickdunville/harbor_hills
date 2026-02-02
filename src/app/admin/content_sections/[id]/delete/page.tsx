"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { DeleteConfirmation } from "@/app/admin/components/DeleteConfirmation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function DeleteContentSectionPage() {
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState<string | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

  const handleDelete = async () => {
    setApiError(null);

    try {
      const res = await fetch(`${baseUrl}/api/content_sections/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ["contentSections"] });
        router.push("/admin/content_sections");
      } else {
        const data = await res.json();
        setApiError(data.message || "An unexpected error occurred while deleting the content section.");
      }
    } catch (error) {
      setApiError("Network error: Could not reach the server.");
      console.error("Delete failed", error);
    }
  };

  return (
    <RouteModal title="Delete Content Section">
      <DeleteConfirmation
        title="Are you absolutely sure?"
        description="This will permanently delete this content section. This cannot be undone."
        onConfirm={handleDelete}
        onCancelAction={() => router.back()}
        error={apiError}
      />
    </RouteModal>
  );
}
