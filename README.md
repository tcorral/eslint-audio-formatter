# [eslint](https://github.com/eslint/eslint)-audio-formatter
> Audio formatter/reporter for EsLint to get a mp3 files with all the errors and warnings.

[![NPM Version](http://img.shields.io/npm/v/eslint-audio-formatter.svg?style=flat)](https://npmjs.org/package/eslint-audio-formatter)
[![Build Status](http://img.shields.io/travis/tcorral/eslint-audio-formatter.svg?style=flat)](https://travis-ci.org/tcorral/eslint-audio-formatter)

## Motivation for this module

I decided to use [eslint](https://github.com/eslint/eslint) to verify my code and sadly there was no reporter to mp3.
The idea of this report is to improve the accesibility of this report but not only for people with visual disability.
Once you have the mp3 file you can use other robots:

* Slack
* HipChat
* Twitter
* Twilio...

> The mp3 file is stored in a ```mp3-report-output``` folder at  
> the same root as the folder that contains the analyzed file.

- All the errors are reported in natural language.

TODO - Implement internationalization on messages so that you can listen the messages in your own language.

## Installation

### Dependencies:

* node >= 0.10
* npm >= 2.0.0
* [audiosprite](https://github.com/tonistiigi/audiosprite) >= 0.6.0
* [say.js](https://github.com/marak/say.js) >= 0.9.1

```bash
npm install eslint-audio-formatter --save-dev
```

## Intellij/Webstorm/PhpStorm integration
0. Install `eslint` and `eslint-audio-formatter`.

   ```bash
   npm install -D eslint eslint-audio-formatter
   ```

1. Add a script to your package json like:

   ```javascript
   {
     "scripts": {
       "eslint": "eslint --format 'node_modules/eslint-audio-formatter' file1 file2 dir1/ dir2/",
     }
   }
   ```

   **Note**: In windows you might not need the quotes around the path to the module.

   ```javascript
   {
     "scripts": {
       "eslint": "eslint --format node_modules/eslint-audio-formatter file1 file2 dir1/ dir2/",
     }
   }
   ```
2. Create a external tool to run eslint using this module as your formatter like this
   - program: `npm`
   - parameters: `run eslint`
   - working directory: `$ProjectFileDir$`

3. Use an output filter like: (Please note the 2 spaces before `$FILE_PATH$`)

   ```bash
     $FILE_PATH$.*:$LINE$.*:$COLUMN$
   ```
4. When launching the tool now the output files will be in the same level as the folder 
that contains the analyzed file.  

## Usage

In the command line

```bash
# just make sure you pass the path to the module to the format option of eslint
eslint --format './node_modules/eslint-audio-formatter/index.js' index.js
```

Or as a module

```javascript
var eslint = require('eslint');
var opts = readJson('./path/to/options');

var engine = new eslint.CLIEngine( opts );
var report = engine.executeOnFiles( ['file1.js', 'file2.js'/*, ...*/] );
var results = report.results || [];

var formatter = require('eslint-audio-formatter');
formatter(results);
```

It works with `gulp` and `gulp-eslint`

```javascript
var audioFormatter = require("eslint-audio-formatter");
// Your js task
gulp.task("javascript", function() {
  return gulp.src(["src/js/**/*.js"])
    // Your eslint pipe
    .pipe(eslint(".eslintrc"))
    .pipe(eslint.format(audioFormatter))
    // Continue your other tasks
    .pipe(concat("app.js"))
    .pipe(gulp.dest("dist/js"))
});
```

It should work well in with eslint-grunt or grunt-eslint

```javascript
grunt.initConfig({
    // when using eslint-grunt:
    eslint: {
        options: {
            formatter: './node_modules/eslint-audio-formatter'
        }),
        target1: {
            //..
        }
    },
    // when using grunt-eslint:
    eslint: {
        options: {
            format: './node_modules/eslint-audio-formatter'
        }),
        target2: {
            //..
        }
    }
});
```

To get more information I recommend to read the use cases in tests.

## Formatter parameters

When executed with EsLint we can pass arguments to change the voice and speed.

To pass variables to the formatter you have to add a double dash at the end of the eslint command.

```
eslint --format './node_modules/eslint-audio-formatter' './test/data/with-syntax-errors.js' -- --eaf-voice=Vicki --eaf-speed=1
```

~~Eslint [does not support passing parameters to formatters from the cli](https://github.com/eslint/eslint/issues/2989) yet.So in order
to pass parameters to the formatter we will have to rely on **environment variables**~~

### Command line options

#### --eaf-voice

This option requires one of the available voices in [say.js](https://github.com/marak/say.js/#os-x-notes)

```bash
eslint -f node_modules/eslint-audio-formatter client/**/*.js server/**/*.js -- --eaf-voice=Vicki    # notice the --
```

#### --eaf-speed

This option changes the speed of the speech.

```bash
eslint -f node_modules/eslint-audio-formatter client/**/*.js server/**/*.js -- --eaf-speed=0.65    # notice the --
```

**Important**: don't forget to add the flag at the end and after `-- ` otherwise it will be interpreted as a eslint parameter and will fail as that parameter is not known to eslint.


## Tests

To run the tests with NodeUnit:

```bash
npm install
npm test
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Check that it still works: `npm test`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

0.1.0 - First release.

## License

The MIT License (MIT)

Copyright (c) 2016 Tomás Corral

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
