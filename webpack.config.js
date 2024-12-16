const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  // 入口文件
  entry: "./src/index.js",
  // 输出
  output: {
    path: path.resolve("dist"), // 指定输出文件存放的目录
    filename: "bundle.js" // 指定输出文件的名字
  },
  devtool: "inline-source-map", // 配置开发工具，这里指定了生成 inline source map 的方式，方便调试。
  module: {
    rules: [ // 定义规则来处理特定类型的模块
      {
        test: /\.js$/, // 匹配以 .js 结尾的文件名
        exclude: /node_modules/, // 排除 node_modules
        use: "babel-loader" // 对匹配到的文件使用 babel-loader 进行加载和转换
      }
    ]
  },
  plugins: [
    // 在构建之前将 dist 文件夹清理掉
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["./dist"]
    }),
    // 指定 HTML 模板, 插件会将构建好的 js 文件自动插入到 HTML 文件中
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  // 指定控制台输出的信息
  stats: "errors-only",
  devServer: {
    // 指定开发环境应用运行的根据目录
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    // 不启动压缩
    compress: false,
    host: "localhost",
    port: 5000
  }
}