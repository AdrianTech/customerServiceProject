module.exports = {
  devServer: {
    proxy: "http://localhost:7777"
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/scss/_mixins.scss";
        @import "@/scss/_variables.scss";
        @import "@/scss/_classes.scss";
        `
      }
    }
  }
};
