module.exports = {
  plugins: {
    autoprefixer: {}
  },
  module: {
    rules: [{
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",
        options: {
          javascriptEnabled: true
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  }
}