import { Link } from '@chakra-ui/react'

type Props = {
  name: string
  url: string
}

const FontLink = ({ name, url }: Props) => (
  <Link href={url} target="_blank" color="primary.light" outline="none">
    {name}
  </Link>
)

export default FontLink
