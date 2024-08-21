'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import RetrievalParamConfig from '../retrieval-param-config'
import type { RetrievalConfig } from '@/types/app'
import { RETRIEVE_METHOD } from '@/types/app'
import RadioCard from '@/app/components/base/radio-card'
import { PatternRecognition, Semantic } from '@/app/components/base/icons/src/vender/solid/development'
import { FileSearch02 } from '@/app/components/base/icons/src/vender/solid/files'
import { useProviderContext } from '@/context/provider-context'
import { useDefaultModel } from '@/app/components/header/account-setting/model-provider-page/hooks'
import { ModelTypeEnum } from '@/app/components/header/account-setting/model-provider-page/declarations'

type Props = {
  value: RetrievalConfig
  onChange: (value: RetrievalConfig) => void
}

const RetrievalMethodConfig: FC<Props> = ({
  value: passValue,
  onChange,
}) => {
  const { t } = useTranslation()
  const { supportRetrievalMethods } = useProviderContext()
  const { data: rerankDefaultModel } = useDefaultModel(ModelTypeEnum.rerank)
  const value = (() => {
    if (!passValue.reranking_model.reranking_model_name) {
      return {
        ...passValue,
        reranking_model: {
          reranking_provider_name: rerankDefaultModel?.provider.provider || '',
          reranking_model_name: rerankDefaultModel?.model || '',
        },
      }
    }
    return passValue
  })()
  return (
    <div className='space-y-2'>
      <RadioCard
        icon={<Semantic className='w-4 h-4 text-[#7839EE]' />}
        title={t('dataset.retrieval.semantic_search.title')}
        description={t('dataset.retrieval.semantic_search.description')}
        isChosen={value.search_method === RETRIEVE_METHOD.semantic}
        onChosen={() => onChange({
          ...value,
          search_method: RETRIEVE_METHOD.semantic,
        })}
        chosenConfig={
          <RetrievalParamConfig
            type={RETRIEVE_METHOD.semantic}
            value={value}
            onChange={onChange}
          />
        }
      />
    </div>
  )
}
export default React.memo(RetrievalMethodConfig)
