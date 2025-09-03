"use client"

import { ResponsiveModal } from "@/components/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StudioUploader from "./StudioUploader";

const StudioUploadModal = () => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const router = useRouter()

    const create = useMutation(
        trpc.videos.create.mutationOptions({
            onSuccess: () => {
                toast.success("Video Created Successfully")
                queryClient.invalidateQueries({ refetchType: "active" })
            },
            onError: () => {
                toast.error("Error creating video")
            }
        })
    )

    const onSuccess = () => {
        if (!create.data?.video.id) {
            return
        }

        create.reset()
        router.push(`/studio/videos/${create.data.video.id}`)
    }

    return (
        <>
            <ResponsiveModal
                title="Upload a video"
                open={!!create.data?.url}
                onOpenChange={() => create.reset()}
            >
                {
                    create.data?.url
                        ?
                        (
                            <StudioUploader endpoint={create.data?.url} onSuccess={onSuccess} />
                        )
                        :
                        (
                            <Loader2Icon />
                        )
                }
            </ResponsiveModal>
            <Button
                variant={"secondary"}
                onClick={() => create.mutate()}
                className="cursor-pointer"
                disabled={create.isPending}
            >
                {create.isPending ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
                Create
            </Button>
        </>
    );
}

export default StudioUploadModal;