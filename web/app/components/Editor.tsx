import { Component, type FC, useState } from 'react'
import { AtomicBlockUtils, EditorState } from 'draft-js'
import Editor from '@draft-js-plugins/editor'
type EditorProps = {
  editorState: EditorState
}

const blockRenderer = (contentBlock: any) => {
  const type = contentBlock.getType()
  console.log('contentBlock')
  console.log(contentBlock)
  console.log(type)
  if (type === 'atomic') {
    return {
      component: Component,
      editable: false,
      props: {
        octData: 'custom template',
      },
    }
  }
}

const MyEditor: FC<{ editorState?: EditorState }> = (props, context) => {
  const [editorState, setEditorState] = useState<any>(props.editorState)

  const insertBlock = (editorState: any) => {
    const contentState = editorState.getCurrentContent()

    const contentStateWithEntity = contentState.createEntity('TEST', 'MUTABLE', {
      a: 'b',
    })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })

    return AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      '     Hello  ',
    )
  }

  const onInsertBlock = () => {
    setEditorState(insertBlock(editorState))
  }
  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  return (
    <Editor
      editorState={editorState}
      onChange={onChange}
      blockRendererFn={blockRenderer}
    />
  )
}

export default MyEditor
