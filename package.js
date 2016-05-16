Package.describe({
  name: 'settlin:astronomy-meta-behavior',
  version: '2.0.0',
  summary: 'Meta behavior for Meteor Astronomy',
  git: 'https://github.com/settlin/meteor-astronomy-meta-behavior.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');

  api.use([
    'ecmascript',
    'es5-shim',
    'jagi:astronomy@2.0.0'
  ], ['client', 'server']);

  api.mainModule('lib/main.js', ['client', 'server']);
});
