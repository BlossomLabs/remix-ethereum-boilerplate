import { RootPortal } from "@blossom-labs/rosette-ui";
import type { ReactNode } from "react";
import { a, useTransition } from "@react-spring/web";
import styled from "styled-components";

type SidebarProps = {
  children: ReactNode;
  show: boolean;
  width: number;
  onToggle(): void;
};

export const Sidebar = ({ children, show, width, onToggle }: SidebarProps) => {
  const sidebarTransition = useTransition(show, {
    from: {
      marginLeft: `-${width}px`,
      opacity: 0,
    },
    enter: {
      marginLeft: "0",
      opacity: 1,
    },
    leave: {
      marginLeft: `-${width}px`,
      opacity: 0,
    },
    unique: true,
    config: { mass: 5, tension: 1500, friction: 200 },
    delay: 100,
  });

  return sidebarTransition((styles, show) => {
    return (
      show && (
        <RootPortal>
          <AnimatedSidebar
            style={{ marginLeft: styles.marginLeft }}
            width={width}
            $zIndex={3}
          >
            {children}
          </AnimatedSidebar>
          <OpaqueBackground
            style={styles}
            $show={show}
            $offset={width}
            onClick={onToggle}
          />
        </RootPortal>
      )
    );
  });
};

const AnimatedSidebar = styled(a.div)<{ width: number; $zIndex: number }>`
  height: 100vh;
  position: absolute;
  border-right: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  ${({ width, $zIndex }) => `
    z-index: ${$zIndex};
    width: ${width}px;
    top: 0;
    bottom: 0;
    left: 0;
  `};
`;

const OpaqueBackground = styled(a.div)<{ $offset: number; $show: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  left: ${({ $offset }) => $offset}px;
  z-index: 1;
  height: 100%;
  background: ${({ theme }) => theme.overlay.alpha(0.7)};
  pointer-events: ${({ $show }) => ($show ? "auto" : "none")};
`;
