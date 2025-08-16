import { useEffect } from "react"

interface LinkWhiteProps {
  url: string | '/'
  newTab: boolean
  text: string
  classLink?: string
}

export function LinkWhite({ url, newTab, text, classLink }: LinkWhiteProps) {
  classLink +=
    ' border border-ipimIndigoLight bg-white rounded text-ipimIndigoLight'

  let targetTab: string = '_self'
  
  useEffect(() => {
    if (newTab) targetTab = "_blank"
  }, [])

  return (
    <a href={url} target={targetTab} className={classLink}>
      {text}
    </a>
  )
}
