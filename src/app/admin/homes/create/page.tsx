"use client"
import HomesPageClient from "../components/HomesPageClient";
import {useRouter} from "next/navigation";
import {RouteModal} from "@/app/admin/components/RouteModal";
import {CreateHomeForm} from "../components/CreateHomeForm";

export default function CreateHomeHardPage() {
  const router = useRouter();
  const backPath = `/admin/homes`;

  return (
    <>
      <HomesPageClient/>
      <RouteModal title="Create New Home"
                  onClosePath={backPath}>
        <CreateHomeForm
          onSuccessAction={() => router.push(backPath)}
          onCancelAction={() => router.push(backPath)}
        />
      </RouteModal>
    </>
  );
}