import { springs } from "@blossom-labs/rosette-ui";
import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { a, useTransition } from "@react-spring/web";
import type { TransitionFn } from "@react-spring/web";

import etheruemIcon from "~/assets/ethereum.svg";

export type AppReadyTransition = TransitionFn<
  boolean,
  {
    progress: number;
    topBarTransform: string;
    bottomBarTransform: string;
    screenTransform: string;
  }
>;

type AppReadyContextProps = {
  appReady: boolean;
  appReadyTransition: AppReadyTransition;
};

const AppReadyContext = createContext<AppReadyContextProps>(
  {} as AppReadyContextProps
);

type AppReadyProps = { children: ReactNode };

export function AppReady({ children }: AppReadyProps) {
  const [ready, setReady] = useState(false);

  const appReadyTransition = useTransition(ready, {
    config: springs.lazy,
    delay: 100,
    from: {
      progress: 0,
      topBarTransform: "translate3d(0, -100%, 0)",
      bottomBarTransform: "translate3d(0, 100%, 0)",
      screenTransform: "scale3d(0.9, 0.9, 1)",
    },
    enter: {
      progress: 1,
      topBarTransform: "translate3d(0, 0, 0)",
      bottomBarTransform: "translate3d(0, 0, 0)",
      screenTransform: "scale3d(1, 1, 1)",
    },
    leave: {
      progress: 0,
      topBarTransform: "translate3d(0, -100%, 0)",
      bottomBarTransform: "translate3d(0, 100%, 0)",
      screenTransform: "scale3d(0.9, 0.9, 1)",
    },
  });

  const splashTransition = useTransition(!ready, {
    config: springs.lazy,
    from: {
      opacity: 0,
      transform: " scale(0)",
    },
    enter: {
      opacity: 1,
      transform: "scale(1)",
    },
    leave: {
      opacity: 0,
      transform: "scale(4)",
    },
    onRest: () => setReady(true),
  });

  return (
    <AppReadyContext.Provider value={{ appReady: ready, appReadyTransition }}>
      {splashTransition(
        (styles, loading) =>
          loading && (
            <AnimatedSplashContainer style={styles}>
              <a.div>
                <img
                  style={{ width: "60px", height: "60px" }}
                  src={etheruemIcon}
                  alt=""
                />
              </a.div>
            </AnimatedSplashContainer>
          )
      )}
      {children}
    </AppReadyContext.Provider>
  );
}

export function useAppReady() {
  return useContext(AppReadyContext);
}

const AnimatedSplashContainer = styled(a.div)`
  position: fixed;
  z-index: 9;
  inset: 0;
  display: grid;
  place-items: center;
`;
