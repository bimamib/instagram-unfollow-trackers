"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/file-upload";

export default function Home() {
  const { toast } = useToast();

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
          <CardContent>
            <Button
              className="w-full text-sm sm:text-base"
              onClick={handleDownloadInstructions}
            >
              Download Instructions PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
