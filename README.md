# Letterpress clone

Hello, to play animations, first build the animation by calling 
```
app.build(animation[index]);
```

Then run the animation by calling 
```
app.run(animation[index]);
```

To clear the animation call

```
app.teardown(animation[index]);
```

with the index of the animation you wish to clear.
Valid indexes of animations are 1 and 2.

##Dependencies

*note*, the runtime environment needs to have a Promise constructor in the global scope. Chrome is the only browser this was tested in.

It is actually quite simple really

First make sure you have node.js, grunt-cli, and bower installed.

```
brew install node
npm install -g grunt-cli bower
```

If you are installing node for the fist time you will most likely need to add npm to your path

```
$ export PATH="/usr/local/share/npm/bin:$PATH"
```

You will probably want to add that to you .bash_profile.  I'll assume if you are using any other shell that you know what you are doing already :P

##Getting Started

```
npm install && bower install
```

That's it!!!

##Running the Development Server

Simply run ```grunt serve``` and you will start a local development server and open Chrome.  Watch tasks will be running, and your browser will be automatically refreshed whenever a file in the repo changes.

You can run serve with ```--port=9001``` to manually pick the port that the server will run on

## Release History
 * 2014-04-20   v0.1.0   Generated by the [Yeoman Generator](https://github.com/famous/generator-famous) for [Famo.us](http://famo.us)
