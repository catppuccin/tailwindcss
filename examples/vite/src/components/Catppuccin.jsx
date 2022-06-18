export const Catppuccin = () => {
  return (
    <div id="card" className="from-ctp-mantle to-ctp-crust outline-ctp-pink">
      <h1 className="from-ctp-pink to-ctp-mauve">Catppuccin</h1>
      <p className="text-ctp-subtext0">Soothing pastel theme for TailwindCSS</p>
      <div id="palette">
        <div className="bg-ctp-rosewater"></div>
        <div className="bg-ctp-flamingo"></div>
        <div className="bg-ctp-pink"></div>
        <div className="bg-ctp-mauve"></div>
        <div className="bg-ctp-red"></div>
        <div className="bg-ctp-maroon"></div>
        <div className="bg-ctp-peach"></div>
        <div className="bg-ctp-yellow"></div>
        <div className="bg-ctp-green"></div>
        <div className="bg-ctp-teal"></div>
        <div className="bg-ctp-sky"></div>
        <div className="bg-ctp-sapphire"></div>
        <div className="bg-ctp-blue"></div>
        <div className="bg-ctp-lavender"></div>
      </div>
      <a href="https://github.com/nekowinston/catppuccin-tailwindcss">
        <button className="bg-ctp-lavender hover:bg-ctp-mauve active:bg-ctp-mauve/75">
          Install!
        </button>
      </a>
    </div>
  );
};