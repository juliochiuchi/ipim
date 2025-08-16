import { useEffect } from "react"

interface LinkIndigoProps {
  url: string | '/'
  newTab: boolean
  text: string
  classLink?: string
}

export function LinkIndigo({ url, newTab, text, classLink }: LinkIndigoProps) {
  classLink +=
    ' rounded-xl bg-ipimIndigoLight text-ipimWhiteSnowforButton hover:bg-ipimIndigoDark hover:text-white'

  let targetTab: string = "_self"
  
  useEffect(() => {
    if (newTab) targetTab = "_blank"
  }, [])

  return (
    <a href={url} target={targetTab} className={classLink}>
      {text}
    </a>
  )
}
