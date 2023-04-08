export enum TabOptions {
  reviews = 'reviews',
  about = 'about',
}
export const ProjectParams = {
  tab: 'tab',
};
export const defaultPage = new URLSearchParams([
  [ProjectParams.tab, TabOptions.reviews],
]);
