import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

//Get messages from locale files
function loadLocaleMessages() {
  const locales = require.context(
    "./locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default ({ app, store }) => {
  // Inject i18n instance into the app root to be used in middleware
  app.i18n = new VueI18n({
    locale: "en",
    fallbackLocale: "en",
    messages: loadLocaleMessages()
  });
};
