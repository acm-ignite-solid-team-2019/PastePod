# Developing
Documentation for running the app locally and getting an IDE set up with it.

## Building
Install git, Node, and NPM.

1. Clone the repo 
   `$ git clone -b prototype/initial https://github.com/evanwsun/solid-ignite.git`
   Note that this specifically clones and checks out `prototype/initial`. This may not be required in the future.
2. Install the required dependencies
   `$ npm install`
   This will take some time.
3. Run the local web server
   `$npm start`

## IDE Setup
I prefer JetBrains [Webstorm](https://www.jetbrains.com/webstorm/) for web development. If you prefer something else, that's fine. Feel free to extend this documentation for your setup!

1. Launch WebStorm and select "Open"
2. Navigate to where you cloned the repo and click ok
3. Give it some time to index
4. In the top right, click "Add Configuration..."
5. Click the "+" and select "npm"
6. For "package.json" select `./package.json` (you'll probably have to put the full path, it might autocomplete it)
7. For "Command" select `run`
8. For "Scripts" select `start`
9. Click Ok

Now when you click run button (Green arrow), it should start the local web server like `npm start` did (make sure you don't have another one running already!).