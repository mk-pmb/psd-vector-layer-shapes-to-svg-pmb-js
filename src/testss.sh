#!/bin/sh
# -*- coding: utf-8, tab-width: 2 -*-
set -o errexit
clear
elp
TDP='../test/decipherPaths.mjs'
elp "$TDP"
PSD_GZ='../test/fixtures/250108.simple_shapes/simple_shapes.psd.gz'
smart-less-pmb -e nodemjs "$TDP" "$PSD_GZ"
