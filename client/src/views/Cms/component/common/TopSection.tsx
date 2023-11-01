import { HiOutlineSearch, HiPencil } from 'react-icons/hi'
import {
    queryArticles,
    setQueryText,
    setSearch,
    setSearchCategory,
    useAppDispatch,
    useAppSelector,
} from '../../store'
import { useRef, useState } from 'react'
import { Field, Form } from 'formik'
import Button from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/shared'
import Container from '@/components/shared/Container'
import InputGroup from '@/components/ui/InputGroup'
import Notification from '@/components/ui/Notification'
import Select from '@/components/ui/Select'
import toast from '@/components/ui/toast'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'

type Option = {
    label: string
    value: string
}

const domainOptions: Option[] = [
    { label: 'eurasia.net', value: 'eurasia.net' },
    { label: 'prishavtechnologies.com', value: 'prishavtechnologies.com' },
    { label: 'magictouch.com', value: 'magictouch.com' },
    { label: '360property.com', value: '360property.com' },
   
]

const TopSection = () => {
    const dispatch = useAppDispatch()
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        console.log("confirm button clicked!")
    }

    // const searchCategory = useAppSelector(
    //     (state) => state.knowledgeBaseHelpCenter.data.searchCategory
    // )

    // const searchInput = useRef<HTMLInputElement>(null)

    // const onSearch = () => {
    //     if (searchInput.current) {
    //         const text = searchInput.current.value
    //         if (text) {
    //             dispatch(
    //                 queryArticles({ queryText: text, category: searchCategory })
    //             )
    //             dispatch(setQueryText(text))
    //             dispatch(setSearch(true))
    //         } else {
    //             toast.push(
    //                 <Notification
    //                     title="Please key in any text to search"
    //                     type="danger"
    //                 />,
    //                 {
    //                     placement: 'top-center',
    //                 }
    //             )
    //         }
    //     }
    // }

    // const onCategoryChange = (selected: Option | null) => {
    //     if (selected) {
    //         dispatch(setSearchCategory(selected.value))
    //     }
    // }

    return (
        <section className="flex flex-row justify-center h-[140px] bg-blue-400 mb-4 rounded-2xl px-8 py-4 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
            <Container className="flex flex-row px-4">
                <div className='w-32 h-32'>
                    <img 
                        src="/img/thumbs/tether-us.png"
                        alt="logo" 
                        className='w-auto h-auto rounded-2xl'
                    />
                </div>

                <div className="flex flex-col justify-content-between">

                    <h3 className="mb-2 text-sm text-white">
                        Domain:
                    </h3>
                    <InputGroup className="mb-4 xl:min-w-[800px]">
                    
                        <div className="min-w-[220px]">
                            <Select<Option>
                                isSearchable={false}
                                placeholder="Select Domain"
                                options={domainOptions}
                                className='font-bold'
                                // value={categoryOptions.filter(
                                //     (option) => option.value === searchCategory
                                // )}
                                // onChange={onCategoryChange}
                            />
                        </div>
                        <Button
                            icon={
                                <span className="mx-4">
                                    <HiOutlineSearch />
                                </span>
                            }
                            // onClick={onSearch}
                        />
                    </InputGroup>
                </div>

            </Container>
            <div className="flex group">
                <Button
                    className="text-white group-hover:text-black"
                    variant="plain"
                    size="sm"
                    icon={<HiPencil />}
                    type="button"
                    onClick={onConfirmDialogOpen}
                >
                    Edit
                </Button>
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="info"
                    title="Edit details"
                    confirmButtonColor="blue-600"
                    onClose={onConfirmDialogClose}
                    onRequestClose={onConfirmDialogClose}
                    onCancel={onConfirmDialogClose}
                    onConfirm={handleConfirm}
            >
                <p>
                    {/* <CMSFormEdit /> */}
                </p>
            </ConfirmDialog>
            </div>
        </section>
    )
}

export default TopSection
