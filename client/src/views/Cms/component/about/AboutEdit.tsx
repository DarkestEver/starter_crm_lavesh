import { Suspense, lazy, useEffect, useState } from 'react'
import reducer, { fetchAbout, useAppDispatch, useAppSelector } from './store'

import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import { SLICE_NAME } from "./store/aboutSlice"
import Tabs from '@/components/ui/Tabs'
import { injectReducer } from '@/store'

const About = lazy(() => import('./AboutContent'))
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
    about: { label: 'About', path: 'about' },
    seo: { label: 'Seo', path: 'seo' },
}


const AboutEdit = () => {
    const [currentTab, setCurrentTab] = useState('about')
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.about.data.aboutData)
    useEffect(() => {
        dispatch(fetchAbout())
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
                        {currentTab === 'about' && (
                            <About data={data} />
                        )}
                        {currentTab === 'seo' && (
                            <Seo data={data.seo} aboutId={data._id} />
                        )}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}


export default AboutEdit