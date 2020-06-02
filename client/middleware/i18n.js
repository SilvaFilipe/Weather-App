export default function({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale;
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) return;

  //Set locale from the query string '?lang='**''
  const locale = route.query.lang || defaultLocale;

  //Mutate the store's locale once we understand which locale is being requested prior to each page render
  store.commit("set_lang", locale);

  app.i18n.locale = store.state.locale;
}
