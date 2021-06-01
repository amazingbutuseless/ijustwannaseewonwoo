const appBundleId = 'com.amazingbutuseless.ijustwannaseewonwoo';

module.exports = {
  packagerConfig: {
    name: 'ijustwannaseewonwoo',
    excutableName: 'ijustwannaseewonwoo',
    icon: './cat_icon.png',
    appBundleId,
    protocols: [
      {
        name: 'ijustwannaseewonwoo Launch Protocol',
        schemes: ['ijustwannaseewonwoo'],
      },
    ],
    osxSign: {
      identity: 'Developer ID Application: Kyungai Lee (4VJ488L9PP)',
      'gatekeeper-assess': false,
      hardenedRuntime: true,
      entitlements: './entitlements.plist',
      'entitlements-inherit': './entitlements.plist',
      'signature-flags': 'library',
    },
    osxNotarize: {
      appBundleId,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
    },
    platforms: ['darwin', 'win32'],
  },
  makers: [
    {
      name: '@electron-forge/maker-dmg',
    },
    {
      name: '@electron-forge/maker-zip',
      config: {
        platforms: ['darwin'],
      },
    },
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: {
        exe: 'ijustwannaseewonwoo.exe',
        description: '원우가 나오는 유튜브 비디오 장면 모아보기',
        setupIcon: './cat_icon.ico',
      },
    },
  ],
  publisher: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'amazingbutuseless',
          name: 'ijustwannaseewonwoo-collector',
        },
        prerelease: true,
      },
      draft: true,
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/renderer.tsx',
              name: 'main_window',
            },
            {
              html: './src/worker.html',
              js: './src/worker.tsx',
              name: 'worker_window',
            },
          ],
        },
        port: 3001,
      },
    ],
  ],
};
