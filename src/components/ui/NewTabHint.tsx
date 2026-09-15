/** Id of the single "opens in a new tab" description, referenced by every external link. */
export const NEW_TAB_HINT_ID = "new-tab-hint";

/**
 * Rendered once per page. External links point to it with `aria-describedby`, so screen readers still
 * announce "Opens in a new tab", while the page text (copy/paste, readers, crawlers) doesn't repeat it
 * after every link — `hidden` content is excluded from rendered text but still usable as a description.
 */
export function NewTabHint() {
  return (
    <span id={NEW_TAB_HINT_ID} hidden>
      Opens in a new tab
    </span>
  );
}
