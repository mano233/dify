'use client'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { window } from 'd3-selection'
import { useMount } from 'ahooks'
import { useAppContext } from '@/context/app-context'
import MembersList from '@/app/components/members/list'
import TagManagementModal from '@/app/components/base/tag-management'
import { useStore as useTagStore } from '@/app/components/base/tag-management/store'
import { get } from '@/service/base'
import Pagination from '@/app/components/base/pagination'
import { fetchTagList } from '@/service/tag'

const Layout: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isCurrentWorkspaceDatasetOperator } = useAppContext()
  const showTagManagementModal = useTagStore(s => s.showTagManagementModal)
  const tagList = useTagStore(s => s.tagList)
  const setTagList = useTagStore(s => s.setTagList)
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
  const [myMembers, setMyMembers] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState<number>(0)
  const limt = 3
  useEffect(() => {
    get(`/my-members?page=${page}&limit=${limt}`).then((data: any) => {
      setMyMembers(data.data)
      setPage(page)
      setTotal(data.total)
    })
  }, [])
  useMount(() => {
    fetchTagList('knowledge').then((res) => {
      setTagList(res)
    })
  })
  const changePage = (page: number) => {
    get(`/my-members?page=${page}&limit=${limt}`).then((data: any) => {
      setMyMembers([])
      setMyMembers(data.data)
      setPage(page)
      setTotal(data.total)
    })
  }
  return (
    <div className={'w-full h-full flex justify-center'}>
      <div className={'rounded-lg rounded-b bg-components-card-bg p-4 h-full'}
        style={{ width: '80%' }}>
        <MembersList embeddingAvailable={true} documents={myMembers} datasetId={''} onUpdate={() => {
        }}/>
        <Pagination current={page} onChange={changePage} total={total} limit={limt} />
      </div>
      {showTagManagementModal && (
        <TagManagementModal type='knowledge' show={showTagManagementModal} />
      )}
    </div>

  )
}
export default React.memo(Layout)
