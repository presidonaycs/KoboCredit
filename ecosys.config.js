module.exports = {
    apps : [{
        script: 'npm start',
    }],

    deploy: {
        production: {
            key:"Koborush.pem",
            user:"ubuntu",
            host:"13.49.243.6",
            ref:"origin/main",
            repo:"git@github.com:presidonaycs/KoboCredit.git",
            path:"/home/ubuntu",
            'pre-deploy-local':'',
            'post-deploy':'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
            'pre-setup': '',
            'ssh_options': 'ForwardAgent=yes'
        }
    }
};