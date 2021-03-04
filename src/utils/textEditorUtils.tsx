import { convertFromHTML, IConvertFromHTMLConfig } from 'draft-convert';
import { EditorState, Modifier, RichUtils } from 'draft-js';

const removeSelectedBlocksStyle = (editorState: EditorState) => {
    const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
    if (newContentState) {
        return EditorState.push(editorState, newContentState, 'change-block-type');
    }
    return editorState;
};

export const getResetEditorState = (editorState: EditorState): EditorState => {
    const blocks = editorState.getCurrentContent().getBlockMap().toList();
    const updatedSelection = editorState.getSelection().merge({
        anchorKey: blocks.first().get('key'),
        anchorOffset: 0,
        focusKey: blocks.last().get('key'),
        focusOffset: blocks.last().getLength(),
        hasFocus: true
    });
    const newContentState = Modifier.removeRange(editorState.getCurrentContent(), updatedSelection, 'forward');

    const newState = EditorState.push(editorState, newContentState, 'remove-range');
    return removeSelectedBlocksStyle(newState);
};

export const insertTextToEditor = (editorState: EditorState, text: string): EditorState => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const ncs = Modifier.insertText(contentState, selection, text);
    const newState = EditorState.moveFocusToEnd(EditorState.push(editorState, ncs, 'insert-fragment'));

    return newState;
};
