module.exports = {
  apps: [
    {
      name: 'WeChatBot',
      interpreter: './node_modules/.bin/esno',
      script: './src/index.ts',
      watch: ['./src/**'],
      out_file: '/dev/null',
      error_file: '/dev/null',
      env: {
        NODE_ENV: 'production',
        OPEN_AI_API_KEY: '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'
      },
      log_date_format: 'YYYY-MM-DD'
    }
  ]
}
