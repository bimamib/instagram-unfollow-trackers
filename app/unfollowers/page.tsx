"use client";

import { useState, useEffect, useMemo } from "react";
import { UnfollowersTable } from "@/components/unfollowers-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Follower {
  username: string;
  profile_link: string;
}

export default function UnfollowersPage() {
  const [unfollowers, setUnfollowers] = useState<Follower[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const storedUnfollowers = localStorage.getItem("unfollowers");
    if (storedUnfollowers) {
      setUnfollowers(JSON.parse(storedUnfollowers));
    }
  }, []);

  const filteredUnfollowers = useMemo(() => {
    return unfollowers.filter((unfollower) =>
      unfollower.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [unfollowers, searchTerm]);

  const totalPages = Math.ceil(filteredUnfollowers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredUnfollowers.slice(startIndex, endIndex);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="h-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex flex-col items-start sm:items-end">
            <h1 className="text-2xl font-bold">Instagram Unfollowers</h1>
            <p className="text-sm text-muted-foreground">
              Total unfollowers: {unfollowers.length}
            </p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <Input
                placeholder="Search username"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <UnfollowersTable
              data={currentData}
              totalItems={filteredUnfollowers.length}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
