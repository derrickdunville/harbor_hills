"use client"
import { useRouter } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { CreateHomeForm } from "../../components/CreateHomeForm";

export default function CreateHomeModal() {
  const router = useRouter();

  return (
    <RouteModal title="Create New Home">
      <CreateHomeForm
        onSuccessAction={() => router.back()}
        onCancelAction={() => router.back()}
      />
    </RouteModal>
  );
}