module.exports = {
  publicPath: '/weather-app/',
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
