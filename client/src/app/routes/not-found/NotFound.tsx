import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex min-h-svh items-center justify-center p-6">
            <div className="w-full max-w-md space-y-4 text-center">
                <h1 className="text-3xl font-semibold">404</h1>
                <p className="text-sm text-muted-foreground">
                    The page you requested does not exist.
                </p>
                <Button asChild variant="outline">
                    <Link to="/">Go home</Link>
                </Button>
            </div>
        </main>
    );
}
