#! /usr/bin/env node

const {program} = require('commander');
const download = require('download-git-repo');
const pkg = require('./package.json')

program.version(pkg.version, '-v, --version')
  .command('init <projectName>')
  .action((projectName) => {
    try{
      console.log('clone template ...');
      download('https://github.com:wbh1328551759/webpack-react-typescript-basic-cli#main', projectName, {clone: true}, function (err) {
        console.log(err ? err : 'Success')
      })
    } catch (err) {
      console.error('error: ', err)
    }
  });
program.parse(process.argv);
