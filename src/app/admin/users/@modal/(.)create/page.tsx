"use client"
import { useRouter } from "next/navigation";
import { RouteModal } from "@/app/admin/components/RouteModal";
import { CreateUserForm } from "../../components/CreateUserForm";

export default function CreateUserModal() {
  const router = useRouter();

  return (
    <RouteModal title="Create New User">
      <CreateUserForm
        onSuccessAction={() => router.back()}
        onCancelAction={() => router.back()}
      />
    </RouteModal>
  );
}