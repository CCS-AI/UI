export {};
// import React, { useState, useRef, useMemo, useCallback } from 'react';
// import styled from 'styled-components';
// import { EditorState, getDefaultKeyBinding, DraftHandleValue, Modifier, ContentState, ContentBlock } from 'draft-js';
// import Editor from '@draft-js-plugins/editor';
// import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
// import { BoldButton, UnorderedListButton, OrderedListButton } from '@draft-js-plugins/buttons';
// import createMentionPlugin, { defaultSuggestionsFilter } from '@draft-js-plugins/mention';
// import { MentionData } from '@draft-js-plugins/mention';
// import '@draft-js-plugins/static-toolbar/lib/plugin.css';
// import 'draft-js/dist/Draft.css';
// import '@draft-js-plugins/mention/lib/plugin.css';
// import createEmojiPlugin from '@draft-js-plugins/emoji';
// import { CSSProperties } from '@material-ui/core/styles/withStyles';
// import '@draft-js-plugins/emoji/lib/plugin.css';
// import UserMentionEntryComponent from '../../TextEditorMentions/UserMention/UserMentionEntryComponent';
// import UserMentionComponent from '../../TextEditorMentions/UserMention/UserMentionComponent';
// import atIcon from '../../../../static/icons/at.svg';
// import { stateToHTML } from 'draft-js-export-html';
// import { ToolbarChildrenProps } from '@draft-js-plugins/static-toolbar/lib/components/Toolbar';

// export type BaseProps = {
//     editorState: EditorState;
//     onChange: (editorState: EditorState) => void;
//     hasError?: boolean;
//     onSubmit?: () => void;
//     onInsertText?: (text: string) => void;
//     canSubmit?: boolean;
//     mentions?: MentionData[];
//     style?: CSSProperties;
//     placeholder?: string;
//     readOnly?: boolean;
//     blockRendererFn?: (block: ContentBlock) => any;
// };

// const TextEditor = ({
//     editorState,
//     onChange,
//     hasError,
//     onSubmit,
//     mentions,
//     canSubmit,
//     onInsertText,
//     style,
//     readOnly,
//     placeholder,
//     blockRendererFn
// }: BaseProps) => {
//     const editorRef = useRef<Editor | null>(null);
//     const [open, setOpen] = useState(false);
//     const [suggestions, setSuggestions] = useState(mentions);

//     const [{ plugins, Toolbar, MentionSuggestions, EmojiSelect }] = useState(() => {
//         const positionSuggestions = (position: any): CSSProperties => {
//             return {
//                 left: position.decoratorRect.left + 'px',
//                 top: position.decoratorRect.top - 10 + 'px', // change this value (40) for manage the distance between cursor and bottom edge of popover
//                 display: 'block',
//                 transform: 'scale(1) translateY(-100%)',
//                 transformOrigin: '1em 0% 0px',
//                 transition: 'all 0.25s cubic-bezier(0.3, 1.2, 0.2, 1)',
//                 position: 'fixed'
//             };
//         };

//         // Toolbar plugin
//         const staticToolbarPlugin = createToolbarPlugin();
//         const { Toolbar } = staticToolbarPlugin;

//         // Emoji plugin
//         const emojiPlugin = createEmojiPlugin({
//             useNativeArt: true,
//             positionSuggestions: positionSuggestions
//         });
//         const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

//         // Mentions plugin
//         const mentionPlugin = createMentionPlugin({
//             entityMutability: 'IMMUTABLE',
//             mentionPrefix: '@',
//             mentionComponent: UserMentionComponent,
//             positionSuggestions: positionSuggestions
//         });
//         const { MentionSuggestions } = mentionPlugin;

//         const plugins = [mentionPlugin, staticToolbarPlugin, emojiPlugin];

//         return { plugins, Toolbar, MentionSuggestions, EmojiSelect };
//     });

//     const onOpenChange = useCallback((_open: boolean) => {
//         setOpen(_open);
//     }, []);
//     const onSearchChange = useCallback(({ value }: { value: string }) => {
//         if (mentions) setSuggestions(defaultSuggestionsFilter(value, mentions));
//     }, []);

//     return (
//         <EditorWrapper style={style}>
//             <div
//                 onClick={() => {
//                     editorRef.current!.focus();
//                 }}
//             >
//                 <div className="editor">
//                     <Editor
//                         editorState={editorState}
//                         onChange={(state) => {
//                             onChange(state);
//                         }}
//                         keyBindingFn={
//                             open
//                                 ? undefined
//                                 : (e: any): string | null => {
//                                       if (e.keyCode === 13 && !e.shiftKey) return 'editor-submit';
//                                       return getDefaultKeyBinding(e);
//                                   }
//                         }
//                         handleKeyCommand={(command: string): DraftHandleValue => {
//                             if (command === 'editor-submit' && !!onSubmit && canSubmit) {
//                                 onSubmit();
//                                 return 'handled';
//                             }
//                             return 'not-handled';
//                         }}
//                         plugins={plugins}
//                         ref={editorRef}
//                         spellCheck={true}
//                         readOnly={readOnly}
//                         placeholder={placeholder}
//                         blockRendererFn={blockRendererFn}
//                     />
//                     {!!suggestions && (
//                         <MentionSuggestions
//                             open={open}
//                             onOpenChange={onOpenChange}
//                             suggestions={suggestions || []}
//                             onSearchChange={onSearchChange}
//                             entryComponent={UserMentionEntryComponent}
//                             onAddMention={() => {
//                                 // get the mention object selected
//                             }}
//                         />
//                     )}
//                 </div>
//                 {!readOnly && (
//                     <Toolbar>
//                         {(externalProps: ToolbarChildrenProps) => (
//                             <>
//                                 <BoldButton {...externalProps} />
//                                 <UnorderedListButton {...externalProps} />
//                                 <OrderedListButton {...externalProps} />
//                                 <EmojiSelect />

//                                 <div className="bi09khh">
//                                     <button
//                                         type="button"
//                                         onClick={(e) => {
//                                             const currentState = editorRef?.current?.getEditorState();
//                                             if (currentState) {
//                                                 e.stopPropagation();
//                                                 const selection = currentState.getSelection();
//                                                 const contentState = currentState.getCurrentContent();
//                                                 const ncs = Modifier.insertText(contentState, selection, ' @');
//                                                 onChange(EditorState.moveFocusToEnd(EditorState.push(currentState, ncs, 'insert-fragment')));
//                                             }
//                                         }}
//                                         className="bc4rxid"
//                                     >
//                                         <img src={atIcon} alt="At" />
//                                     </button>
//                                 </div>

//                                 {!!onSubmit && (
//                                     <div className="bi09khh submit-btn">
//                                         <button
//                                             onClick={(e) => {
//                                                 e.stopPropagation();

//                                                 onSubmit();
//                                             }}
//                                             className="bc4rxid"
//                                             disabled={!canSubmit}
//                                         >
//                                             <span className="material-icons">send</span>
//                                         </button>
//                                     </div>
//                                 )}
//                             </>
//                         )}
//                     </Toolbar>
//                 )}
//             </div>
//         </EditorWrapper>
//     );
// };

// const EditorWrapper = styled.div`
//     background-color: #fff;
//     border: 1px solid #008ac9;
//     border-radius: 15px;

//     .editor {
//         box-sizing: border-box;
//         cursor: text;
//         padding: 10px;
//     }

//     .editor :global(.public-DraftEditor-content) {
//         min-height: 140px;
//     }

//     .t16lpgj {
//         background: none;
//         border: none;
//         box-shadow: none;
//         display: flex;
//         align-items: center;
//     }
//     .bc4rxid,
//     .e8k2yoa,
//     .e13wqaj6 {
//         background: none;
//         color: inherit;
//         border: none;
//         padding: 0;
//         font: inherit;
//         cursor: pointer;
//         outline: inherit;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         color: #008ac9;
//         height: 34px;
//         width: 36px;
//         font-size: 24px;
//         & svg {
//             fill: #008ac9b3;
//         }
//     }

//     button:disabled,
//     button[disabled] {
//         cursor: initial;
//         color: #008ac9b3;
//     }
//     .ejr02pv {
//         transform: translateY(-110%) translateX(-20%);
//     }

//     .akzb7t5 {
//         & svg {
//             fill: #008ac9 !important;
//         }
//     }
//     .submit-btn {
//         margin-left: auto;
//     }

//     .toolbar-btn-wrapper {
//         display: inline-block;
//     }
//     .toolbar-btn {
//         background: #fbfbfb;
//         color: #888;
//         font-size: 18px;
//         border: 0;
//         padding-top: 5px;
//         vertical-align: bottom;
//         height: 34px;
//         width: 36px;
//     }

//     .toolbar-btn:hover,
//     .toolbar-btn:focus {
//         background: #f3f3f3;
//     }
// `;

// export default TextEditor;
