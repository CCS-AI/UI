import { styled } from '../../Theme/theme';
// import DatePicker from './DatePicker';
import DropDown from './DropDown';
import TextArea from './TextArea';
import TextInput from './TextInput';
import Checkbox from './Checkbox';
import LocationSearchInput from './LocationSearchInput';
// import TextEditor from './TextEditor';

export {
    // DatePicker as FormDatePicker,
    DropDown as FormDropDown,
    TextArea as FormTextArea,
    TextInput as FormTextInput,
    Checkbox as FormCheckbox,
    LocationSearchInput
    // TextEditor as FormTextEditor
};

export const ErrorText = styled.span`
    font-size: 11px;
    color: red;
    position: absolute;
    margin-left: 5px;
`;
