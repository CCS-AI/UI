import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { styled } from '../../../shared/Theme/theme';
import { Field, FieldProps } from 'formik';
import { ErrorText } from '.';

type Props = {
    name: string;
    placeHolder?: string;
    countryCode?: string;
    width?: string;
};
const LocationSearchInput = ({ name, placeHolder, countryCode, width }: Props) => {
    return (
        <Field name={name}>
            {({ meta, form: { setFieldValue } }: FieldProps) => {
                const { touched, error, value } = meta;
                const hasError = touched && error !== undefined;
                return (
                    <Container width={width}>
                        <PlacesAutocomplete
                            value={value ?? ''}
                            onChange={(value: string) => {
                                setFieldValue && setFieldValue(name, value);
                            }}
                            onSelect={(value: string) => {
                                setFieldValue && setFieldValue(name, value);
                            }}
                            onError={(status, clearSuggestions) => {
                                setFieldValue && setFieldValue(name, '');
                                clearSuggestions();
                            }}
                            searchOptions={{
                                types: ['(regions)'],
                                componentRestrictions: { country: countryCode?.toLowerCase() }
                            }}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <InputContainer>
                                    <Input
                                        {...getInputProps({
                                            placeholder: placeHolder ?? '',
                                            className: 'ant-input'
                                        })}
                                        disabled={!countryCode}
                                    />
                                    {suggestions.length > 0 && (
                                        <AutocompleteContainer className="ant-select-dropdown">
                                            {suggestions.map((suggestion, index) => {
                                                let className = 'ant-select-item ant-select-item-option ';

                                                if (suggestion.active) className += 'ant-select-item-option-active';
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className
                                                        })}
                                                        key={index}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                            <div className="google-img-container">
                                                <img src={''} alt="Google image" width={100} />
                                            </div>
                                        </AutocompleteContainer>
                                    )}
                                </InputContainer>
                            )}
                        </PlacesAutocomplete>
                        <ErrorText>{hasError && error}</ErrorText>
                    </Container>
                );
            }}
        </Field>
    );
};

interface ContainerProps {
    width?: string;
}
const Container = styled.div<ContainerProps>`
    width: ${(props) => props.width};
`;
const InputContainer = styled.div`
    position: relative;
`;
const Input = styled.input`
    width: 100%;
    border-radius: 2vh !important;
    border: 1px solid #008ac9 !important;
    color: rgba(0, 0, 0, 0.65);
    height: 32px;
    padding: 0 11px;
    outline: none;
`;

const AutocompleteContainer = styled.div`
    width: inherit;
    padding: 4px 0;
    border: 1px solid rgb(0, 138, 201);
    border-radius: 15px !important;
    position: absolute;
    background-color: #fff;
    z-index: 1005;
    max-height: 256px;
    overflow-y: overlay;
    overflow-anchor: none;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

    top: 32px;
    left: 0;
    .suggestion-item {
        padding: 5px 12px;
        position: relative;
    }

    .google-img-container {
        padding: 15px 12px 5px 12px;
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }
`;
LocationSearchInput.defaultProps = {
    width: '100%'
};
export default LocationSearchInput;
