#!/usr/bin/env python3
import fileinput

file = fileinput.FileInput('docs/index.html', inplace=True, backup='.bak')
for line in file:
    print(line.replace('src=/', ' src='), end='')

file.close()

file = fileinput.FileInput('docs/index.html', inplace=True, backup='.bak')
for line in file:
    print(line.replace('href=/', ' href='), end='')

file.close()