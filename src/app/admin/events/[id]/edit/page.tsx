"use client"

import { useRouter } from "next/navigation";
import { use } from "react";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { EditEventForm } from "@/app/admin/events/components/EditEventForm";

export default function EditEventHardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const backPath = `/admin/events/${id}`;

  return (
    <RouteModal title="Edit Event" onClosePath={backPath}>
      <EditEventForm
        id={id}
        onSuccessAction={() => router.push(backPath)}
        onCancelAction={() => router.push(backPath)}
      />
    </RouteModal>
  );
}
