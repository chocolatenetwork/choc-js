export enum TabOptions {
  reviews = 'reviews',
  about = 'about',
}
export const ProjectParams = {
  tab: 'tab',
  modals: 'modals',
};
export const ProjectModals = {
  addReview: 'addReview',
};
export const defaultPage = new URLSearchParams([
  [ProjectParams.tab, TabOptions.reviews],
]);
