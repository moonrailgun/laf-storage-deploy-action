#!/usr/bin/env zx
import { $, cd } from 'zx';
import core from '@actions/core';
import fs from 'fs-extra';
import path from 'path';

const input = {
  serverUrl: core.getInput('laf-server'),
  lafPat: core.getInput('laf-pat'),
  lafAppId: core.getInput('laf-appid'),
  bucketName: core.getInput('laf-bucket-name'),
  distPath: core.getInput('dist-path'),
};

const cwd = process.cwd();

try {
  // await $`npm i laf-cli -g`;
  await $`npm i nw-laf-cli -g`; // use nightly version

  await $`laf user add dev -r ${input.serverUrl}`;
  await $`laf user switch dev`;
  await $`laf user list`;
  await $`laf login ${input.lafPat}`;
  await $`mkdir .laf`;
  await $`mkdir .laf/.upload`;
  cd('.laf');
  await $`pwd`;
  await $`laf app init ${input.lafAppId}`;
  await $`laf storage list`;

  await fs.copy(
    path.resolve(cwd, input.distPath),
    path.resolve(cwd, './.laf/.upload')
  );

  await $`laf storage push ${input.bucketName} ./.upload`;
} catch (p) {
  console.error('Error:', p);
  console.log(`Exit code: ${p.exitCode}`);
  console.log(`Error: ${p.stderr}`);
  process.exit(p.exitCode || 1);
}
