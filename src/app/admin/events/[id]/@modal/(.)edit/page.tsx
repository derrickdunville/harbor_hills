"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { EditEventForm } from "@/app/admin/events/components/EditEventForm";

export default function EditEventModal() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  return (
    <RouteModal title="Edit Event">
      <EditEventForm
        id={id}
        onSuccessAction={() => router.back()}
        onCancelAction={() => router.back()}
      />
    </RouteModal>
  );
}
