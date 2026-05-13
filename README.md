This Nintex K2 Advanced Style Profile is intended to work with the Pre-sales Framework at: https://gallery.nintex.com/t/k2_presales_framework

If you wish to use it standalone, outside of the framework, you use the package "PSF Style Profile Demo.kspx" in this repo to see how a minimal implementation works.

On a Form, the header view should be called "header" and you need to call its Server Side Rule to initialise. Also pass the Header and Sub-header text here.

The profile is designed to work with tabs which it relocates to the side bar it injects. WIthout tabs the side bar is quie redundant.

The Header also contains additional JS which:

1. Injects a PWA manifest
2. Allows progressive removal of list columns from the centre-first to support better responsive usability on small screens
3. Makes additional tweaks to margins and spacing
4. Puts the Header above the tab and pins the foot to the bottom of each tab - the foot must be placed as the last view on the last tab of the form

