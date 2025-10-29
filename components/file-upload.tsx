"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface Follower {
  username: string;
  profile_link: string;
}

export function FileUpload() {
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [followingsFile, setFollowingsFile] = useState<File | null>(null);
  const [unfollowers, setUnfollowers] = useState<Follower[]>([]);
  const { toast } = useToast();

  const parseFollowersFile = useCallback(
    async (file: File): Promise<Follower[]> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const result = event.target?.result;
            if (typeof result === "string") {
              const data = JSON.parse(result);
              if (Array.isArray(data)) {
                const followers: Follower[] = data
                  .map((item: any): Follower | null => {
                    const stringListData = item.string_list_data;
                    if (
                      Array.isArray(stringListData) &&
                      stringListData.length > 0
                    ) {
                      return {
                        username: stringListData[0].value || "",
                        profile_link: stringListData[0].href || "",
                      };
                    }
                    return null;
                  })
                  .filter(
                    (item: Follower | null): item is Follower => item !== null
                  );
                resolve(followers);
              } else {
                reject(new Error("Invalid followers file format"));
              }
            } else {
              reject(new Error("File reading error"));
            }
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error("Error reading file"));
        reader.readAsText(file);
      });
    },
    []
  );

  const parseFollowingsFile = useCallback(
    async (file: File): Promise<Follower[]> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const result = event.target?.result;
            if (typeof result === "string") {
              const data = JSON.parse(result);
              if (data && Array.isArray(data.relationships_following)) {
                const followings: Follower[] = data.relationships_following
                  .map((item: any): Follower | null => {
                    const stringListData = item.string_list_data;
                    if (
                      Array.isArray(stringListData) &&
                      stringListData.length > 0
                    ) {
                      return {
                        username: item.title || "",
                        profile_link: stringListData[0].href || "",
                      };
                    }
                    return null;
                  })
                  .filter(
                    (item: Follower | null): item is Follower => item !== null
                  );
                resolve(followings);
              } else {
                reject(new Error("Invalid followings file format"));
              }
            } else {
              reject(new Error("File reading error"));
            }
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error("Error reading file"));
        reader.readAsText(file);
      });
    },
    []
  );

  const handleDetectUnfollowers = async () => {
    if (!followersFile || !followingsFile) {
      toast({
        title: "Error",
        description: "Please upload both followers and followings files.",
        variant: "destructive",
      });
      return;
    }

    try {
      const followers = await parseFollowersFile(followersFile);
      const followings = await parseFollowingsFile(followingsFile);

      if (followers.length === 0 || followings.length === 0) {
        toast({
          title: "Error",
          description:
            "Could not parse files. Please ensure they are valid Instagram data files.",
          variant: "destructive",
        });
        return;
      }

      const followerUsernames = new Set(
        followers.map((f) => f.username.toLowerCase())
      );
      const unfollowers = followings.filter(
        (following) => !followerUsernames.has(following.username.toLowerCase())
      );

      localStorage.setItem("unfollowers", JSON.stringify(unfollowers));

      toast({
        title: "Success",
        description: `Found ${unfollowers.length} unfollowers. Redirecting...`,
      });

      setTimeout(() => {
        window.location.href = "/unfollowers";
      }, 1500);
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process files.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="followers">Followers File</Label>
        <Input
          id="followers"
          type="file"
          className="rounded-lg shadow-sm file:py-1.5 px-3 file:me-4 text-sm"
          // className="block w-full rounded-lg shadow-sm file:py-1.5 px-3 file:me-4 dark:text-neutral-400 dark:file:text-neutral-400"
          onChange={(e) => setFollowersFile(e.target.files?.[0] || null)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="followings">Following File</Label>
        <Input
          id="followings"
          type="file"
          className="rounded-lg shadow-sm file:py-1.5 px-3 file:me-4 text-sm"
          // className="block w-full rounded-lg shadow-sm file:py-1.5 px-3 file:me-4 dark:text-neutral-400 dark:file:text-neutral-400"
          onChange={(e) => setFollowingsFile(e.target.files?.[0] || null)}
        />
      </div>
      <Button onClick={handleDetectUnfollowers} className="w-full">
        <Upload className="w-4 h-4 mr-2 rounded-lg" />
        Detect Unfollowers
      </Button>
    </div>
  );
}
