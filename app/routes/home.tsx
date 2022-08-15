import { RADIUS, useViewport, GU, useTheme } from "@blossom-labs/rosette-ui";
import type { Theme } from "@uniswap/widgets";
import { SwapWidget } from "@uniswap/widgets";
import { useCatch } from "@remix-run/react";
import styled from "styled-components";
import { useSigner } from "wagmi";
import { AppScreen } from "~/components/AppLayout/AppScreen";
import { SmoothDisplayContainer } from "~/components/SmoothDisplayContainer";

export default function Home() {
  const { below } = useViewport();
  const theme = useTheme();
  const [{ data }] = useSigner();

  const uniswapTheme: Theme = {
    primary: `${theme.content}`,
    secondary: `${theme.contentSecondary}`,
    interactive: `${theme.border}`,
    container: `${theme.surface.alpha(0.5)}`,
    module: `${theme.floatingContent}`,
    accent: `${theme.accent}`,
    outline: `${theme.borderDark}`,
    dialog: `${theme.surface}`,
    fontFamily: "rosette-ui",
    borderRadius: RADIUS,
    active: `${theme.selected}`,
    error: `${theme.negative}`,
    success: `${theme.positive}`,
    warning: `${theme.warning}`,
  };

  return (
    <AppScreen>
      <SmoothDisplayContainer>
        <MainContainer compactMode={below("medium")}>
          <SwapWidget
            provider={data?.provider as any}
            jsonRpcEndpoint={window.ENV.RPC_URL}
            theme={uniswapTheme}
          />
        </MainContainer>
      </SmoothDisplayContainer>
    </AppScreen>
  );
}

const MainContainer = styled.div<{ compactMode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: ${({ compactMode }) => (compactMode ? 7 * GU : 23 * GU)}px;
  width: 100%;
  height: 100%;
`;

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch();

  let message;

  switch (caught.status) {
    case 400:
      message = caught.data;
    case 500:
      message = caught.data;
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <div>
      <div>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </div>
    </div>
  );
}
