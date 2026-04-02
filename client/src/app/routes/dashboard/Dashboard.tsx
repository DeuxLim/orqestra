import { type ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export default function Dashboard({ children }: Props) {
    return (
        <div>
            <div>This is the dashboard</div>
            <div>{children}</div>
        </div>
    );
}
