import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";
import { Buffer } from "buffer";

// polyfill Buffer for client (fix for WalletConnect)
if (!window.Buffer) {
  window.Buffer = Buffer;
}

hydrate(<RemixBrowser />, document);
