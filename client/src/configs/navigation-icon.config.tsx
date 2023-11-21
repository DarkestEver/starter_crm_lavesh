import { FaGlobe } from 'react-icons/fa'
import {
    HiOutlineHome,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    cms: <FaGlobe />,
}

export default navigationIcon
