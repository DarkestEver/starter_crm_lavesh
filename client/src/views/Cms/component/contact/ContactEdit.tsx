import { Suspense, lazy, useEffect, useState } from 'react'
import reducer, { fetchContact, useAppDispatch, useAppSelector } from './store'

import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import { SLICE_NAME } from './store/contactSlice'
import Tabs from '@/components/ui/Tabs'
import { injectReducer } from '@/store'

const Contact = lazy(() => import('./ContactContent'))
const Seo = lazy(() => import('./Seo'))

const { TabNav, TabList } = Tabs
injectReducer(SLICE_NAME, reducer)

const settingsMenu: Record<
    string,
    {
        label: string
        path: string
    }
> = {
    contact: { label: 'Contact', path: 'contact' },
    seo: { label: 'Seo', path: 'seo' },
}


const ContactEdit = () => {
    const [currentTab, setCurrentTab] = useState('contact')
    const dispatch = useAppDispatch();
    
    const data = useAppSelector((state) => state.contact.data.contactData);

    useEffect(() => {
        dispatch(fetchContact())
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
                        {currentTab === 'contact' && (
                            <Contact data={data} />
                        )}
                        {currentTab === 'seo' && (
                            <Seo data={data.seo} contactId={data._id} />
                        )}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}


export default ContactEdit