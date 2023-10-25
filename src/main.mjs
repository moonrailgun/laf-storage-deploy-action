#!/usr/bin/env zx
import { $, cd } from 'zx';
import core from '@actions/core';

const input = {
  serverUrl: core.getInput('server-url'),
  lafPat: core.getInput('laf-pat'),
  distPath: core.getInput('dist-path'),
  bucketName: core.getInput('bucket-name'),
};

try {
  await $`npm i laf-cli -g`;

  await $`laf user add dev -r ${input.serverUrl}`;
  await $`laf user switch dev`;
  await $`laf user list`;
  await $`laf login ${input.lafPat}`;
  await $`laf storage list`;

  cd(input.distPath);

  await $`laf storage push ${input.bucketName} ./`;
} catch (p) {
  console.log(`Exit code: ${p.exitCode}`)
  console.log(`Error: ${p.stderr}`)
}
