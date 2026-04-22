import { type ReactNode } from "react";
import { Navigate } from "react-router";

type Props = {
    children?: ReactNode;
};

export default function LandingPage({ children }: Props) {
    /* No landing page yet */
    return <Navigate to="/login" />;
    return (
        <div>
            <div>This is the landing page</div>
            <div>{children}</div>
        </div>
    );
}
