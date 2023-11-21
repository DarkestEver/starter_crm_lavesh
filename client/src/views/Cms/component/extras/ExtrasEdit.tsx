import { SLICE_NAME, fetchBlockGuide } from "./store/extrasSlice";
import { Suspense, lazy, useState } from 'react'
import reducer, { fetchNewsletter, useAppDispatch, useAppSelector } from "./store";

import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import Tabs from '@/components/ui/Tabs'
import { injectReducer } from "@/store";
import { useEffect } from 'react';

injectReducer(SLICE_NAME,reducer)

const Newsletter = lazy(() => import('./Newsletter'))
const BlockGuide = lazy(() => import('./BlockGuide'))


const { TabNav, TabList } = Tabs

const settingsMenu: Record<
    string,
    {
        label: string
        path: string
    }
> = {
    newsletter: { label: 'Newsletter', path: 'newsletter' },
    blockGuide: { label: 'BlockGuide', path: 'blockGuide' },
}

const ExtrasEdit = () => {
    const [currentTab, setCurrentTab] = useState('newsletter')
    const dispatch = useAppDispatch();
    const newsletterData = useAppSelector(state => state.extras.data.extrasNewsletterData)
    const blockGuideData = useAppSelector(state => state.extras.data.extrasBlockGuideData)

    useEffect(() => {
        dispatch(fetchNewsletter())
        dispatch(fetchBlockGuide())
    },[])

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
                        {currentTab === 'newsletter' && (
                            <Newsletter newsletterData={newsletterData}  />
                        )}
                        {currentTab === 'blockGuide' && (
                            <BlockGuide blockGuideData={blockGuideData} />
                        )}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default ExtrasEdit
