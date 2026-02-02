"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { EditUserForm } from "../../../components/EditUserForm";

export default function EditUserModal() {
  const router = useRouter();
  const { id } = useParams();

  // Ensuring the modal is wrapped in a way that the router can reconcile
  return (
    <RouteModal title="Edit User Profile">
      <EditUserForm
        id={id as string}
        onSuccessAction={() => router.back()}
        onCancelAction={() => router.back()}
      />
    </RouteModal>
  );
}