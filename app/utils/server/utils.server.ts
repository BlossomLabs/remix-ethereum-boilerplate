export const getSearchParams = (
  url: string,
  searchParamNames: string[]
): string[] => {
  const { searchParams } = new URL(url);
  const missingParams = searchParamNames.filter(
    (paramName) => !searchParams.has(paramName)
  );

  if (!missingParams.length) {
    return searchParamNames.map((paramName) => searchParams.get(paramName)!);
  }

  const onlyOne = missingParams.length === 1;
  const allButLast = missingParams.slice(
    0,
    onlyOne ? missingParams.length : missingParams.length - 1
  );

  throw new Response(
    `Expected ${allButLast.join(", ")} ${
      onlyOne ? "" : `and ${missingParams[missingParams.length - 1]}`
    } param${onlyOne ? "" : "s"} `,
    {
      status: 400,
      statusText: "Expected search params",
    }
  );
};
