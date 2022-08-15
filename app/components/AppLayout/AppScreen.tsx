import type { ReactNode } from "react";
import { useEffect } from "react";
import { a } from "@react-spring/web";
import { useOutletContext } from "@remix-run/react";
import styled from "styled-components";
import { useAppReady } from "~/providers/AppReady";
import type { AppContext } from "~/App";

type AppScreenProps = {
  children: ReactNode;
  hideBottomBar?: boolean;
  hideTopBar?: boolean;
};

export const AppScreen = ({
  children,
  hideBottomBar = false,
  hideTopBar = false,
}: AppScreenProps) => {
  const { appReadyTransition } = useAppReady();
  const { displayBottomBar, displayTopBar } = useOutletContext<AppContext>();

  useEffect(() => {
    displayBottomBar(!hideBottomBar);

    displayTopBar(!hideTopBar);
  }, [hideBottomBar, hideTopBar, displayBottomBar, displayTopBar]);

  return appReadyTransition(
    ({ progress, screenTransform }, ready) =>
      ready && (
        <AnimatedContainer
          style={{ opacity: progress, transform: screenTransform }}
        >
          {children}
        </AnimatedContainer>
      )
  );
};

const AnimatedContainer = styled(a.div)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  margin: 0 auto;
`;
