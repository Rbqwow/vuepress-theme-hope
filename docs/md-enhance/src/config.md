---
title: Config
icon: gears
order: 2
---

## Plugin Options

You can pass these options to the plugin:

### gfm

- Type: `boolean`
- Default: `false`
- Details:
  - [GFM](./guide/others.md#gfm)

Whether to support full GFM syntax.

::: note

For full GFM syntax, see [GFM](https://github.github.com/gfm/).

Honestly, we do not 100% implement GFM, we only supply its common syntax.

Some of the behavior might be different, for example to support Vue syntax, we are not disallowing `<script>` tags. But in most situation, the behavior should be same.

:::

### tabs

- Type: `boolean`
- Default: `false`
- Details:
  - [Tabs](./guide/content/tabs.md)

Whether to enable tabs.

### codetabs

- Type: `boolean`
- Default: `false`
- Details:
  - [Code Tabs](./guide/code/code-tabs.md)

Whether to enable codetabs.

### align

- Type: `boolean`
- Default: `false`
- Details:
  - [Align](./guide/stylize/align.md)

Whether to enable custom align.

### attrs

- Type: `AttrsOptions | boolean`

  ```ts
  interface AttrsOptions {
    /**
     * left delimiter
     *
     * @default '{'
     */
    left?: string;

    /**
     * right delimiter
     *
     * @default '}'
     */
    right?: string;

    /**
     * allowed attributes
     *
     * @description An empty list means allowing all attribute
     *
     * @default []
     */
    allowed?: (string | RegExp)[];
  }
  ```

- Default: `false`
- Details:
  - [Attrs](./guide/stylize/attrs.md)

Whether to enable attribute customize support.

### sup

- Type: `boolean`
- Default: `false`
- Details:
  - [Superscript](./guide/grammar/sup-sub.md)

Whether to enable the upper format support.

### sub

- Type: `boolean`
- Default: `false`
- Details:
  - [Subscript](./guide/grammar/sup-sub.md)

Whether to enable the lower corner format support.

### footnote

- Type: `boolean`
- Default: `false`
- Enabled in GFM: Yes
- Details:
  - [Footnote](./guide/content/footnote.md)

Whether to enable footnote format support.

### mark

- Type: `boolean`
- Default: `false`
- Details:
  - [Mark](./guide/stylize/mark.md)

Whether to enable mark support.

### tasklist

- Type: `TaskListOptions | boolean`

  ```ts
  interface TaskListOptions {
    /**
     * Whether disable checkbox
     *
     * @default true
     */
    disabled?: boolean;

    /**
     * Whether use `<label>` to wrap text
     *
     * @default true
     */
    label?: boolean;
  }
  ```

- Default: `false`
- Enabled in GFM: Yes
- Details:
  - [Tasklist](./guide/grammar/tasklist.md)

Whether to enable tasklist format support. You can pass an object to config task list.

### include

- Type: `IncludeOptions | boolean`

  ```ts
  interface IncludeOptions {
    /**
     * handle include filePath
     *
     * @default (path) => path
     */
    resolvePath?: (path: string, cwd: string) => string;

    /**
     * Whether deep include files in included Markdown files
     *
     * @default false
     */
    deep?: boolean;
  }
  ```

- Default: `false`
- Details:
  - [Include files](./guide/content/include.md)

Whether to enable Markdown import support. You can pass in a function for path resolution.

### component

- Type: `boolean`
- Default: `false`
- Details:
  - [Component](./guide/content/component.md)

Whether to enable component support

### chart

- Type: `boolean`
- Default: `false`
- Details:
  - [Chart.js](./guide/chart/chartjs.md)

Whether to enable chart support

### echarts

- Type: `boolean`
- Default: `false`
- Details:
  - [ECharts](./guide/chart/echarts.md)

Whether to enable ECharts support

### flowchart

- Type: `boolean`
- Default: `false`
- Details:
  - [Flowchart](./guide/chart/flowchart.md)

Whether to enable flowchart support

### markmap

- Type: `boolean`
- Default: `false`
- Details:
  - [Markmap](./guide/chart/markmap.md)

Whether to enable [Markmap](https://markmap.js.org/) support.

### mermaid

- Type: `boolean`
- Default: `false`
- Enabled in GFM: Yes
- Details:
  - [Mermaid](./guide/chart/mermaid.md)

Whether to enable [Mermaid](https://mermaid.js.org/) support.

### plantuml

- Type: `MarkdownItPlantumlOptions[] | boolean`
- Default: `false`
- Details:
  - [Plantuml](./guide/chart/plantuml.md)

Whether to enable [plantuml](https://plantuml.com/) support.

### spoiler

- Type: `boolean`
- Default: `false`
- Details:
  - [Spoiler](./guide/stylize/spoiler.md)

Whether to enable spoiler support.

### stylize

- Type: `StylizeOptions | false`

  ```ts
  interface StylizeResult {
    /**
     * Tag name
     */
    tag: string;

    /**
     * Attributes settings
     */
    attrs: Record<string, string>;

    /**
     * Tag content
     */
    content: string;
  }

  interface StylizeItem {
    /**
     * Inline token matcher
     */
    matcher: string | RegExp;

    /**
     * Content Replacer
     */
    replacer: (options: {
      tag: string;
      content: string;
      attrs: Record<string, string>;
      env?: MarkdownEnv;
    }) => StylizeResult | void;
  }

  type StylizeOptions = StylizeItem[];
  ```

- Default: `false`
- Details:
  - [Stylize](./guide/stylize/stylize.md)

Stylize inline tokens to create snippet you want.

### playground

- Type: `PlaygroundGlobalOptions`

  ```ts
  interface PlaygroundCodeConfig {
    /**
     * Code block extension
     *
     * @description It's based on filename, not code fence language
     */
    ext: string;

    /** Code block content */
    content: string;
  }

  interface PlaygroundData {
    /** Title of Playground */
    title?: string;

    /**
     * Import map file name
     *
     * @default "import-map.json"
     */
    importMap?: string;

    /** Playground files info */
    files: Record<
      /** File name */
      string,
      /** File detail */
      PlaygroundCodeConfig
    >;

    /**
     * Playground settings
     *
     * @description It's parsed result of json content after setting directive
     */
    settings: Record<string, unknown>;

    /** hash key based on playground content */
    key: string;
  }

  interface PlaygroundOptions {
    /** Playground container name */
    name: string;

    /**
     * Playground component name
     *
     * @default "Playground"
     */
    component?: string;

    /**
     * Props getter
     */
    propsGetter: (data: PlaygroundData) => Record<string, string>;
  }

  interface TSPresetPlaygroundOptions extends CompilerOptions {
    /**
     * external playground service url
     *
     * @default "https://www.typescriptlang.org/play"
     */
    service?: string;
  }

  interface VuePresetPlaygroundOptions {
    /**
     * external playground service url
     *
     * @default "https://sfc.vuejs.org/"
     */
    service?: string;

    /**
     * Whether to use dev version
     *
     * @default false
     */
    dev?: boolean;

    /**
     * Whether to enable SSR
     *
     * @default false
     */
    ssr?: boolean;
  }

  interface UnoPresetPlaygroundOptions {
    /**
     * external playground service url
     *
     * @default "https://unocss.dev/play"
     */
    service?: string;
  }

  type BuiltInPlaygroundPreset = "ts" | "vue" | "unocss";

  interface PlaygroundGlobalOptions {
    /** Playground presets */
    presets: (BuiltInPlaygroundPreset | PlaygroundOptions)[];
    /** Playground config */
    config?: {
      ts?: TSPresetPlaygroundOptions;
      vue?: VuePresetPlaygroundOptions;
      unocss?: UnoPresetPlaygroundOptions;
    };
  }
  ```

- Required: No
- Details:
  - [Playground](./guide/code/playground.md)

Playground options.

### kotlinPlayground

- Type: `boolean`
- Default: `false`
- Details:
  - [Kotlin Playground](./guide/code/kotlin-playground.md)

Whether to enable kotlin playground support.

### vuePlayground

- Type: `boolean`
- Default: `false`
- Details:
  - [Vue Playground](./guide/code/vue-playground.md)

Whether to enable vue playground support.

### demo

- Type: `CodeDemoGlobalOptions | boolean`
- Default: `false`
- Details:
  - [Code Demo](./guide/code/demo/README.md)

Whether to enable code demo support.

#### demo.jsLib

- Type: `string[]`
- Required: No

External JS libraries for CodePen, JsFiddle only.

#### demo.cssLib

- Type: `string[]`
- Required: No

External JS libraries for CodePen, JsFiddle only.

::: warning

The above two options are only used by third-party code demo service, you need to import these libraries in `head` to get it work..

:::

#### demo.jsfiddle

- Type: `boolean`
- Default: `true`

Whether to display the JSFiddle button

#### demo.codepen

- Type: `boolean`
- Default: `true`

Whether to display the CodePen button

#### demo.codepenLayout

- Type: `"top" | "left" | "correct"`
- Default: `"left"`

CodePen editor layout

#### demo.codepenEditors

- Type: `string`
- Default: `"101"`

CodePen editor status

#### others

The following are the library links used by the third-party code demo service. Unless your environment cannot visit unpkg or the speed is slow, you probably don't need to override the default values.

##### demo.babel

Default value: `"https://unpkg.com/@babel/standalone/babel.min.js"`

##### demo.vue

Default value: `"https://unpkg.com/vue/dist/vue.global.prod.js"`

##### demo.react

Default value: `"https://unpkg.com/react/umd/react.production.min.js"`

##### demo.reactDOM

Default value: `"https://unpkg.com/react-dom/umd/react-dom.production.min.js"`

### revealJs

- Type: `RevealJsOptions | boolean`

  ```ts
  type RevealJsPlugin = "highlight" | "math" | "search" | "notes" | "zoom";

  type RevealJsTheme =
    | "auto"
    | "beige"
    | "black"
    | "blood"
    | "league"
    | "moon"
    | "night"
    | "serif"
    | "simple"
    | "sky"
    | "solarized"
    | "white";

  /**
   * reveal.js options
   */
  interface RevealJsOptions {
    /**
     * reveal.js plugins
     *
     * @default []
     */
    plugins?: RevealJsPlugin[];

    /**
     * reveal.js themes
     *
     * @default ["auto"]
     */
    themes?: RevealJsTheme[];
  }
  ```

- Default: `false`
- Details:
  - [Reveal.js](./guide/content/revealjs/README.md)

Whether to enable slides support. You can pass an option to control plugins and themes to import.

### sandpack

- Type: `boolean`
- Default: `false`

Whether to enable sandpack playground support.

### vPre

- Type: `boolean`
- Default: `false`
- Details:
  - [v-pre wrapper](./guide/others.md#v-pre)

Whether to enable v-pre wrapper.

### breaks

- Type: `boolean`
- Default: `false`
- Enabled in GFM: Yes

Whether convert `\n` in paragraphs into `<br>`s

### linkify

- Type: `boolean`
- Default: `false`
- Enabled in GFM: Yes

Whether convert URL-like text into links

### delay

- Type: `number`
- Default: `800`

The delay of operating dom, in ms.

::: tip

If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`.

:::

## Client Config

### defineEChartsConfig

```ts
interface EChartsConfig {
  /**
   * ECharts global options
   */
  option?: EChartsOption;

  /**
   * ECharts setup function
   */
  setup?: () => Promise<void>;
}

const defineEChartsConfig: (config: EChartsConfig) => void;
```

Define global options and setup for ECharts.

### defineMermaidConfig

```ts
const defineMermaidConfig: (options: MermaidConfig) => void;
```

Define config which you want to pass to mermaid.

### defineRevealJsConfig

```ts
const defineRevealJsConfig: (options: RevealOptions) => void;
```

Define config which you want to pass to reveal.js.

### defineKotlinPlaygroundConfig

```ts
interface KotlinPlaygroundOptions {
  server?: string;
  version?: string;

  onChange?: (code: string) => void;
  onRun?: () => void;
  onError?: () => void;
  getJsCode?: (code: string) => void;
  onTestPassed?: () => void;
  onTestFailed?: () => void;
  onOpenConsole?: () => void;
  onCloseConsole?: () => void;
  callback?: (targetNode: HTMLElement, mountNode: HTMLElement) => void;
  getInstance?: (instance: KotlinPlaygroundInstance) => void;
}

const defineKotlinPlaygroundConfig: (options: KotlinPlaygroundOptions) => void;
```

Define config which you want to pass to `kotlin-playground`.

### defineSandpackConfig

```ts
 interface SandpackConfig {
  /**
   * specify the template
   */
  template?: SandpackPredefinedTemplate;

  /**
   * Options to configure the sandpack
   */
  options?: SandpackOptions;

  /**
   * Options to configure the customSetup
   */
  customSetup?: SandpackSetup;
}

const defineSandpackConfig = (config: SandpackConfig)=> void
```

Define config which you want to pass to `sandpack-vue3`.

### defineVuePlaygroundConfig

```ts
export interface VuePlaygroundOptions
  extends Omit<ReplProps, "store" | "editor"> {
  /**
   * Specify the version of vue
   */
  vueVersion?: string;

  /**
   * Specify default URL to import Vue dev runtime from in the sandbox
   *
   * @default "https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js"
   */
  vueRuntimeDevUrl?: string | (() => string);

  /**
   * Specify default URL to import Vue prod runtime from in the sandbox
   *
   * @default "https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.prod.js"
   */
  vueRuntimeProdUrl?: string | (() => string);

  /**
   * Specify default URL to import Vue Server Renderer from in the sandbox
   *
   * @default "https://unpkg.com/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js"
   */
  vueServerRendererUrl?: string | (() => string);
}

const defineVuePlaygroundConfig: (options: VuePlaygroundOptions) => void;
```

Define config which you want to pass to `@vue/repl`.
