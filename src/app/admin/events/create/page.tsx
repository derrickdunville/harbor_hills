"use client"

import { useRouter } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { CreateEventForm } from "@/app/admin/events/components/CreateEventForm";
import EventsPageClient from "@/app/admin/events/components/EventsPageClient";

export default function CreateEventHardPage() {
  const router = useRouter();
  const backPath = "/admin/events";

  return (
    <>
      <EventsPageClient />
      <RouteModal title="Add Event" onClosePath={backPath}>
        <CreateEventForm
          onSuccessAction={() => router.push(backPath)}
          onCancelAction={() => router.push(backPath)}
        />
      </RouteModal>
    </>
  );
}
