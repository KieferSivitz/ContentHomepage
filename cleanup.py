#!/usr/bin/env python3
import fileinput

file = fileinput.FileInput('docs/index.html', inplace=True, backup='.bak')
for line in file:
    print(line.replace('src=/', ' src='), end='')
