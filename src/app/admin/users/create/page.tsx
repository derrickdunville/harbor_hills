"use client";
import UsersPageClient from "@/app/admin/users/components/UsersPageClient";
import {useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {CreateUserForm} from "@/app/admin/users/components/CreateUserForm";

export default function CreateUserHardPage() {
  const router = useRouter();

  const backPath = `/admin/users`;
  return (
    <>
      <UsersPageClient/>
      <RouteModal title="Create New User"
                  onClosePath={backPath}>
        <CreateUserForm
          onSuccessAction={() => router.push(backPath)}
          onCancelAction={() => router.push(backPath)}/>
      </RouteModal>
    </>
  );
}