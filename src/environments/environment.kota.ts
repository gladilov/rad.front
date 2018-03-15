// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiBaseUrl: 'http://api.gl.local/v2/',
  apiBaseUrl: 'http://etp_base.local',
  gmaps: {
    apiKey: 'AIzaSyDOHWdM430kZKJK0n1kySk0vQwVWiyG5es',
    lat: 59.892882,
    lng: 30.320176,
    zoom: 10
  }
};
