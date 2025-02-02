import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InstructionsCardProps {
  onDownload: () => void;
}

export function InstructionsCard({ onDownload }: InstructionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How to Request Your Instagram Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full bg-black hover:bg-gray-800"
          onClick={onDownload}
        >
          Download Instructions PDF
        </Button>
      </CardContent>
    </Card>
  );
}
