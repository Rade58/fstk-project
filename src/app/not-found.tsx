import { Home, Squirrel, ShieldX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="border-0 min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8">
          <div className="relative mb-6">
            <Squirrel className="h-20 w-20 mx-auto text-muted-foreground" />
            <ShieldX className="h-8 w-8 absolute -top-1 -right-1 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted. Or maybe our squirrel got lost again.
          </p>
          <Link href="/">
            <Button variant="default" size={"lg"} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Go to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
      {/* Not Found */}
    </div>
  );
}
