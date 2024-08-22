import { useTranslation } from 'react-i18next'
import Button from '../../base/button'
import Tag from '../../base/tag'
import Tooltip from '../../base/tooltip'
import { getIcon } from '../common/retrieval-method-info'
import s from './style.module.css'
import cn from '@/utils/classnames'
import type { HitTestingResponse } from '@/models/datasets'
import { hitTesting } from '@/service/datasets'
import { asyncRunSafe } from '@/utils'
import { RETRIEVE_METHOD, type RetrievalConfig } from '@/types/app'

type TextAreaWithButtonIProps = {
  datasetId: string
  onUpdateList: () => void
  setHitResult: (res: HitTestingResponse) => void
  loading: boolean
  setLoading: (v: boolean) => void
  text: string
  setText: (v: string) => void
  onClickRetrievalMethod: () => void
  retrievalConfig: RetrievalConfig
  isEconomy: boolean
  onSubmit?: () => void
}

const TextAreaWithButton = ({
  datasetId,
  onUpdateList,
  setHitResult,
  setLoading,
  loading,
  text,
  setText,
  onClickRetrievalMethod,
  retrievalConfig,
  isEconomy,
  onSubmit: _onSubmit,
}: TextAreaWithButtonIProps) => {
  const { t } = useTranslation()

  function handleTextChange(event: any) {
    setText(event.target.value)
  }

  const onSubmit = async () => {
    setLoading(true)
    const [e, res] = await asyncRunSafe<HitTestingResponse>(
      hitTesting({
        datasetId,
        queryText: text,
        retrieval_model: {
          ...retrievalConfig,
          search_method: isEconomy ? RETRIEVE_METHOD.keywordSearch : retrievalConfig.search_method,
        },
      }) as Promise<HitTestingResponse>,
    )
    if (!e) {
      setHitResult(res)
      onUpdateList?.()
    }
    setLoading(false)
    _onSubmit && _onSubmit()
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className='px-4 pb-11'>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder={t('datasetHitTesting.input.placeholder') as string}
            className={s.textarea}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between mx-4 mt-2 mb-2">
            {text?.length > 200
              ? (
                <Tooltip
                  content={t('datasetHitTesting.input.countWarning') as string}
                  selector="hit-testing-warning"
                >
                  <div>
                    <Tag color="red" className="!text-red-600">
                      {text?.length}
                      <span className="text-red-300 mx-0.5">/</span>
                      200
                    </Tag>
                  </div>
                </Tooltip>
              )
              : (
                <Tag
                  color="gray"
                  className={cn('!text-gray-500', text?.length ? '' : 'opacity-50')}
                >
                  {text?.length}
                  <span className="text-gray-300 mx-0.5">/</span>
                  200
                </Tag>
              )}

            <div>
              <Button
                onClick={onSubmit}
                variant="primary"
                loading={loading}
                disabled={(!text?.length || text?.length > 200)}
              >
                {t('datasetHitTesting.input.testing')}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default TextAreaWithButton
