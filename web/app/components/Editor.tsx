import React, {useMemo, useState} from 'react'
import type { BaseEditor } from 'slate'
import { Transforms, createEditor } from 'slate'
import {
  Editable,
  ReactEditor,
  Slate,
  useSlateStatic,
  withReact,
} from 'slate-react'
import { withHistory } from 'slate-history'
import { isUrl } from 'vfile/lib/minurl.shared'
import { upload } from '@/service/base'
const isImageUrl = (url: unknown) => {
  if (!url)
    return false
  if (!isUrl(url))
    return false
  const ext = new URL(url).pathname.split('.').pop()
  return ['jpg', 'png', 'gif'].includes(ext || '')
}

const insertImage = (editor: BaseEditor, url: string | ArrayBuffer | null) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)

  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [{ text: '' }],
  } as any)
}
const inserFile = (editor: BaseEditor, url: string, name: string) => {
  const image = { type: 'file', url, name, children: [{ text: '' }] }
  Transforms.insertNodes(editor, image)
  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [{ text: '' }],
  } as any)
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor as ReactEditor, element)
  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} style={{ position: 'relative' }}>
        <img
          src={element.url}
        />
        <a
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className={'rounded-md text-xs bg-red-300 text-red-700 p-2'}
          style={{ left: '10px', top: '10px', position: 'absolute' }}
        >
          删除
        </a>
      </div>
    </div>
  )
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const File = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor as ReactEditor, element)
  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} style={{ position: 'relative' }}>
        <a
          className={'text-blue-800 italic'}
          href={element.url}
        >
          {element.name}
        </a>
      </div>
    </div>
  )
}
const Element = (props: any) => {
  const { attributes, children, element } = props

  switch (element.type) {
    case 'image':
      return <Image {...props} />
    case 'file':
      return <File {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}
const withImages = (editor: any) => {
  const { insertData, isVoid } = editor

  editor.isVoid = (element: any) => {
    return element.type === 'image' ? true : isVoid(element)
  }

  return editor
}
async function uploadFile(file: any) {
  const formData = new FormData()
  formData.set('file', file)
  return await upload({
    xhr: new XMLHttpRequest(),
    data: formData,
  }, true, '/upload')
}

type MyEditorProps = { value: any; read?: boolean; onChange: any }

const MyEditor = (props: MyEditorProps) => {
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    [],
  )
  const insertElement = (e: any) => {
    const file = e.target.files[0]
    uploadFile(file).then((response) => {
      if (response.type === 'image')
        insertImage(editor, response.url)
      else
        inserFile(editor, response.url, response.name)
    })
  }
  const InsertImageButton = () => {
    return (
      <div className="upload-btn-wrapper">
        <button className="btn disabled:btn-disabled btn-secondary btn-medium ">添加文件</button>
        <input type="file" name="myfile" onChange={insertElement}/>
      </div>
    )
  }

  return (
    <>
      <div>
        {
          !props.read && <InsertImageButton />
        }
      </div>
      <Slate editor={editor} initialValue={ props.value } onChange={ props.onChange }>

        <Editable
          readOnly={props.read}
          renderElement={props => <Element {...props} />}
          placeholder="Enter some text..."
        />
      </Slate>
    </>
  )
}

export default MyEditor
