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
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
            Instagram Unfollowers
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
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
