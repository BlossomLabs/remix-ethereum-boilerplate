import type { ReactNode } from "react";
import { a, useSpring } from "@react-spring/web";

export const SmoothDisplayContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  const smoothDisplayStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <a.div
      style={{
        ...smoothDisplayStyles,
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </a.div>
  );
};
