import { Link } from "@tanstack/react-router"

interface LinkIndigoProps {
  url: string | '/'
  newTab: boolean
  text: string
  classLink?: string
}

export function LinkIndigo({ url, newTab, text, classLink }: LinkIndigoProps) {
  const classes = `${classLink ?? ''} rounded-xl bg-ipimIndigoLight text-ipimWhiteSnowforButton hover:bg-ipimIndigoDark hover:text-white`
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
