/** srcset for a project screenshot: the 720px copy made by `npm run images` plus the 1440px original. */
export function screenshotSrcSet(src: string) {
  return `${src.replace(/\.webp$/, "-720.webp")} 720w, ${src} 1440w`;
}
