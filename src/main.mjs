#!/usr/bin/env zx
import { $, cd } from 'zx';
import core from '@actions/core';
import fs from 'fs-extra';
import path from 'path';

const input = {
  serverUrl: core.getInput('server-url'),
  lafPat: core.getInput('laf-pat'),
  lafAppId: core.getInput('laf-appid'),
  distPath: core.getInput('dist-path'),
  bucketName: core.getInput('bucket-name'),
};

try {
  await $`npm i laf-cli -g`;

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

  await fs.copy(input.distPath, './.laf/.upload');

  await $`laf storage push ./.upload ./`;
} catch (p) {
  console.log(`Exit code: ${p.exitCode}`);
  console.log(`Error: ${p.stderr}`);
  process.exit(p.exitCode);
}
