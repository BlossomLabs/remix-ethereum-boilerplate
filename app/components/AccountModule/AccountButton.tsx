import {
  ButtonBase,
  EthIdenticon,
  GU,
  IconDown,
  BIG_RADIUS,
  shortenAddress,
  textStyle,
  useTheme,
  useViewport,
} from "@blossom-labs/rosette-ui";
import { Fragment } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";

type AccountButtonWrapperProps = {
  content: ReactNode;
  hasPopover: boolean;
  icon?: string | ReactNode;
  onClick?: () => void;
};

const AccountButtonWrapper = ({
  content,
  hasPopover = false,
  icon,
  onClick,
}: AccountButtonWrapperProps) => {
  const { above } = useViewport();
  const theme = useTheme();

  return (
    <AccountButtonBase onClick={onClick}>
      <InnerContainer>
        <>
          {icon}
          {above("medium") && (
            <Fragment>
              <div
                style={{
                  paddingLeft: `${1 * GU}px`,
                  paddingRight: `${2.5 * GU}px`,
                }}
              >
                {content}
              </div>
              {hasPopover && (
                <IconDown size="small" color={theme.surfaceIcon} />
              )}
            </Fragment>
          )}
        </>
      </InnerContainer>
    </AccountButtonBase>
  );
};

type AccountButtonProps = {
  onClick: () => void;
};

export const AccountButton = ({ onClick }: AccountButtonProps) => {
  const { above } = useViewport();
  const [{ data: accountData }] = useAccount({ fetchEns: true });
  const { address, ens } = accountData || {};

  return (
    <Container large={above("medium")}>
      <AccountButtonWrapper
        hasPopover
        onClick={onClick}
        icon={
          <div style={{ position: "relative" }}>
            <EthIdenticon address={address} radius={BIG_RADIUS} />
            <ConnectedCircle />
          </div>
        }
        content={
          <>
            {!!address && (
              <LabelWrapper>
                <LabelInnerWrapper>
                  {ens?.name || shortenAddress(address ?? "")}
                </LabelInnerWrapper>
              </LabelWrapper>
            )}
          </>
        }
      />
    </Container>
  );
};

const Container = styled.div<{ large: boolean }>`
  ${({ large, theme }) => large && `border: 1px solid ${theme.content};`}
  border-radius: 8px;
`;

const AccountButtonBase = styled(ButtonBase)`
  height: 100%;
  padding: ${0.2 * GU}px;
  ${(props) =>
    props.onClick !== undefined
      ? `&:active { background: ${props.theme.surfacePressed}; }`
      : `cursor: auto;`};
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  padding: ${1 * GU}px ${1.75 * GU}px ${1 * GU}px ${1 * GU}px;
`;

const ConnectedCircle = styled.div`
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 10px;
  height: 10px;
  background: ${({ theme }) => theme.positive};
  border: 2px solid #141313;
  border-radius: 50%;
`;

const LabelWrapper = styled.div`
  margin-bottom: -5px;
  color: ${({ theme }) => theme.content};
  ${textStyle("body2")};
`;

const LabelInnerWrapper = styled.div`
  overflow: hidden;
  max-width: 128px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
