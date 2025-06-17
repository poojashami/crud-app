module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:3000*",
        destination: "http://localhost:5000/api/:3000*",
      },
    ];
  },
};
