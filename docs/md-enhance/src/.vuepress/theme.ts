import { theme } from "docs-shared";
import { getDirname, path } from "vuepress/utils";

import { enNavbar, zhNavbar } from "./navbar.js";
import { enSidebar, zhSidebar } from "./sidebar.js";

const __dirname = getDirname(import.meta.url);

export default theme("md-enhance", {
  locales: {
    "/": {
      navbar: enNavbar,
      sidebar: enSidebar,
    },

    "/zh/": {
      navbar: zhNavbar,
      sidebar: zhSidebar,
    },
  },

  plugins: {
    components: {
      components: ["Badge", "VPCard"],
    },

    markdownImage: {
      figure: true,
      lazyload: true,
    },

    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      component: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      include: {
        resolvePath: (file) => {
          if (file.startsWith("@echarts"))
            return file.replace(
              "@echarts",
              path.resolve(__dirname, "../echarts"),
            );

          return file;
        },
      },
      kotlinPlayground: true,
      mark: true,
      markmap: true,
      mermaid: true,
      plantuml: true,
      playground: {
        presets: ["ts", "vue", "unocss"],
      },
      revealJs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
        themes: [
          "auto",
          "beige",
          "black",
          "blood",
          "league",
          "moon",
          "night",
          "serif",
          "simple",
          "sky",
          "solarized",
          "white",
        ],
      },
      sandpack: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({
            tag,
          }): {
            tag: string;
            attrs: Record<string, string>;
            content: string;
          } | void => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
