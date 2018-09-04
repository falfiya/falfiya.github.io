#!/bin/bash


if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

if [[ $# == 0 ]]
then
    echo "No key name provided"
    exit 1
fi

UNIQUE=$1

sudo apt-key list | grep "${UNIQUE}" -B 1 > result.temp

LENGTH=$(cat result.temp | wc -l)

if [[ ${LENGTH} -gt 2 ]]
then
    echo "Attention you found more than 1 key. Use a more specific string."
    exit 2
fi

if [[ ${LENGTH} != 2 ]]
then
    echo "Key not found. Doing nothing."
    exit 3
fi

KEYID=$(cat result.temp | grep 'pub' | cut -d " " -f 4 | cut -d "/" -f 2)
echo "KEYID: "$KEYID

apt-key del ${KEYID}

rm result.temp
