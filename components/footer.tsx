"use client";

import { useState, useEffect } from "react";

export function Footer() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-6 flex flex-col items-center text-center">
        <div className="text-sm text-muted-foreground mb-2">&copy; Bimss</div>
        <div className="text-sm text-muted-foreground">
          {currentTime ? formatDate(currentTime) : ""}
        </div>
      </div>
    </footer>
  );
}
