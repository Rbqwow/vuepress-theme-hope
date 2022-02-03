import { fs, path } from "@vuepress/utils";

import type { Plugin, PluginConfig } from "@vuepress/core";
import type { SassPaletteOptions } from "../shared";

const emptyFile = path.resolve(__dirname, "../../styles/empty.scss");

export const sassPalettePlugin: Plugin<SassPaletteOptions> = (
  {
    id = "hope",
    config = `.vuepress/styles/${id}-config.scss`,
    defaultConfig = path.resolve(__dirname, "../../styles/default/config.scss"),
    palette = `.vuepress/styles/${id}-palette.scss`,
    defaultPalette = path.resolve(
      __dirname,
      "../../styles/default/palette.scss"
    ),
    style = `.vuepress/styles/${id}-style.scss`,
  },
  app
) => {
  const userConfig = app.dir.source(config);
  const userPalette = app.dir.source(palette);
  const userStyle = app.dir.source(style);
  const getPath = (path: string): string =>
    fs.pathExistsSync(path) ? path : emptyFile;

  return {
    name: `vuepress-plugin-sass-palette?${id}`,

    alias: {
      [`@${id}/palette`]: app.dir.temp(`sass-palette/${id}-palette.scss`),
      [`@${id}/config`]: app.dir.temp(`sass-palette/${id}-config.scss`),
      [`@${id}/helper`]: path.resolve(__dirname, "../../styles/helper.scss"),
      [`@${id}/style`]: app.dir.temp(`sass-palette/${id}-style.scss`),
    },

    onInitialized: (): Promise<string> => {
      return app.writeTemp(
        `sass-palette/load-${id}.js`,
        `
export default ()=>{
  import("@${id}/palette");
};
`
      );
    },

    onPrepared: () =>
      Promise.all([
        app.writeTemp(
          `sass-palette/${id}-config.scss`,
          `
@import "${getPath(defaultPalette)}";
@import "${getPath(defaultConfig)}";
@import "${getPath(userPalette)}";
@import "${getPath(userConfig)}";
`
        ),
        app.writeTemp(
          `sass-palette/${id}-palette.scss`,
          `
@use 'sass:color';
@use 'sass:list';
@use 'sass:math';
@use 'sass:map';
@use 'sass:meta';

@use '@${id}/helper';
@use '@${id}/config' as config;
@use '${getPath(defaultPalette)}' as defaultPalette;
@use '${getPath(palette)}' as palette;

$defaultVariables: meta.module-variables("defaultPalette");
$userVariables: meta.module-variables("palette");

$variables: map.deep-merge($defaultVariables, $userVariables);

@each $name, $value in $variables {
  $key: helper.camel-to-kebab($name);

  // simple length
  @if meta.type-of($value) == number or meta.type-of($value) == string {
    :root {
      #{$key}: #{$value};
    }
  } @else if helper.color-islegal($value) {
    @include helper.inject-color($key, $value, $darkSelector: config.$darkSelector);
  }
}
`
        ),
        app.writeTemp(
          `sass-palette/${id}-style.scss`,
          `@forward "${getPath(userStyle)}";
`
        ),
      ]),

    clientAppEnhanceFiles: app.dir.temp(`sass-palette/load-${id}.js`),
  };
};

export const sassPalette = (
  options: SassPaletteOptions | false
): PluginConfig<SassPaletteOptions> => [sassPalettePlugin, options];
