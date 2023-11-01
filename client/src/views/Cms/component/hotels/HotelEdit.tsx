import { Suspense, lazy, useState } from 'react'

import AdaptableCard from '@/components/shared/AdaptableCard'
import CMSBackButton from '../common/CMSBackButton'
import Container from '@/components/shared/Container'
import Tabs from '@/components/ui/Tabs'

const Hotel = lazy(() => import('./HotelContent'))
const Seo = lazy(() => import('../common/Seo'))


const { TabNav, TabList } = Tabs




const settingsMenu: Record<
    string,
    {
        label: string
        path: string
    }
> = {
    hotel: { label: 'Hotel', path: 'hotel' },
    seo: { label: 'Seo', path: 'seo' },
}




const HotelEdit = () => {
    const [currentTab, setCurrentTab] = useState('hotel')




    const onTabChange = (val: string) => {
        setCurrentTab(val)
    }




    return (
    <>
        <CMSBackButton route={`/cms/hotels`} />
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
                        {currentTab === 'hotel' && (
                            <Hotel  />
                        )}
                        {currentTab === 'seo' && (
                            <Seo />
                        )}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    </>
    )
}




export default HotelEdit
