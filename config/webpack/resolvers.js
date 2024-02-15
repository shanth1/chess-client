const getResolvers = (options) => {
  return {
    extensions: ['.js'],
    alias: {
      '@': options.paths.src,
    },
  };
};

module.exports = getResolvers;
