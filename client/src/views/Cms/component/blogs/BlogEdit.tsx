import { Suspense, lazy, useState } from 'react'

import AdaptableCard from '@/components/shared/AdaptableCard'
import CMSBackButton from '../common/CMSBackButton'
import Container from '@/components/shared/Container'
import Tabs from '@/components/ui/Tabs'

const Blog = lazy(() => import('./BlogContent'))
const Seo = lazy(() => import('./Seo'))

const { TabNav, TabList } = Tabs

const settingsMenu: Record<
    string,
    {
        label: string
        path: string
    }
> = {
    blog: { label: 'Blog', path: 'blog' },
    seo: { label: 'Seo', path: 'seo' },
}

const BlogEdit = () => {
    const [currentTab, setCurrentTab] = useState('blog')
    const preview = location.pathname.split('/').pop();


    const onTabChange = (val: string) => {
        setCurrentTab(val)
    }

    return (
    <>
        <CMSBackButton route={`/cms/blogs`} />
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
                        {currentTab === 'blog' && (
                            <Blog preview={preview} />
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




export default BlogEdit
