import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface InstructionsCardProps {
  onDownload: () => void;
}

export function InstructionsCard({ onDownload }: InstructionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          How to Request Your Instagram Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full bg-black hover:bg-gray-800 text-sm sm:text-base py-2 sm:py-3 rounded-lg"
          onClick={onDownload}
        >
          <FileDown className="mr-2 h-4 w-4" />
          Download Instructions PDF
        </Button>
      </CardContent>
    </Card>
  );
}
