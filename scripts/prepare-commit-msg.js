#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* tslint:disable no-console */
const fs = require('fs');
const chalk = require('chalk');
const emoji = require('emoji-random');

const [messageFile, commitType] = process.env.HUSKY_GIT_PARAMS.split(' ');
const message = fs.readFileSync(messageFile, { encoding: 'utf-8' });
const messageTitle = message.split('\n')[0];
console.log('messageTitle', messageTitle);
const isMergeBranch = commitType === 'merge';
const hasEmoji = / (:\w+:)$/.test(messageTitle);

if (!hasEmoji && !isMergeBranch) {
  const randomEmoji = emoji.random();
  const newMessage = `${messageTitle} ${randomEmoji}`;

  fs.writeFileSync(messageFile, newMessage, { encoding: 'utf-8' });
  console.log(chalk.yellow.bold(`${randomEmoji} added to commit message!`));
}
