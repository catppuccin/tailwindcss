<h3 align="center">
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="100" alt="Logo"/><br/>
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
	Catppuccin for <a href="https://github.com/tailwindlabs/tailwindcss">TailwindCSS</a>
	<img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="30" width="0px"/>
</h3>

<p align="center">
    <a href="https://github.com/catppuccin/tailwindcss/stargazers"><img src="https://img.shields.io/github/stars/catppuccin/tailwindcss?colorA=363a4f&colorB=b7bdf8&style=for-the-badge"></a>
    <a href="https://github.com/catppuccin/tailwindcss/issues"><img src="https://img.shields.io/github/issues/catppuccin/tailwindcss?colorA=363a4f&colorB=f5a97f&style=for-the-badge"></a>
    <a href="https://github.com/catppuccin/tailwindcss/contributors"><img src="https://img.shields.io/github/contributors/catppuccin/tailwindcss?colorA=363a4f&colorB=a6da95&style=for-the-badge"></a>
</p>

<p align="center">
  <img src="./assets/sample.png"/>
</p>

## Preview

You can check out one of our deployed examples
[here](https://tailwindcss.catppuccin.com)!

## Usage

1. Install the plugin

```sh
$ npm install -D @catppuccin/tailwindcss
# --- or ---
$ yarn add -D @catppuccin/tailwindcss
```

2. Configure your `tailwind.config.js`

```js
module.exports = {
  // ...other settings
  plugins: [require("@catppuccin/tailwindcss")],
};
```

3. _Optional:_ customize the plugin

```js
module.exports = {
  // ...other settings
  plugins: [
    require("@catppuccin/tailwindcss")({
      // prefix to use, e.g. `text-pink` becomes `text-ctp-pink`.
      // default is `false`, which means no prefix
      prefix: "ctp",
      // which flavour of colours to use by default, in the `:root`
      defaultFlavour: "latte",
    }),
  ],
};
```

4. Use it in your markup!

```html
<!-- switching the class for parent elements changes the flavour! -->
<body class="frappe">
  <h1 class="bg-base text-pink">Hello world!</h1>
</body>
```

You can find examples for Next.js, Svelte, and Vite in the `examples` folder.

## 💝 Thanks to

- [winston](https://github.com/nekowinston)
- [Adal Zanabria](https://github.com/AdalZanabria)

&nbsp;

<p align="center"><img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true" /></p>
<p align="center">Copyright &copy; 2021-present <a href="https://github.com/catppuccin" target="_blank">Catppuccin Org</a>
<p align="center"><a href="https://github.com/catppuccin/catppuccin/blob/main/LICENSE"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8"/></a></p>
