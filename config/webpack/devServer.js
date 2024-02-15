const getDevServer = ({ port }) => {
  return {
    port,
    open: false,
    hot: true,
  };
};

module.exports = getDevServer;
