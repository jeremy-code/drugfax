/**
 * Format a URL (as either a string or a {@link URL} object) with search
 * parameters. The search parameters can be provided in any form that
 * {@link URLSearchParams} accepts, such as a `string`, `string[][]`,
 * `Record<string, string>`, etc.
 *
 * @remarks
 *
 * If URL already has search parameters, those will be merged with the provided
 * arguments in order. Note that they will *NOT* be overwritten as
 * URLSearchParams do not have to be unique keys.
 */
export const formatUrlWithSearchParams = (
  url: ConstructorParameters<typeof URL>[0],
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0],
) => {
  const urlObject = new URL(url);

  // `url.searchParams` are merged with the given `searchParams` in order
  const mergedSearchParams = new URLSearchParams([
    ...urlObject.searchParams,
    ...new URLSearchParams(searchParams),
  ]);

  /**
   * Since the `.searchParams` property of {@link URL} is read-only, updating
   * the `searchParams` is done by setting the URL's `search` property, a string.
   *
   * The `search` property is a string that includes the leading `?` character,
   * while `URLSearchParams.toString()` does not. However, both return the empty
   * string if there are no search parameters.
   *
   * @see {@link https://url.spec.whatwg.org/#dom-url-searchparams}
   * @see {@link https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/toString}
   */
  const mergedSearch =
    mergedSearchParams.size === 0 ? "" : `?${mergedSearchParams}`;

  return Object.assign(urlObject, { search: mergedSearch }).toString();
};
