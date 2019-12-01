Simplified SCSS Flexbox Grid
===========
This project is an adaptation from the [Flexboxgrid Sass](http://hugeinc.github.io/flexboxgrid-sass) based on [Flexbox Grid](http://flexboxgrid.com/).

This version is modified based on the need for:
- Custom class prefixes
- Removal of non-grid flex helpers (alignment, order, etc)
- Support for deep nested SCSS maps
- Simplified column naming (e.g. no need to identify mobile devices as the baseline)


Setup
---------
- Import the `flexgrid.scss` file into your project.
- Add config settings below to your global config file.

Config
---------
#### Set number of columns
`$global-grid-columns: 12;`

#### Set column guters
`$global-gutter-width: 1rem;`

#### Set margins
`$global-outer-margin: 1rem;`

#### Set breakpoints
Breakpoints are set through deep nested SCSS maps. Example:

```
$tokens: (
  'breakpoint': (
  'mobile': (
    'breakpoint_width': $token-breakpoint-mobile-breakpoint-width,
    'container_width': $token-breakpoint-mobile-container-width
  ),
  'tablet': (
    'breakpoint_width': $token-breakpoint-tablet-breakpoint-width,
    'container_width': $token-breakpoint-tablet-container-width
  ),
  etc...
)
```
