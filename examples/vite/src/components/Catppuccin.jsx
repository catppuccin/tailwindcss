import { Color } from "./Color"

const colors = [
  "rosewater",
  "flamingo",
  "pink",
  "mauve",
  "red",
  "maroon",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
]

export const Catppuccin = () => {
  return (
    <div id="card" className="from-mantle to-crust outline-pink">
      <h1 className="from-pink to-mauve">Catppuccin</h1>
      <p className="text-subtext0">Soothing pastel theme for TailwindCSS</p>
      <div id="palette">
        {colors.map(color => (
          <Color color={color} key={color} />
        ))}
      </div>
      <a href="https://github.com/catppuccin/tailwindcss">
        <button className="bg-lavender hover:bg-mauve active:bg-mauve/75">
          Install!
        </button>
      </a>
    </div>
  );
};
