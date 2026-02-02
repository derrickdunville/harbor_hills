"use client"

import { useRouter } from "next/navigation";
import { use } from "react";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { EditContentSectionForm } from "@/app/admin/content_sections/components/EditContentSectionForm";

export default function EditContentSectionHardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const backPath = `/admin/content_sections/${id}`;

  return (
    <RouteModal title="Edit Content Section" onClosePath={backPath}>
      <EditContentSectionForm
        id={id}
        onSuccessAction={() => router.push(backPath)}
        onCancelAction={() => router.push(backPath)}
      />
    </RouteModal>
  );
}
