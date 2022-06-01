import {
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  useRoute,
} from 'vue-router';

export const useFromRoute = (
  fn: (to: RouteLocationNormalized, from?: RouteLocationNormalized) => void
) => {
  fn(useRoute(), undefined);
  onBeforeRouteUpdate((to, from, next) => {
    fn(to, from);
    next();
  });
};
