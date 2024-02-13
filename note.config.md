 == **Create Bundle with webpack** ==
 * Install Dependencies in below as Development 
  "devDependencies": {
    "@babel/core": "^7.23.7",
    "@babel/preset-env": "^7.23.7",
    "babel-loader": "^9.1.3",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4"
  }
* create file webpack.config.js 
* create file .babelrc

== **file .eslintrc.json** : There are many method for check code ==
* install eslint in devDependencies
* set script in package.js => "lint": "eslint src/** --fix"
* run => npm run lint

== **Configure Alaises** ==
* install dependency module-alias
* set values for _moduleAliases in package.json 
* import module-alias 
  require('module-alias/register'); // need import module-alias to the top
