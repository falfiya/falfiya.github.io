# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=2000

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# Nice Prompt
export PS1="\[\e[31m\]\u\[\e[35m\] in \[\e[36m\]\W \[\e[33m\]λ \[\e[0m\]"
# It looks like this:
# User in ~ λ

# aliases
alias ..="cd .."

# some more ls aliases
alias ll="ls -alF"
alias lsa="ls -A"
alias l="ls -CF"

# windows interfacing
windows_drive="/mnt/c/"
windows_username="tower"
windows_userfolder="$windows_drive/Users/$windows_username"
alias home="cd $windows_userfolder"
alias cdd="home && cd Desktop"
alias code="cdd && cd coalpha.github.io"
alias clip="clip.exe"

# default dir
default_dir_path="~/default_dir.txt"
if [ -f default_dir_path ]; then
    cd default_dir_path
fi
alias ddir="pwd >> $default_dir_path"
alias disable_ddir="rm $default_dir_path"

# NVM Crap
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# node
alias no="node --experimental-modules"
