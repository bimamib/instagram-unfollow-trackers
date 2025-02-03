"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface InstagramDataItem {
  string_list_data: Array<{
    value: string;
    href: string;
  }>;
}

interface InstagramData {
  relationships_following: InstagramDataItem[];
}

interface Follower {
  username: string;
  profile_link: string;
}

export default function Home() {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followings, setFollowings] = useState<Follower[]>([]);
  const [unfollowersCount, setUnfollowersCount] = useState(0);

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
          const data = JSON.parse(content);

          let extractedData: Follower[] = [];

          if (type === "followers" && Array.isArray(data)) {
            extractedData = data.map((item) => ({
              username: item.string_list_data[0].value,
              profile_link: item.string_list_data[0].href,
            }));
          } else if (
            type === "followings" &&
            typeof data === "object" &&
            data !== null &&
            "relationships_following" in data
          ) {
            const typedData = data as InstagramData;
            extractedData = typedData.relationships_following.map(
              (item: InstagramDataItem) => ({
                username: item.string_list_data[0].value,
                profile_link: item.string_list_data[0].href,
              })
            );
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
          });
        } catch (error) {
          console.error("Error parsing JSON:", error);
          toast({
            title: "Error",
            description:
              "Failed to parse the JSON file. Please ensure it's in the correct format.",
            variant: "destructive",
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

    window.location.href = "/unfollowers";
  };

  const handleDownloadInstructions = () => {
    const pdfUrl = "/instructions.pdf";
    window.open(pdfUrl, "_blank");
  };

  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-foreground">
          Instagram Unfollowers Tracker
        </h1>

        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="followers">Followers JSON</Label>
                <Input
                  id="followers"
                  type="file"
                  accept=".json"
                  onChange={(e) => handleFileUpload(e, "followers")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="followings">Followings JSON</Label>
                <Input
                  id="followings"
                  type="file"
                  accept=".json"
                  onChange={(e) => handleFileUpload(e, "followings")}
                />
              </div>
            </div>
            <Button className="w-full" onClick={handleUploadAndProcess}>
              Upload and Process
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>How to Request Your Instagram Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={handleDownloadInstructions}>
              Download Instructions PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
