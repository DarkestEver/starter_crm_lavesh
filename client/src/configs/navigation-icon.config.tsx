import {
    HiBookOpen,
    HiDocumentText,
    HiOutlineHome,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    blog: <HiDocumentText />,
    cms: <HiBookOpen />,
}

export default navigationIcon
