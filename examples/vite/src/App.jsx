import { useState } from "react";
import { Catppuccin } from "./components/Catppuccin";

function App() {
  const [theme, setTheme] = useState("");
  const [toggleActive, setToggleActive] = useState(1);

  const toggleNav = (index) => {
    setToggleActive(index);
  };
  return (
    <div className={`App min-h-screen grid ${theme}`}>
      <main
        className="flex flex-col justify-center items-center bg-gradient-to-b from-ctp-base to-ctp-crust p-6"
      >
        <div className="flex mb-6 px-4 py-2 rounded-xl text-ctp-text">
          <button
            onClick={() => {
              setTheme("");
              toggleNav(1);
            }}
            className={
              toggleActive === 1
                ? "navbutton-left bg-ctp-pink/50"
                : "navbutton-left bg-ctp-overlay0/50"
            }
          >
            Latte
          </button>
          <button
            onClick={() => {
              setTheme("ctp-frappe");
              toggleNav(2);
            }}
            className={
              toggleActive === 2
                ? "navbutton-center bg-ctp-pink/50"
                : "navbutton-center bg-ctp-overlay0/50"
            }
          >
            Frappe
          </button>
          <button
            onClick={() => {
              setTheme("ctp-macchiato");
              toggleNav(3);
            }}
            className={
              toggleActive === 3
                ? "navbutton-center bg-ctp-pink/50"
                : "navbutton-center bg-ctp-overlay0/50"
            }
          >
            Macchiato
          </button>
          <button
            onClick={() => {
              setTheme("ctp-mocha");
              toggleNav(4);
            }}
            className={
              toggleActive === 4
                ? "navbutton-right bg-ctp-pink/50"
                : "navbutton-right bg-ctp-overlay0/50"
            }
          >
            Mocha
          </button>
        </div>

        <Catppuccin />
      </main>

      <footer className="w-full bg-ctp-pink/50 text-center p-4 font-semibold text-ctp-overlay1">
        Copyright © 2021-present Catppuccin Org
      </footer>
    </div>
  );
}

export default App;
