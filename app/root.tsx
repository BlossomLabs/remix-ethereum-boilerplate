import { Main } from "@blossom-labs/rosette-ui";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { App } from "~/App";

export const meta: MetaFunction = () => {
  return {
    title: "Ethereum",
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
  };
};

export async function loader() {
  return json({
    ENV: {
      CHAIN_ID: process.env.CHAIN_ID,
      RPC_URL: process.env.RPC_URL,
      INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
    },
  });
}

interface DocumentProps {
  children: React.ReactNode;
}

const Document = ({ children }: DocumentProps) => {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function WrapperApp() {
  return (
    <Document>
      <Main
        assetsUrl="/aragon-ui/"
        layout={false}
        scrollView={true}
        theme="dark"
      >
        <App />
      </Main>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <div>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      {message}
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <p>[ErrorBoundary]: There was an error: {error.message}</p>
    </div>
  );
}
