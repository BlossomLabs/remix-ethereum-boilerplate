import styled from "styled-components";

import blossomLabsLogo from "~/assets/blossom-logo.svg";

export const BlossomLabsLogo = () => (
  <OutterWrapper>
    <a
      style={{
        textDecoration: "none",
      }}
      target="_blank"
      href="https://github.com/BlossomLabs"
      rel="noreferrer"
    >
      <img src={blossomLabsLogo} alt="" />
    </a>
  </OutterWrapper>
);

const OutterWrapper = styled.span`
  display: inline-block;
  vertical-align: middle;
`;
