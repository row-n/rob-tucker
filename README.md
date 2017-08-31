# Rob Tucker

Showcase site for rob-tucker.com, built with [Wordpress](https://wordpress.org).

## Development dependencies

* Install [node](https://nodejs.org/en/)

## Installation and Setup

* Install a fresh version of Wordpress.
* Navigate to your theme folder.
* Clone the site from the repository: `git clone git@github.com:row-n/rob-tucker.git`
* Install with [npm](https://www.npmjs.com): `npm install`.

## Development Server

In order to see your site in action, run `npm start`. You may need to change the proxy and host settings for Browser Sync within the gulpfile.js.

## Production Build

To create assets outside of a local server, follow below actions:
* `npm run build`

## What's included

Within the download you'll find the following directories, logically grouping common assets. You'll see something like this:

```
rob-tucker
├── assets
│   ├── fonts
│   ├── js
│   └── scss
└── inc
```