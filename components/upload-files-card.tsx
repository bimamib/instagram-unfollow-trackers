"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Follower {
  username: string;
  profile_link: string;
}

interface InstagramDataItem {
  string_list_data: Array<{
    value: string;
    href: string;
  }>;
}

interface UploadFilesCardProps {
  onProcessComplete: (unfollowers: Follower[]) => void;
}

export function UploadFilesCard({ onProcessComplete }: UploadFilesCardProps) {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [followings, setFollowings] = useState<Follower[]>([]);

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
            extractedData = data.map((item: InstagramDataItem) => ({
              username: item.string_list_data[0].value,
              profile_link: item.string_list_data[0].href,
            }));
          } else if (
            type === "followings" &&
            typeof data === "object" &&
            data !== null &&
            Array.isArray(data.relationships_following)
          ) {
            extractedData = data.relationships_following.map(
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
            title: "Success",
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
    onProcessComplete(unfollowersList);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Upload Files</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
        <Button
          className="w-full bg-black hover:bg-gray-800"
          onClick={handleUploadAndProcess}
        >
          Upload and Process
        </Button>
      </CardContent>
    </Card>
  );
}
