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
