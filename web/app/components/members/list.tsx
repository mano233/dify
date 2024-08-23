'use client'
import type { FC, SVGProps } from 'react'
import React, { useEffect, useState } from 'react'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline'

import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import s from './style.module.css'
import Button from '@/app/components/base/button'
import cn from '@/utils/classnames'
import Divider from '@/app/components/base/divider'
import Indicator from '@/app/components/header/indicator'
import { formatNumber } from '@/utils/format'

import useTimestamp from '@/hooks/use-timestamp'
import TagSelector from '@/app/components/base/tag-management/selector'
import type { Tag } from '@/app/components/base/tag-management/constant'
import {del, get, patch} from "@/service/base";

export const SettingsIcon = ({ className }: SVGProps<SVGElement>) => {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className ?? ''}>
    <path d="M2 5.33325L10 5.33325M10 5.33325C10 6.43782 10.8954 7.33325 12 7.33325C13.1046 7.33325 14 6.43782 14 5.33325C14 4.22868 13.1046 3.33325 12 3.33325C10.8954 3.33325 10 4.22868 10 5.33325ZM6 10.6666L14 10.6666M6 10.6666C6 11.7712 5.10457 12.6666 4 12.6666C2.89543 12.6666 2 11.7712 2 10.6666C2 9.56202 2.89543 8.66659 4 8.66659C5.10457 8.66659 6 9.56202 6 10.6666Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const SyncIcon = () => {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.69773 13.1783C7.29715 13.8879 9.20212 13.8494 10.8334 12.9075C13.5438 11.3427 14.4724 7.87704 12.9076 5.16672L12.7409 4.87804M3.09233 10.8335C1.52752 8.12314 2.45615 4.65746 5.16647 3.09265C6.7978 2.15081 8.70277 2.11227 10.3022 2.82185M1.66226 10.8892L3.48363 11.3773L3.97166 9.5559M12.0284 6.44393L12.5164 4.62256L14.3378 5.1106" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
}

export const FilePlusIcon = ({ className }: SVGProps<SVGElement>) => {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className ?? ''}>
    <path d="M13.3332 6.99992V4.53325C13.3332 3.41315 13.3332 2.85309 13.1152 2.42527C12.9234 2.04895 12.6175 1.74299 12.2412 1.55124C11.8133 1.33325 11.2533 1.33325 10.1332 1.33325H5.8665C4.7464 1.33325 4.18635 1.33325 3.75852 1.55124C3.3822 1.74299 3.07624 2.04895 2.88449 2.42527C2.6665 2.85309 2.6665 3.41315 2.6665 4.53325V11.4666C2.6665 12.5867 2.6665 13.1467 2.88449 13.5746C3.07624 13.9509 3.3822 14.2569 3.75852 14.4486C4.18635 14.6666 4.7464 14.6666 5.8665 14.6666H7.99984M9.33317 7.33325H5.33317M6.6665 9.99992H5.33317M10.6665 4.66659H5.33317M11.9998 13.9999V9.99992M9.99984 11.9999H13.9998" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const ArchiveIcon = ({ className }: SVGProps<SVGElement>) => {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className ?? ''}>
    <path d="M2.66683 5.33106C2.55749 5.32824 2.47809 5.32191 2.40671 5.30771C1.87779 5.2025 1.46432 4.78904 1.35912 4.26012C1.3335 4.13132 1.3335 3.97644 1.3335 3.66667C1.3335 3.3569 1.3335 3.20201 1.35912 3.07321C1.46432 2.54429 1.87779 2.13083 2.40671 2.02562C2.53551 2 2.69039 2 3.00016 2H13.0002C13.3099 2 13.4648 2 13.5936 2.02562C14.1225 2.13083 14.536 2.54429 14.6412 3.07321C14.6668 3.20201 14.6668 3.3569 14.6668 3.66667C14.6668 3.97644 14.6668 4.13132 14.6412 4.26012C14.536 4.78904 14.1225 5.2025 13.5936 5.30771C13.5222 5.32191 13.4428 5.32824 13.3335 5.33106M6.66683 8.66667H9.3335M2.66683 5.33333H13.3335V10.8C13.3335 11.9201 13.3335 12.4802 13.1155 12.908C12.9238 13.2843 12.6178 13.5903 12.2415 13.782C11.8137 14 11.2536 14 10.1335 14H5.86683C4.74672 14 4.18667 14 3.75885 13.782C3.38252 13.5903 3.07656 13.2843 2.88482 12.908C2.66683 12.4802 2.66683 11.9201 2.66683 10.8V5.33333Z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export const useIndexStatus = () => {
  const { t } = useTranslation()
  return {
    queuing: { color: 'orange', text: t('datasetDocuments.list.status.queuing') }, // waiting
    indexing: { color: 'blue', text: t('datasetDocuments.list.status.indexing') }, // indexing splitting parsing cleaning
    paused: { color: 'orange', text: t('datasetDocuments.list.status.paused') }, // paused
    error: { color: 'red', text: t('datasetDocuments.list.status.error') }, // error
    available: { color: 'green', text: t('datasetDocuments.list.status.available') }, // completed，archived = false，enabled = true
    enabled: { color: 'green', text: t('datasetDocuments.list.status.enabled') }, // completed，archived = false，enabled = true
    disabled: { color: 'gray', text: t('datasetDocuments.list.status.disabled') }, // completed，archived = false，enabled = false
    archived: { color: 'gray', text: t('datasetDocuments.list.status.archived') }, // completed，archived = true
  }
}

// status item for list
export const StatusItem: FC<{
  status: string
  reverse?: boolean
  scene?: 'list' | 'detail'
  textCls?: string
  errorMessage?: string
}> = ({ status, reverse = false, scene = 'list', textCls = '', errorMessage }) => {
  const color = status === 'completed' ? 'green' : 'yellow'
  const text = status === 'completed' ? '已通过' : '待审核'
  return <div className={
    cn('flex items-center',
      reverse ? 'flex-row-reverse' : '',
      scene === 'detail' ? s.statusItemDetail : '')
  }>
    <Indicator color={color} className={reverse ? 'ml-2' : 'mr-2'} />
    <span className={cn('text-gray-700 text-sm', textCls)}>{text}</span>
  </div>
}

type OperationName = 'delete' | 'archive' | 'enable' | 'disable' | 'sync' | 'un_archive'

export const renderTdValue = (value: string | number | null, isEmptyStyle = false) => {
  return (
    <div className={cn(isEmptyStyle ? 'text-gray-400' : 'text-gray-700', s.tdValue)}>
      {value ?? '-'}
    </div>
  )
}

const renderCount = (count: number | undefined) => {
  if (!count)
    return renderTdValue(0, true)

  if (count < 1000)
    return count

  return `${formatNumber((count / 1000).toFixed(1))}k`
}

export type Member = {
  id: string
  name: string
  tags: Tag[]
  apply_time: number
  status: string
}

type IDocumentListProps = {
  embeddingAvailable: boolean
  documents: Member[]
  datasetId: string
  onUpdate: () => void
}

/**
 * Document list component including basic information
 */
const MembersList: FC<IDocumentListProps> = ({ embeddingAvailable, documents = [], datasetId }) => {
  const { t } = useTranslation()
  const { formatTime } = useTimestamp()
  const router = useRouter()
  const [localDocs, setLocalDocs] = useState<Member[]>(documents)
  const [enableSort, setEnableSort] = useState(false)

  useEffect(() => {
    setLocalDocs(documents)
  }, [documents])

  const handlePass = (id: string) => {
    const body = {
      status: 'completed',
    }
    patch(`/my-members/${id}`, { body }).then(() => {
      router.refresh()
    })
  }

  const handleDel = (id: string) => {
    del(`/my-members/${id}`).then(() => {
      router.refresh()
    })
  }

  const handleSaveTags = (tags: Tag[]) => {
    console.log(`用户保存标签${tags}`)
    router.refresh()
  }

  return (
    <div className='w-full h-full overflow-x-auto'>
      <table className={`min-w-[700px] max-w-full w-full border-collapse border-0 text-xs mt-3 ${s.documentTable}`}>
        <thead className="h-8 leading-8 border-b border-gray-200 text-gray-500 font-medium text-xs uppercase">
          <tr>
            <td className='w-12'>#</td>
            <td>
              <div className='flex'>
                用户名称
              </div>
            </td>
            <td className='w-44'>可检索知识库标签</td>
            <td className='w-44'>
              <div className='flex justify-between items-center'>
                申请时间
              </div>
            </td>
            <td className='w-40'>状态</td>
            <td className='w-20'>操作</td>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {localDocs.map((member) => {
            const onSuccess = () => {
              console.log('ssss')
            }
            return <tr
              key={member.id}
              className={'border-b border-gray-200 h-8 hover:bg-gray-50 cursor-pointer'}>
              <td className='text-left align-middle  text-xs'>{member.id}</td>
              <td>{member.name}</td>
              <td>
                <TagSelector value={member.tags.map(tag => tag.id)} type={'knowledge'}
                  selectedTags={member.tags}
                  from={'member'}
                  onCacheUpdate={handleSaveTags}
                  onChange={onSuccess} targetID={member.id}/>
              </td>
              <td className='text-gray-500 text-[13px]'>
                {formatTime(member.apply_time, t('datasetHitTesting.dateTimeFormat') as string)}
              </td>
              <td>
                <StatusItem status={member.status} />
              </td>
              <td className='w-44'>
                <div className={'flex items-center'}>
                  <Button size={'small'} variant={'primary'} className={'gap-1 '} onClick={handlePass.bind(this, member.id)}>
                    <CheckCircleIcon className={'w-3 h-3 stroke-current'} ></CheckCircleIcon>
                    通过
                  </Button>
                  <Divider type='vertical' className={'!bg-gray-400 !h-5'} />
                  <Button size={'small'} variant={'secondary'} className={'gap-1 hover:text-red-500'} onClick={handleDel.bind(this, member.id)}>
                    <TrashIcon className={'w-3 h-3 stroke-current'} ></TrashIcon>
                    删除
                  </Button>

                </div>

              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MembersList
