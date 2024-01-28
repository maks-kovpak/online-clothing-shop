// @ts-check

/** @type {import('syncpack').RcFile} */
const config = {
  sortFirst: [
    'name',
    'description',
    'version',
    'private',
    'license',
    'type',
    'author',
    'repository',
    'scripts',
    'workspaces',
  ],
  semverGroups: [
    {
      range: '',
      dependencyTypes: ['prod', 'resolutions', 'overrides', 'pnpmOverrides', 'local'],
      dependencies: ['**'],
      packages: ['**'],
    },
    {
      range: '~',
      dependencyTypes: ['dev'],
      dependencies: ['**'],
      packages: ['**'],
    },
    {
      range: '^',
      dependencyTypes: ['peer'],
      dependencies: ['**'],
      packages: ['**'],
    },
  ],
};

module.exports = config;
