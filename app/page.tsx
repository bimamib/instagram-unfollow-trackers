"use client";

import { UploadFilesCard } from "@/components/upload-files-card";
import { InstructionsCard } from "@/components/instructions-card";
import { Toaster } from "@/components/ui/toaster";

interface Follower {
  username: string;
  profile_link: string;
}

export default function Home() {
  const handleProcessComplete = (unfollowers: Follower[]) => {
    localStorage.setItem("unfollowers", JSON.stringify(unfollowers));
    window.location.href = "/unfollowers";
  };

  const handleDownloadInstructions = () => {
    // Replace with your actual PDF URL
    const pdfUrl = "/instructions.pdf";
    window.open(pdfUrl, "_blank");
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        Instagram Unfollowers Tracker
      </h1>
      <UploadFilesCard onProcessComplete={handleProcessComplete} />
      <InstructionsCard onDownload={handleDownloadInstructions} />
      <Toaster />
    </main>
  );
}
