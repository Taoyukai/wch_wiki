// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'wch wiki',
  tagline: 'wch IC data collation, unofficial',
  url: 'https://wch.wiki',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/wch_logo.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Taoyukai', // Usually your GitHub org/user name.
  projectName: 'wch_wiki', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans','en',],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'), 
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'wch_wiki',
        logo: {
          alt: 'My Site Logo',
          src: 'img/wch_logo.png',
        },
        items: [
            {
            type: 'doc',
            docId: 'RISCV/risc-v??????',
            position: 'left',
            label: 'RISC-V',
            },
            {
                type: 'doc',
                docId: 'MCU+/MCU+??????',
                position: 'left',
                label: 'MCU+',
            },
            {
                type: 'doc',
                docId: 'OpenSourceProjects/Open Source Projects??????',
                position: 'left',
                label: 'Open Source Projects',
            },
          
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/Taoyukai',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        // links: [
        //   {
        //     title: 'official website',
        //     items: [
        //       {
        //         label: 'wch',
        //         href: 'http://www.wch-ic.com/',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'order',
        //     items: [
        //       {
        //         label: 'LCSC',
        //         href: 'https://lcsc.com/brand-detail/271.html',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'More',
        //     items: [
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/openwch',
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright ?? ${new Date().getFullYear()} taoyukai, Inc. Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">	???ICP???17052473???-4</a></p>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },

      colorMode: {
        defaultMode: 'dark',
      },
    }),

    themes: [
        // ... Your other themes.
        [
          require.resolve("@easyops-cn/docusaurus-search-local"),
          {
            // ... Your options.
            // `hashed` is recommended as long-term-cache of index file is possible.
            hashed: true,
            language: ["en", "zh"],
            highlightSearchTermsOnTargetPage: true,
            explicitSearchResultPath: true,
            // For Docs using Chinese, The `language` is recommended to set to:
            // ```
            // language: ["en", "zh"],
            // ```
          },
        ],
      ],
};

module.exports = config;
