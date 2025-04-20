import colors from "@catppuccin/palette"
import { $theme } from "../store/theme"
import toast from "react-hot-toast"
import { CheckmarkIcon } from "react-hot-toast"
import { ClipBoardIcon } from "./ClipBoardIcon"
import { useAtom } from "jotai"
import { useState } from "react"

const copyText = (text) => window.navigator.clipboard.writeText(text)

const capitalize = (text) => {
  const arr = text.split(" ")
  const s = []
  arr.forEach((t) => {
    const str = t.slice(0, 1).toUpperCase() + t.slice(1, t.length)
    s.push(str)
  })

  return s.join(" ")
}

const Color = (props) => {
  const [c, setC] = useState(false)
  const [currTheme] = useAtom($theme);

  const currColor = props.color ?? "rosewater"
  const hexColor = (colors.variants[currTheme][currColor ?? "rosewater"]).hex

  const onClick = hexColor => {
    setC(true)
    toast.success(capitalize(`${currTheme} ${currColor} Copied to Clipboard`))
    copyText(hexColor)
    setTimeout(() => setC(false), 1000)
  }

  return (
    <button
      {...props}
      style={{ background: hexColor }}
      className="w-10 h-10 flex items-center justify-center rounded-full !p-0 group"
      onClick={() => onClick(hexColor)}
    >
      {c ? <CheckmarkIcon /> : <ClipBoardIcon className="group-hover:block size-6 hidden" />}
    </button>
  )
}

export { Color }
