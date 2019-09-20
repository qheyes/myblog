module.exports = {
  outputDir: __dirname + '/../server/public/wblog',
  publicPath: process.env.NODE_ENV === 'production'
  ? '/'
  : '/'
}