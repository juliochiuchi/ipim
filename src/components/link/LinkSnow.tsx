import { Link } from "@tanstack/react-router"

interface LinkSnowProps {
  url: string | '/'
  newTab: boolean
  text: string
  classLink?: string
}

export function LinkSnow({ url, newTab, text, classLink }: LinkSnowProps) {
  const classes = `${classLink ?? ''} bg-ipimSnowButton hover:bg-ipimSnowButtonHover rounded-xl text-ipimIndigoLight hover:text-ipimIndigoDark`
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
