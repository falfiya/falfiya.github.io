#!/bin/sh
red=`tput setaf 1`
magenta=`tput setaf 5`
cyan=`tput setaf 6`
green=`tput setaf 2`
reset=`tput sgr0`
blue=`tput setaf 4`
has_in_file=false
has_out_file=false
pack=false
assets=false
storage=false
command='ls -a'
player=false
ubuntu=false
prefix=''
absolute_path='/mnt/s/Steam\ App\ Files/steamapps/common/Starbound/'
while getopts o:i:pasPu opt; do
  case $opt in
    i)
      has_in_file=true
      in_file=$OPTARG
      ;;
    o)
      has_out_file=true
      out_file=$OPTARG
      ;;
    p)
      pack=true
      ;;
    a)
      assets=true
      ;;
    s)
      storage=true
      ;;
    P)
      player=true
      ;;
    u)
      ubuntu=true
      ;;
    \?)
      echo "That's not a flag -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Well -$OPTARG needs an argument otherwise how's it supposed to know what to do?" >&2
      exit 1
      ;;
  esac
done
if $ubuntu; then
  echo "${magenta}Running from an absolute path through Ubuntu on Windows!"
  echo "Most likely /mnt/s/Steam\ App\ Files/steamapps/common/Starbound/starbound.sh"
  echo "Prefixing exe binary paths with the absolute path to the Starbound directory!${reset}"
  prefix=$absolute_path
fi
if $storage && !player; then
  in_file="storage/$in_file"
fi
if $player; then
  in_file="storage/player/$in_file"
fi
if $has_in_file; then
  echo "${green}The input is $in_file ${reset}"
else
  echo "${red}Uh, there's no input"
  exit 1
fi
if $has_out_file; then
  echo "${cyan}The output is $out_file ${reset}"
else
  out_file="$in_file.new"
  echo "${blue}No output file specified. Outputting to $out_file${reset}"
fi
if $pack; then
  echo "Currently in packing mode"
else
  echo "Currently in unpacking mode"
fi
if $assets; then
  echo "Oprating on assets"
else
  echo "Operating on packed or unpacked JSON"
fi
if $pack; then
  if $assets; then
    command="asset_packer.exe"
  else
    command="make_versioned_json.exe"
  fi
else
  if $assets; then
    command="asset_unpacker.exe"
  else
    command="dump_versioned_json.exe"
  fi
fi
command="${prefix}win32/$command $in_file $out_file"
echo "The command to evaluate is $command"
eval $command
