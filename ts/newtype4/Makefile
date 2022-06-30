ifeq ($(OS), Windows_NT)
	PATH := $(PATH);.\node_modules\.bin
else
	PATH := $(PATH):./node_modules/.bin
endif

run:
	rollup -c
