import { GU, useTheme } from "@blossom-labs/rosette-ui";
import { Link } from "@remix-run/react";
import styled from "styled-components";
import type { NavigationItem } from "..";

type MenuItemProps = {
  item: NavigationItem;
  active?: boolean;
  onClick(): void;
};

export const MenuItem = ({
  item: { icon, label, to },
  active = false,
  onClick,
}: MenuItemProps) => {
  const theme = useTheme();

  return (
    <div style={{ position: "relative" }} onClick={onClick}>
      {active && <ActiveBar />}
      <Link
        to={to}
        style={{
          display: "block",
          width: "100%",
          backgroundColor: active ? theme.surfaceHighlight : theme.background,
          textDecoration: "none",
        }}
      >
        <InnerNavLink>
          {icon && (
            <img
              style={{
                width: "24px",
                height: "24px",
              }}
              src={icon}
              alt=""
            />
          )}
          <span>{label}</span>
        </InnerNavLink>
      </Link>
    </div>
  );
};

const ActiveBar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 4px;
  background: #7c5fe0;
`;

const InnerNavLink = styled.div`
  display: flex;
  align-items: center;
  gap: ${1 * GU}px;
  padding: ${1.5 * GU}px;

  & img {
    width: 20px;
    height: 20px;
  }

  & > span {
    color: ${({ theme }) => theme.content};
  }
`;
