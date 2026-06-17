#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');

const rawArgs = process.argv.slice(2);
const args = rawArgs.map((arg, index) => {
  if (index === 0 && arg === 'ios') return 'run:ios';
  if (index === 0 && arg === 'android') return 'run:android';
  return arg;
});
const expoBin = path.resolve(__dirname, '..', 'node_modules', '.bin', process.platform === 'win32' ? 'expo.cmd' : 'expo');

const result = spawnSync(expoBin, args, { stdio: 'inherit' });
process.exit(result.status || 0);
