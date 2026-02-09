"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

export default function HomeClient() {
  const handleDownloadInstructions = () => {
    const pdfUrl = "/instructions.pdf";
    window.open(pdfUrl, "_blank");
  };

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-foreground">
          Instagram Unfollowers Tracker
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground text-center">
          Upload your Instagram followers & following JSON files to find
          accounts that don’t follow you back. Processing runs locally in your
          browser.
        </p>

        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Upload Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FileUpload />
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">
              How to Request Your Instagram Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full text-sm sm:text-base rounded-lg"
              onClick={handleDownloadInstructions}
            >
              Download Instructions PDF
            </Button>

            <div className="text-xs text-muted-foreground space-y-2">
              <p>Steps:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Request your Instagram data download.</li>
                <li>Find followers and following JSON files.</li>
                <li>Upload both files to detect unfollowers.</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
