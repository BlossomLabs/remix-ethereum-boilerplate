import {
  ButtonBase,
  GU,
  IconMenu,
  useViewport,
} from "@blossom-labs/rosette-ui";
import { useState } from "react";
import { useLocation } from "@remix-run/react";
import styled from "styled-components";
import type { NavigationItem } from "..";
import { MenuItem } from "./MenuItem";
import { Sidebar } from "./Sidebar";

const MenuButton = ({ onClick }: { onClick(): void }) => (
  <ButtonContainer>
    <ButtonBase
      onClick={onClick}
      css={`
        display: flex;
        align-items: center;
      `}
    >
      <StyledMenuIcon />
    </ButtonBase>
  </ButtonContainer>
);

const MIN_SIDEBAR_WIDTH = 240;

export const CompactMenu = ({ items }: { items: NavigationItem[] }) => {
  const { pathname } = useLocation();
  const { width } = useViewport();
  const [displaySidebar, setDisplaySidebar] = useState(false);

  const sidebarWidth = Math.min(MIN_SIDEBAR_WIDTH, width * 0.6);

  const toggleSidebar = () => setDisplaySidebar((prev) => !prev);

  return (
    <div>
      <MenuButton onClick={toggleSidebar} />
      <Sidebar
        width={sidebarWidth}
        show={displaySidebar}
        onToggle={toggleSidebar}
      >
        <NavContainer>
          {items.map((i) => (
            <li key={i.label}>
              <MenuItem
                item={i}
                active={pathname === i.to}
                onClick={toggleSidebar}
              />
            </li>
          ))}
        </NavContainer>
      </Sidebar>
    </div>
  );
};

const ButtonContainer = styled.div`
  width: ${8 * GU}px;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

const StyledMenuIcon = styled(IconMenu)`
  width: ${4 * GU}px;
  height: ${4 * GU}px;
  color: ${({ theme }) => theme.border};
`;

const NavContainer = styled.ul`
  list-style: none;
`;
