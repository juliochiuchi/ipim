import { Link } from "@tanstack/react-router"

interface LinkWhiteProps {
  url: string | '/'
  newTab: boolean
  text: string
  classLink?: string
}

export function LinkWhite({ url, newTab, text, classLink }: LinkWhiteProps) {
  const classes = `${classLink ?? ''} border border-ipimIndigoLight bg-white rounded text-ipimIndigoLight`
  const isInternalRoute = url.startsWith('/') && !newTab

  if (isInternalRoute) {
    return (
      <Link to={url} className={classes}>
        {text}
      </Link>
    )
  }

  return (
    <a href={url} target={newTab ? "_blank" : "_self"} rel={newTab ? "noreferrer" : undefined} className={classes}>
      {text}
    </a>
  )
}
