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

## Usage

1. Install the plugin

   ```sh
   npm install -D @catppuccin/tailwindcss
   pnpm add -D @catppuccin/tailwindcss
   yarn add -D @catppuccin/tailwindcss
   ```

2. Import the theme in the same file as your `tailwindcss` import

   ```css
   @import "tailwindcss";

   /* 
    Choose between `mocha`, `frappe` or `macchiato` for dark mode, latte is included as the light mode flavour.
    We recommend using `mocha` for dark mode.
   */
   @import "@catppuccin/tailwindcss/mocha.css";
   ```

3. Use it in your markup!

   ```html
   <!-- All colours are prefixed with `ctp` -->
   <body class="bg-ctp-base">
     <h1 class="text-ctp-text">Welcome!</h1>

     <!-- Gradients are supported too -->
     <button
       className="bg-linear-50 from-ctp-red-400 to-ctp-mauve-400 text-ctp-base hover:from-ctp-red hover:to-ctp-mauve"
     >
       Click Here
     </button>

     <!-- 
      Flavour variants are predefined (`latte`, `frappe`, `macchiato`, and `mocha`)
      which allows you to force specific flavours and support custom theme switchers.
     -->
     <div className="latte">
       <p className="bg-ctp-base text-ctp-text">Hello from Latte!</p>
     </div>
   </body>
   ```

Check out some more advanced examples at
[tailwindcss.catppuccin.com](https://tailwindcss.catppuccin.com)!

## 💝 Thanks to

**Current maintainers**

- [lemon](https://github.com/unseen-ninja)

**Previous maintainer(s)**

- [winston](https://github.com/nekowinston)

&nbsp;

<p align="center"><img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true" /></p>
<p align="center">Copyright &copy; 2021-present <a href="https://github.com/catppuccin" target="_blank">Catppuccin Org</a>
<p align="center"><a href="https://github.com/catppuccin/catppuccin/blob/main/LICENSE"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8"/></a></p>
