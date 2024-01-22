
create a MFE project:

step 1: create workspace
command:ng new workspace --create-application="false"

step 2: create a folder named projects inside the workspace

step 3: create host and mfe projects inside projects folder
command: ng g application host --routing=true --style=css
         ng g application mfe  --routing=true --style=css

step 4: npm i @angular-architects/module-federation@latest --- if u use latest angular cli 
					(or)
	  npm i @angular-architects/module-federation@~14.3.2 --- give like this version specific of ur angular version, if ur not using latest angular

NOTE:always ensure which angular module federation version is acception or in console it'll throw 
"CLI only compatible in this angular version x.x but found y.y" such error will be thrown , remember at that time ,
 angular mfe version needs to be the perfect version which will compile in ur local machine's angular version       

step 5: add module federations for each projects
command: ng add @angular-architects/module-federation --project=host ---> it'll ask for port number : give 4200 (or) as ur wish
command: ng add @angular-architects/module-federation --project=mfe ---> it'll ask for port number : give 4201 (or) as ur wish
        

step 6: add feature modules for the projects
command: ng g m host-feature --routing (if required)
         ng g m mfe-feature --routing

step 7: 
configure webpack.config file

webpack.config - host
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: "host",
  remotes: {
  "mfe": 'http://localhost:4201/mferemoteEntry.js',
  },
  shared: shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  sharedMappings: ['air-auth-lib'],

});

webpack.config - mfe

const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: "mfe",
  filename: "mferemoteEntry.js",
  exposes: {
    './mfegateway': './projects/mfe/src/app/mfegatewaymodule/mfegatewaymodule.module.ts',
  },
  shared: shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),

  sharedMappings: ['air-auth-lib'],
});

step 8:
add new file named decl.d.ts file 
inside the file import the gateway of mfe
'declare module 'mfe/mfegateway';'


step 8 :
configure routing
EX : 
host :
const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  { path: 'designguidelines', loadChildren: () => import('mfe/mfegateway').then((m) => { return m.MfegatewaymoduleModule; })},
];

remote:
const routes: Routes = [
   { path: '', redirectTo: '/mfe', pathMatch: 'full' },
  { path: 'mfe', loadChildren: () => import("./mfegatewaymodule/mfegatewaymodule.module").then((m) => m.MfegatewaymoduleModule) }
];


step 9: ng serve host
        ng serve mfe
		
	








