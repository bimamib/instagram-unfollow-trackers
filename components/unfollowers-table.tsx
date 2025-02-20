"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type ButtonProps, buttonVariants } from "@/components/ui/button";

interface Follower {
  username: string;
  profile_link: string;
}

interface UnfollowersTableProps {
  data: Follower[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
}

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: {
  className?: string;
  isActive?: boolean;
  size?: Pick<ButtonProps, "size">["size"];
} & React.ComponentProps<"button">) => (
  <button
    className={cn(
      buttonVariants({
        variant: "outline",
        size,
      }),
      "h-8 w-8 p-0 border",
      className
    )}
    {...props}
  />
);

export function UnfollowersTable({
  data,
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: UnfollowersTableProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="space-y-4">
      <div className="w-full overflow-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">No.</TableHead>
              <TableHead className="min-w-[150px]">Username</TableHead>
              <TableHead className="min-w-[200px]">Instagram Profile</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell className="break-all">
                  <a
                    href={item.profile_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {item.profile_link}
                  </a>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-1">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start order-2 sm:order-1">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Rows per page
          </span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => onItemsPerPageChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px] border bg-background rounded-lg">
              <SelectValue>{itemsPerPage}</SelectValue>
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto order-1 sm:order-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap text-center sm:text-left">
            {`${startIndex + 1}-${endIndex} of ${totalItems}`}
          </span>
          <div className="flex items-center gap-1">
            <PaginationLink
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </PaginationLink>
            <PaginationLink
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>
            <PaginationLink
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
            <PaginationLink
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </PaginationLink>
          </div>
        </div>
      </div>
    </div>
  );
}
