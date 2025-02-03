#!/bin/sh
# -*- coding: utf-8, tab-width: 2 -*-
set -o errexit
clear
echo -n 'Lint src: '; elp
TDP='../test/decipherPaths.mjs'
echo -n "Lint $TDP: "; elp "$TDP"
FSS='../test/fixtures/250108.simple_shapes'
PSD_GZ="$FSS/max_compat.psd.gz"
# PSD_GZ="$FSS/no_compat.psd.gz"
smart-less-pmb -e nodemjs "$TDP" "$PSD_GZ"
