
"Simple shapes" fixtures
========================

* `no_compat.psd.gz`: The original PSD file,
  without compatibility information, gzipped.
* `max_compat.psd.gz`: The same PSD file, saved with maximum compatibility
  for older versions of Photoshop, gzipped.
* `flat.png`: A preview image that Photoshop has generated.
* `layerslist.png`: A screenshot of the layers list panel,
  to identify and check the expected layer colors.
* `shapes.ps-paths.svg`: The SVG code that Photoshop
  has generated for the layer group "shapes".
  * NB: The SVG canvas is smaller because PS has cut off empty space on the
    left side. The empty space on the right side is probably there because
    there were shapes at some point that I then had deleted.
  * The font name "Myriad Pro" happened to be the default for the text tool
    template, and I couldn't find a way in PS to quickly change it.
    This slightly increases the difficulty of the challenge, but on the plus
    side, it will make this tool more robust.
* `shapes.deciphered.svg`: Simplified SVG, with mostly shape-named elements
  rather than cryptic `<path>`s.
* `compatibility_mode.diff`: A diff comparing the exported PSD trees of both
  PSD files, as parsed by the `psd` module.



