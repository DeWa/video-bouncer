#!/bin/bash
echo "Starting to encode videos"
command -v ffmpeg >/dev/null 2>&1 || { echo "FFMPEG is required.  Aborting." >&2; exit 1; }
if [ $# -ne 2 ]
then
  echo "Wrong number of arguments. Aborting."
  exit 1
fi

echo "MP4:"
ffmpeg -i $1 -vcodec h264 -acodec aac -an -strict -2 $2.mp4

echo "WEBM:"
ffmpeg -i $1 -vcodec libvpx -qmin 0 -qmax 25 -an -crf 10 -b:v 1M -acodec libvorbis $2.webm

echo "DONE!"
