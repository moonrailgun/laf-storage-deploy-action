#!/usr/bin/env zx
import { $, cd } from 'zx';
import core from '@actions/core';

const input = {
  serverUrl: core.getInput('server-url'),
  lafPat: core.getInput('laf-pat'),
  distPath: core.getInput('dist-path'),
  bucketName:core.getInput('bucket-name'),
};

$`npm i laf-cli -g`

$`laf user add dev -r ${input.serverUrl}`
$`laf user switch dev`
$`laf user list`
$`laf login ${input.lafPat}`
$`laf storage list`

cd(input.distPath)

$`laf storage push ${input.bucketName} ./`
