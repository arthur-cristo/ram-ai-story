import { Link } from '@chakra-ui/react'

type Props = {
  name: string
  url: string | string[]
}

const FontLink = ({ name, url }: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    const urlsArray = Array.isArray(url) ? url : [url]
    urlsArray.forEach((u) => {
      window.open(u, '_blank', 'noopener,noreferrer')
    })
  }

  return (
    <Link onClick={handleClick} color="primary.light" cursor="pointer" outline="none">
      {name}
    </Link>
  )
}

export default FontLink
