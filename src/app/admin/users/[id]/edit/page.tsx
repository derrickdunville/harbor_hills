"use client"

import { useRouter, useParams } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import {EditUserForm} from "@/app/admin/users/components/EditUserForm";

export default function EditUserModal() {
  const router = useRouter();
  const { id } = useParams();

  const backPath = `/admin/users/${id}`;
  return (
    <RouteModal title="Edit User Profile" onClosePath={backPath}>
      <EditUserForm
        id={id as string}
        onSuccessAction={() => router.push(backPath)}
        onCancelAction={() => router.push(backPath)}
      />
    </RouteModal>
  );
}