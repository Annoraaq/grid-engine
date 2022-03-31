---
title: Getting Started
parent: Tutorials
nav_order: 2
---

# Getting Started

Welcome to our Getting Started tutorial that aims to provide you a step by step guide to set up your first GridEngine project.

## Setting up a Phaser Game

The first thing to do is setting up a Phaser game.
If you are completely new to Phaser it might be a good idea to check out the official [Getting Started with Phaser 3](https://phaser.io/tutorials/getting-started-phaser3) guide.

In order to run our Phaser app you will need to be able to serve it with a local web server. In this tutorial we use [http-server](https://github.com/http-party/http-server). It is a _simple, zero-configuration command-line http server_.

We will install it globally via npm: `npm install --global http-server`. If you don't have npm installed you can find other ways to install http-server in their documentation.

Let's now create an empty Phaser game.

1. Create a directory at a location of your choice with the name `grid-engine-getting-started`.

2. Within that directory create 2 empty files: `index.html` and `game.js`.

3. [Download Phaser](https://phaser.io/download/stable) and place the `phaser.min.js` file into our directory.

4. Copy the following into `index.html`:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <title>GridEngine - Getting Started</title>
       <script src="phaser.min.js"></script>
     </head>
     <body></body>
   </html>
   ```

5. Copy the following into `game.js`:

   ```javascript
   const config = {
     type: Phaser.AUTO,
     width: 800,
     height: 600,
     scene: {
       preload: preload,
       create: create,
       update: update,
     },
   };

   const game = new Phaser.Game(config);

   function preload() {}

   function create() {}

   function update() {}
   ```

6. Open a terminal window and navigate to our directory `grid-engine-getting-started`. If you run `http-server` now, you should be able to open our empty Phaser game in the browser at: [http://127.0.0.1:8080/](http://127.0.0.1:8080/). It will only show a black empty canvas on a white background.

## Adding GridEngine
