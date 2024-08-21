'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { RiUser5Fill } from '@remixicon/react'
import classNames from '@/utils/classnames'
type ToolsNavProps = {
  className?: string
}

const MembersNav = ({
  className,
}: ToolsNavProps) => {
  const { t } = useTranslation()
  const selectedSegment = useSelectedLayoutSegment()
  const actived = selectedSegment === 'members'

  return (
    <Link href="/members" className={classNames(
      className, 'group',
      actived && 'bg-white font-bold',
      actived ? 'text-primary-600' : 'text-gray-500 hover:bg-gray-200',
    )}>
      <RiUser5Fill className='mr-2 w-4 h-4' />
      用户列表
    </Link>
  )
}

export default MembersNav
