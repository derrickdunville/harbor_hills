"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { EditContentSectionForm } from "@/app/admin/content_sections/components/EditContentSectionForm";

export default function EditContentSectionModal() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  return (
    <RouteModal title="Edit Content Section">
      <EditContentSectionForm
        id={id}
        onSuccessAction={() => router.back()}
        onCancelAction={() => router.back()}
      />
    </RouteModal>
  );
}
