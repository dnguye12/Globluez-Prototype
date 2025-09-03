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
                                    <Link href={``} className="block">
                                        <div className="flex items-center gap-4">
                                            <div className="relative aspect-video w-36 shrink-0">
                                                thumbnail
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
                                    Visibility
                                </TableCell>
                                <TableCell className="text-sm truncate">
                                    status
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
        <Suspense fallback={<div>...Loading</div>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <VideoSectionSuspense />
            </ErrorBoundary>
        </Suspense>
    );
}

export default VideoSections;