"use client"

import { useRouter } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { CreateContentSectionForm } from "@/app/admin/content_sections/components/CreateContentSectionForm";

export default function CreateContentSectionModal() {
  const router = useRouter();
  return (
    <RouteModal title="Add Content Section">
      <CreateContentSectionForm
        onSuccessAction={() => router.back()}
        onCancelAction={() => router.back()}
      />
    </RouteModal>
  );
}
