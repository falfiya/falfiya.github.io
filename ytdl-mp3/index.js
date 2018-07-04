#!/usr/bin/env node
const fs = require('fs');
const ytdl = require('ytdl-core');
const minimist = require('minimist');
const ffmpeg = require('fluent-ffmpeg')

const args = minimist(process.argv.slice(2), { default: { format: 'mp3' } });
const url = args._[0];
const reader = ytdl(url, { filter: 'audioonly' });
reader.pipe(fs.createWriteStream('video.mp4'));
const writer = ffmpeg(reader).format(args.format);
console.log('This may take awhile...');
writer.output(process.stdout).run();
