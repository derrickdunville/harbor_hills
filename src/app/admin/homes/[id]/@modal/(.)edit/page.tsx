"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import {EditHomeForm} from "@/app/admin/homes/components/EditHomeForm";

export default function EditHomeModal() {
  const router = useRouter();
  const { id } = useParams();

  return (
    <RouteModal title="Edit Property Details">
      <EditHomeForm
        id={id as string}
        onSuccessAction={() => router.back()}
        onCancelAction={() => router.back()}
      />
    </RouteModal>
  );
}