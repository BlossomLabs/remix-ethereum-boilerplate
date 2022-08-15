import { useCallback } from "react";
import { useToast } from "@blossom-labs/rosette-ui";
import { writeText as copy } from "clipboard-polyfill";

export function useCopyToClipboard() {
  const toast = useToast();

  return useCallback(
    (text, confirmationMessage = "Copied") => {
      copy(text);
      if (confirmationMessage) {
        toast(confirmationMessage);
      }
    },
    [toast]
  );
}
