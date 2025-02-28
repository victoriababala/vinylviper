import AlbumIdPage from "@/components/albumIdPage";
import React from "react";

interface Props {
  params: Promise<{ albumId: string }>;
}

export default async function Page({ params }: Props) {
  const { albumId } = await params;

  return <AlbumIdPage albumId={albumId} />;
}
