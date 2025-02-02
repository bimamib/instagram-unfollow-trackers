"use client";

import { useState, useEffect } from "react";
import { UnfollowersTable } from "@/components/unfollowers-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Follower {
  username: string;
  profile_link: string;
}

export default function UnfollowersPage() {
  const [unfollowers, setUnfollowers] = useState<Follower[]>([]);

  useEffect(() => {
    const storedUnfollowers = localStorage.getItem("unfollowers");
    if (storedUnfollowers) {
      setUnfollowers(JSON.parse(storedUnfollowers));
    }
  }, []);

  return (
    <main className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Instagram Unfollowers</CardTitle>
          <CardDescription>
            People who dont follow you back. Total unfollowers:{" "}
            {unfollowers.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UnfollowersTable data={unfollowers} />
        </CardContent>
      </Card>
    </main>
  );
}
