const gulp = require('gulp');
require('./gulp/font-icons/font-icons')(gulp);
require('./gulp/declarations/declarations')(gulp);
require('./gulp/release/release')(gulp);