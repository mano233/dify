'use client'
import type { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import React, { useEffect } from 'react'
import { useAppContext } from '@/context/app-context'
import MembersList from '@/app/components/members/list'
import { DataSourceType } from '@/models/datasets'

const mockList: any = [
  {
    enabled: false,
    word_count: 122,
    archived: false,
    updated_at: 0,
    hit_count: 123,
    id: '1',
    batch: 'sss',
    position: 1,
    dataset_id: 'ssss',
    data_source_type: DataSourceType.FILE,
    data_source_info: {
      upload_file: {
        id: '1122',
        name: '文件名称',
        size: 1231,
        mime_type: 'application/json',
        created_at: 0,
        created_by: '',
        extension: '',
      },
      job_id: '1',
      url: 'http://',
    },
    dataset_process_rule_id: 'is12',
    name: '测试文件',
    created_from: 'api',
    created_by: '1',
    created_at: 0,
    indexing_status: 'waiting',
    display_status: 'queuing',
    doc_form: 'qa_model',
  },
]

const Layout: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { isCurrentWorkspaceDatasetOperator } = useAppContext()

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

  return (
    <div className={'w-full h-full flex justify-center'}>
      <div className={'rounded-lg rounded-b bg-components-card-bg p-4 h-full'}
           style={{width: '80%'}}>
        <MembersList embeddingAvailable={false} documents={mockList || []} datasetId={'23133131'} onUpdate={() => {
        }}/>
      </div>
    </div>

  )
}
export default React.memo(Layout)
