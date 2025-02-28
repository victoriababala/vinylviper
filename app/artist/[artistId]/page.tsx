import ArtistIdPage from "@/components/artistIdPage";
import React from "react";

interface Props {
  params: Promise<{ artistId: string }>;
}

export default async function Page({ params }: Props) {
  const { artistId } = await params;

  return <ArtistIdPage artistId={artistId} />;
}
