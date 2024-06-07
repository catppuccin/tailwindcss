import { useState } from "react";
import { $theme, } from "./store/theme";
import { useAtom } from "jotai";
import { ThemeButton, Catppuccin } from "./components";

const themeButtons = [
  {
    value: 1,
    theme: "latte",
    label: "Latte",
    className: "navbutton-left"
  },
  {
    value: 2,
    theme: "frappe",
    label: "Frappe",
    className: "navbutton-center"
  },
  {
    value: 3,
    theme: "macchiato",
    label: "Macchiato",
    className: "navbutton-center"
  },
  {
    value: 4,
    theme: "mocha",
    label: "Mocha",
    className: "navbutton-right"
  }
]

const year = (new Date()).getFullYear()

function App() {
  const [theme, setTheme] = useAtom($theme);
  const [toggleActive, setToggleActive] = useState(1);

  const toggleNav = index => setToggleActive(index);

  return (
    <div className={`App min-h-screen grid ${theme}`}>
      <main className="flex flex-col justify-center items-center bg-gradient-to-b from-base to-crust p-6">
        <div className="flex mb-6 px-4 py-2 rounded-xl text-text">
          {themeButtons.map(({ label, value, theme, className }) => (
            <ThemeButton
              key={theme}
              isActive={toggleActive === value}
              onClick={() => {
                setTheme(theme);
                toggleNav(value);
              }}
              className={className}
            >
              {label}
            </ThemeButton>
          ))}
        </div>

        <Catppuccin />
      </main>

      <footer className="w-full bg-pink/50 text-center p-4 font-semibold text-overlay1">
        Copyright © {year}-present Catppuccin Org
      </footer>
    </div>
  );
}

export default App;


