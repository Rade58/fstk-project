import Link from "next/link";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ThatCardProps = {
  title: string;
  author: string;
  date: string;
  summary: string;
  href: string;
};

export function ThatCard({
  author,
  date,
  href,
  summary,
  title,
}: ThatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="py-0">
        <CardDescription>{summary}</CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <Link
          className="text-cyan-600 hover:underline text-sm font-medium w-fit"
          href={href}
          rel="oreferrer noreferrer"
          target="_blank"
        >
          Read article &arr;
        </Link>
      </CardFooter>
    </Card>
  );
}
