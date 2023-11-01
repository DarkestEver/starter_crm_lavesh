import { Suspense, lazy, useState } from 'react'

import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import Tabs from '@/components/ui/Tabs'

const Newsletter = lazy(() => import('./Newsletter'))
const BlockGuide = lazy(() => import('./BlockGuide'))
const Seo = lazy(() => import('../common/Seo'))

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
    seo: { label: 'Seo', path: 'seo' },
}

const ExtrasEdit = () => {
    const [currentTab, setCurrentTab] = useState('newsletter')

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
                            <Newsletter  />
                        )}
                        {currentTab === 'blockGuide' && (
                            <BlockGuide  />
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

export default ExtrasEdit
