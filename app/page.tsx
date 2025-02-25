"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/file-upload";

interface InstagramDataItem {
  string_list_data: Array<{
    value: string;
    href: string;
  }>;
}

interface InstagramData {
  relationships_following?: InstagramDataItem[];
}

interface Follower {
  username: string;
  profile_link: string;
}

export default function Home() {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followings, setFollowings] = useState<Follower[]>([]);
  const [unfollowersCount, setUnfollowersCount] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "followers" | "followings"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data: InstagramData | InstagramDataItem[] = JSON.parse(content);

          let extractedData: Follower[] = [];

          if (type === "followers" && Array.isArray(data)) {
            extractedData = data.map((item: InstagramDataItem) => ({
              username: item.string_list_data[0].value,
              profile_link: item.string_list_data[0].href,
            }));
          } else if (
            type === "followings" &&
            typeof data === "object" &&
            data !== null &&
            Array.isArray((data as InstagramData).relationships_following)
          ) {
            extractedData = (
              data as InstagramData
            ).relationships_following!.map((item: InstagramDataItem) => ({
              username: item.string_list_data[0].value,
              profile_link: item.string_list_data[0].href,
            }));
          } else {
            throw new Error("Invalid data format");
          }

          if (type === "followers") {
            setFollowers(extractedData);
          } else {
            setFollowings(extractedData);
          }
          toast({
            title: "File uploaded successfully",
            description: `${type} data has been loaded.`,
            className: "rounded-lg",
          });
        } catch (error) {
          console.error("Error parsing JSON:", error);
          toast({
            title: "Error",
            description:
              "Failed to parse the JSON file. Please ensure it's in the correct format.",
            variant: "destructive",
            className: "rounded-lg",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadAndProcess = () => {
    if (followers.length === 0 || followings.length === 0) {
      toast({
        title: "Error",
        description:
          "Please upload both followers and followings data before processing.",
        variant: "destructive",
      });
      return;
    }

    const unfollowersList = followings.filter(
      (following) =>
        !followers.some((follower) => follower.username === following.username)
    );
    localStorage.setItem("unfollowers", JSON.stringify(unfollowersList));
    setUnfollowersCount(unfollowersList.length);

    toast({
      title: "Processing complete",
      description: `Found ${unfollowersList.length} unfollowers. Redirecting to results page...`,
    });

    setTimeout(() => {
      window.location.href = "/unfollowers";
    }, 2000);
  };

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
            <div className="space-y-4">
              <FileUpload
                id="followers"
                label="Followers JSON"
                onChange={(e) => handleFileUpload(e, "followers")}
              />
              <FileUpload
                id="followings"
                label="Followings JSON"
                onChange={(e) => handleFileUpload(e, "followings")}
              />
            </div>
            <Button
              className="w-full text-sm sm:text-base"
              onClick={handleUploadAndProcess}
            >
              Upload and Process
            </Button>
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
