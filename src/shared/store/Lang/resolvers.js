export const changeLocale = (_, { locale }, { cache }) => {
  const data = {
    lang: {
      locale,
      __typename: "lang"
    }
  };

  cache.writeData({ data });
  return null;
};
