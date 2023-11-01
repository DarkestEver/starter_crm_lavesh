import { Suspense, lazy, useState } from 'react'

import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import Tabs from '@/components/ui/Tabs'

const About = lazy(() => import('./AboutContent'))
const Seo = lazy(() => import('../common/Seo'))

const { TabNav, TabList } = Tabs


const settingsMenu: Record<
    string,
    {
        label: string
        path: string
    }
> = {
    about: { label: 'About', path: 'about' },
    seo: { label: 'Seo', path: 'seo' },
}


const AboutEdit = () => {
    const [currentTab, setCurrentTab] = useState('about')


    const onTabChange = (val: string) => {
        setCurrentTab(val)
    }


    return (
        <Container className='mt-2'>
            <AdaptableCard>
                <Tabs variant='pill' value={currentTab} onChange={(val) => onTabChange(val)}>
                    <TabList>
                        {Object.keys(settingsMenu).map((key) => (
                            <TabNav key={key} value={key}>
                                {settingsMenu[key].label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
                <div className="px-4 py-6">
                    <Suspense fallback={<></>}>
                        {currentTab === 'about' && (
                            <About  />
                        )}
                        {currentTab === 'seo' && (
                            <Seo />
                        )}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}


export default AboutEdit