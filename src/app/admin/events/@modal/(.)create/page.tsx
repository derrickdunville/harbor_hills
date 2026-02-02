"use client"

import { useRouter } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { CreateEventForm } from "../../components/CreateEventForm";

export default function CreateEventModal() {
  const router = useRouter();
  return (
    <RouteModal title="Add Event">
      <CreateEventForm
        onSuccessAction={() => router.back()}
        onCancelAction={() => router.back()}
      />
    </RouteModal>
  );
}
