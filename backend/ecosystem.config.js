module.exports = {
  apps: [{
    name: 'mesto-auto-deploy',
    script: 'app.js',
  }],
  deploy: {
    production: {
      user: 'yulia',
      host: '62.84.113.218',
      ref: 'origin/master',
      repo: 'git@github.com:yuliakorolevaP/react-mesto-api-full-gha.git',
      path: '/home/yulia/auto-deploy',
      'pre-deploy-local': 'scp .env yulia@62.84.113.218:/home/yula/auto-deploy/current/backend',
      'post-deploy': 'pwd && cd backend && npm i && pm2 startOrRestart ecosystem.config.js --env productin',
    },
  },
};
