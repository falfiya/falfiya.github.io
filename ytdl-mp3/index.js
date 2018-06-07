#!/usr/bin/env node
const fs = require('fs');
const ytdl = require('ytdl-core');
const minimist = require('minimist');
const ffmpeg = require('fluent-ffmpeg');

console.log('This may take awhile...');

const args = minimist(process.argv.slice(2), { default: { format: 'mp3' } });
const url = args._[0];
const name = args._[1] || 'audio.mp3';
const reader = ytdl(url, { filter: 'audioonly' });
const out = fs.createWriteStream(name);
const writer = ffmpeg(reader).format(args.format);
writer.output(out).run();
