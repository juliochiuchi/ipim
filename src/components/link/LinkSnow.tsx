import { useEffect } from "react"

interface LinkSnowProps {
  url: string | '/'
  newTab: boolean
  text: string
  classLink?: string
}

export function LinkSnow({ url, newTab, text, classLink }: LinkSnowProps) {
  classLink +=
    ' bg-ipimSnowButton hover:bg-ipimSnowButtonHover rounded-xl text-ipimIndigoLight hover:text-ipimIndigoDark'

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
