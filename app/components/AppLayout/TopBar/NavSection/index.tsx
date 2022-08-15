import { GU, textStyle } from "@blossom-labs/rosette-ui";
import { NavLink, useLocation } from "@remix-run/react";
import styled from "styled-components";
import { CompactMenu } from "./CompactMenu";

import swapIcon from "~/assets/sidebar-swap.svg";

export type NavigationItem = {
  icon: string;
  label: string;
  to: string;
};

const navigationItem: NavigationItem[] = [
  { icon: swapIcon, label: "Home", to: "/home" },
];

export const NavSection = ({ compact }: { compact: boolean }) => {
  const { pathname } = useLocation();

  return compact ? (
    <CompactMenu items={navigationItem} />
  ) : (
    <NavLinksList>
      {navigationItem.map(({ label, to }) => {
        const renderBottom = to !== "/home" && pathname === to;

        return (
          <LiStyled key={label} renderBottom={renderBottom}>
            <NavLink to={to}>{label}</NavLink>
          </LiStyled>
        );
      })}
    </NavLinksList>
  );
};

const LiStyled = styled.li<{ renderBottom: boolean }>`
  ${({ renderBottom }) =>
    renderBottom && "padding-bottom: 2px; border-bottom: 1px solid;"}
`;

const NavLinksList = styled.ul`
  display: flex;
  align-items: center;
  gap: ${6 * GU}px;
  list-style: none;
  ${textStyle("body2")};
  color: ${(props) => props.theme.content};

  li:first-child {
    ${textStyle("title2")};
  }

  > li {
    transition: all 200ms ease;
    padding-bottom: 2px;
    &:not(:first-child):hover {
      border-bottom: 1px solid;
    }
  }

  li > * {
    text-decoration: none;
  }
`;
