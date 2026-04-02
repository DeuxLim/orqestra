import { type ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default function LandingPage({ children }: Props) {
    return (
        <div>
            <div>This is the landing page</div>
            <div>{children}</div>
        </div>
    );
}
