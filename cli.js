#! /usr/bin/env node

const {program} = require('commander');
const download = require('download-git-repo');
const pkg = require('./package.json')
const inquirer = require("inquirer");

const askForUseWhichTemplate = (projectName) => {
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'whetherNeedNextjs',
      message: '是否使用 nextjs 作为脚手架'
    }
  ]).then(answer => {
    if (answer.whetherNeedNextjs) {
      try {
        console.log('clone nextjs template ...');
        download('https://github.com:wbh1328551759/nextjs-polkadot-example#main', projectName, {clone: true}, function (err) {
          console.log(err ? err : 'Nextjs Success')
        })
        //添加wp2vite的命令

      } catch (err) {
        console.error('error: ', err)
      }
    } else {
      askForViteOrWebpack(projectName)
    }
  })
}

const askForViteOrWebpack = (projectName) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'projectOwnership',
        message: '本地开发使用webpack还是vite',
        choices: ['webpack', 'vite']
      }
    ])
    .then((answer) => {
      const projectChooseEnv = JSON.parse(JSON.stringify(answer)).projectOwnership === 'vite' ? 'vite' : 'webpack';
      if (projectChooseEnv === 'vite') {
        try {
          console.log('clone vite template ...');
          download('https://github.com:xl2412/webpack-cli-vite#main', projectName, {clone: true}, function (err) {
            console.log(err ? err : 'vite Success')
          })
          //添加wp2vite的命令

        } catch (err) {
          console.error('error: ', err)
        } finally {

        }
      } else {
        try {
          console.log('clone webpack template ...');
          download('https://github.com:wbh1328551759/webpack-react-typescript-basic-cli#main', projectName, {clone: true}, function (err) {
            console.log(err ? err : 'webpack Success')
          })
        } catch (err) {
          console.error('error: ', err)
        } finally {

        }
      }
    });
}

program.version(pkg.version, '-v, --version')
  .command('init <projectName>')
  .action((projectName) => {
    askForUseWhichTemplate(projectName)
  });
program.parse(process.argv);

