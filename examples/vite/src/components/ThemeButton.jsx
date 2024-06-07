const ThemeButton = ({ isActive, className = "", ...props }) => (
  <button
    {...props}
    className={` ${isActive ? " bg-pink/50 " : " bg-overlay0/50 "} ${className} `}
  />
)


// navbutton-center
export { ThemeButton }
