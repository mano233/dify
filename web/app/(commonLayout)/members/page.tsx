'use client'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { window } from 'd3-selection'
import { useAppContext } from '@/context/app-context'
import type { Member } from '@/app/components/members/list'
import MembersList from '@/app/components/members/list'
import TagManagementModal from '@/app/components/base/tag-management'
import { useStore as useTagStore } from '@/app/components/base/tag-management/store'
import { get } from '@/service/base'

const mockList: Member[] = [
  {
    id: 'sdsadsadsa',
    name: '在jam环境是吗',
    status: 'waiting',
    tags: [
      {
        id: 'ssss',
        name: 'sss',
        type: 'knowledge',
        binding_count: 1,
      },
    ],
    apply_time: 0,
  },
]

const Layout: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isCurrentWorkspaceDatasetOperator } = useAppContext()
  const showTagManagementModal = useTagStore(s => s.showTagManagementModal)
  useEffect(() => {
    if (typeof window !== 'undefined')
      document.title = `${t('tools.title')} - Dify`
    if (isCurrentWorkspaceDatasetOperator)
      return router.replace('/datasets')
  }, [isCurrentWorkspaceDatasetOperator, router, t])
  useEffect(() => {
    if (isCurrentWorkspaceDatasetOperator)
      return router.replace('/datasets')
  }, [isCurrentWorkspaceDatasetOperator, router])
  const [mems, setMems] = useState([])
  useEffect(() => {
    get('/my-members').then((data) => {
      console.log(data)
    })
  }, [])
  return (
    <div className={'w-full h-full flex justify-center'}>
      <div className={'rounded-lg rounded-b bg-components-card-bg p-4 h-full'}
        style={{ width: '80%' }}>
        <MembersList embeddingAvailable={true} documents={mems} datasetId={''} onUpdate={() => {
          router.refresh()
        }}/>
      </div>
      {showTagManagementModal && (
        <TagManagementModal type='knowledge' show={showTagManagementModal} />
      )}
    </div>

  )
}
export default React.memo(Layout)
