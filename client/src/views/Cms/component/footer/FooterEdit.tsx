import { Suspense, lazy, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import Tabs from '@/components/ui/Tabs'

// import { apiGetAccountSettingData } from '@/services/AccountServices'


type AccountSetting = {
    profile: {
        name: string
        email: string
        title: string
        avatar: string
        timeZone: string
        lang: string
        syncData: boolean
    }
    loginHistory: {
        type: string
        deviceName: string
        time: number
        location: string
    }[]
    notification: {
        news: string[]
        accountActivity: string[]
        signIn: string[]
        reminders: string[]
        mentioned: string[]
        replies: string[]
        taskUpdate: string[]
        assigned: string[]
        newProduct: string[]
        newOrder: string[]
    }
}

type GetAccountSettingData = AccountSetting

const Content1 = lazy(() => import('./Content1'))
const Content2 = lazy(() => import('./Content2'))
const Content3 = lazy(() => import('./Content3'))
// const Content4 = lazy(() => import('./components/Content4'))
// const Content5 = lazy(() => import('./components/Content5'))

const { TabNav, TabList } = Tabs

const settingsMenu: Record<
    string,
    {
        label: string
        path: string
    }
> = {
    content1: { label: 'Content1', path: 'content1' },
    content2: { label: 'Content2', path: 'content2' },
    content3: { label: 'Content3', path: 'content3' },
    // content4: { label: 'Content4', path: 'content4' },
    // content5: { label: 'Content5', path: 'content5' },
}

const FooterEdit = () => {
    const [currentTab, setCurrentTab] = useState('content1')
    const [data, setData] = useState<Partial<AccountSetting>>({})

    const navigate = useNavigate()

    const location = useLocation()

    const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )

    const onTabChange = (val: string) => {
        setCurrentTab(val)
        // navigate(`/app/account/settings/${val}`)
    }

    return (
        <Container>
            <AdaptableCard className='mt-2'>
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
                        {currentTab === 'content1' && (
                            <Content1  />
                        )}
                        {currentTab === 'content2' && (
                            <Content2 />
                        )}
                        {currentTab === 'content3' && (
                            <Content3 
                                // data={data.content3} 
                            />
                        )}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default FooterEdit
