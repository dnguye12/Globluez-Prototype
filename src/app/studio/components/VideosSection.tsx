"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { format } from "date-fns";
import { InfiniteScroll } from "@/components/InfiniteScroll";
import VideoThumbnail from "../videos/[videoId]/components/VideoThumbnail";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { GlobeIcon, LockIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const VideoSectionsSkeleton = () => {
    return (
        <>
            <div className="border-y">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-6 w-[510px]">Video</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="">Views</TableHead>
                            <TableHead className="">Comments</TableHead>
                            <TableHead className="">Likes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell className="pl-6">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-20 w-36" />
                                        <div className="flex flex-col gap-2">
                                            <Skeleton className="h-4 w-48" />
                                            <Skeleton className="h-3 w-64" />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <GlobeIcon className="size-4 mr-2" />
                                        Public
                                    </div>
                                </TableCell>
                                <TableCell>Ready</TableCell>
                                <TableCell>
                                    <Skeleton className="h-3 w-16" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-3 w-10" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-3 w-16" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-3 w-10" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

const VideoSectionSuspense = () => {
    const trpc = useTRPC()

    const { data: videos, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(trpc.studio.getMany.infiniteQueryOptions(
        { limit: DEFAULT_LIMIT },
        {
            getNextPageParam(lastPage) {
                return lastPage.nextCursor
            }
        }
    ))

    return (
        <div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="pl-6 w-[510px]">Video</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="">Views</TableHead>
                            <TableHead className="">Comments</TableHead>
                            <TableHead className="">Likes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {videos.pages.flatMap((page) => page.items).map((video) => (
                            <TableRow key={video.id} className="cursor-pointer">
                                <TableCell>
                                    <Link href={`/studio/videos/${video.id}`} className="block">
                                        <div className="flex items-center gap-4">
                                            <div className="relative aspect-video w-36 shrink-0">
                                                <VideoThumbnail
                                                    imageUrl={video.thumbnailUrl}
                                                    title={video.title}
                                                    previewUrl={video.previewUrl}
                                                    duration={video.duration || 0}
                                                />
                                            </div>
                                            <div className="flex flex-col overflow-hidden gap-y-1">
                                                <span className="text-sm text-muted-foreground line-clamp-1">
                                                    {video.title}
                                                </span>
                                                <span className="text-xs line-clamp-1">
                                                    {video.description || "No description"}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        {video.visibility === "private" ? (
                                            <LockIcon className="size-4 mr-2" />
                                        ) : (
                                            <GlobeIcon className="size-4 mr-2" />
                                        )}
                                        {snakeCaseToTitleCase(video.visibility)}
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm truncate">
                                    <div className="flex items-center">
                                        {snakeCaseToTitleCase(video.muxStatus || "error")}
                                    </div>
                                </TableCell>
                                <TableCell>{format(video.createdAt, "d MMM yyyy")}</TableCell>
                                <TableCell>Views</TableCell>
                                <TableCell>Comments</TableCell>
                                <TableCell>Likes</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <InfiniteScroll
                isManual
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
            />
        </div>
    )
}

const VideoSections = () => {
    return (
        <Suspense fallback={<VideoSectionsSkeleton />}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <VideoSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    );
}

export default VideoSections;