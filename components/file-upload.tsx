import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUpload({ id, label, onChange }: FileUploadProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm sm:text-base">
        {label}
      </Label>
      <Input
        id={id}
        type="file"
        accept=".json"
        onChange={onChange}
        className="text-sm sm:text-base"
      />
    </div>
  );
}
