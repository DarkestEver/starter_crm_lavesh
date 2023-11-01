import { Suspense, lazy, useState } from 'react'

import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import Tabs from '@/components/ui/Tabs'

const HeroSection = lazy(() => import('./HeroSection'))
const MiddleSection = lazy(() => import('./MiddleSection'))
const Extras = lazy(() => import('./Extras'))
const Seo = lazy(() => import('../common/Seo'))

const { TabNav, TabList } = Tabs


const settingsMenu: Record<
    string,
    {
        label: string
        path: string
    }
> = {
    heroSection: { label: 'Hero Section', path: 'heroSection' },
    middleSection: { label: 'Middle Section', path: 'middleSection' },
    extras: { label: 'Extras', path: 'extras' },
    seo: { label: 'Seo', path: 'seo' },
}


const heroSectionEdit = () => {
    const [currentTab, setCurrentTab] = useState('heroSection')

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
                        {currentTab === 'heroSection' && (
                            <HeroSection  />
                        )}
                        {currentTab === 'middleSection' && (
                            <MiddleSection  />
                        )}
                        {currentTab === 'extras' && (
                            <Extras  />
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


export default heroSectionEdit