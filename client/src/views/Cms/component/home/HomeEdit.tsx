import { Suspense, lazy, useEffect, useState } from 'react'
import reducer, { fetchHome, useAppDispatch, useAppSelector } from './store'

import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import { SLICE_NAME } from './store/homeSlice'
import Tabs from '@/components/ui/Tabs'
import { injectReducer } from '@/store'

const HeroSection = lazy(() => import('./HeroSection'))
const MiddleSection = lazy(() => import('./MiddleSection'))
const Extras = lazy(() => import('./Extras'))
const Seo = lazy(() => import('./Seo'))

const { TabNav, TabList } = Tabs
injectReducer(SLICE_NAME,reducer)

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
    const dispatch = useAppDispatch();
    const homeData = useAppSelector(state => state.home.data.homeData)
    useEffect(() => {
        dispatch(fetchHome())
    },[dispatch])

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
                            <HeroSection data={homeData.heroSection} homeId={homeData._id} />
                        )}
                        {currentTab === 'middleSection' && (
                            <MiddleSection data={homeData.middleSection} homeId={homeData._id} />
                        )}
                        {currentTab === 'extras' && (
                            <Extras data={homeData.extras} homeId={homeData._id} />
                        )}
                        {currentTab === 'seo' && (
                            <Seo data={homeData.seo} homeId={homeData._id} />
                        )}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}


export default heroSectionEdit