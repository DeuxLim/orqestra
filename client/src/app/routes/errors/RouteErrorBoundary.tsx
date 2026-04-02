import {
    isRouteErrorResponse,
    Link,
    useRouteError,
    useNavigate,
} from "react-router";
import { Button } from "@/components/ui/button";

export default function RouteErrorBoundary() {
    const navigate = useNavigate();
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <main className="flex min-h-svh items-center justify-center p-6">
                <div className="w-full max-w-md space-y-4 text-center">
                    <h1 className="text-2xl font-semibold">
                        {error.status} {error.statusText}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {typeof error.data === "string"
                            ? error.data
                            : "Something went wrong while loading this page."}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <Button type="button" onClick={() => navigate(-1)}>
                            Go back
                        </Button>
                        <Button asChild variant="outline">
                            <Link to="/">Go home</Link>
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-svh items-center justify-center p-6">
            <div className="w-full max-w-md space-y-4 text-center">
                <h1 className="text-2xl font-semibold">Unexpected Error</h1>
                <p className="text-sm text-muted-foreground">
                    We hit an unexpected error while rendering this route.
                </p>
                <Button asChild variant="outline">
                    <Link to="/">Go home</Link>
                </Button>
            </div>
        </main>
    );
}
