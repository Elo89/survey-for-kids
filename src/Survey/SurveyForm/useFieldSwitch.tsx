import { useMemo } from 'react';
import Input from '../../design-system/Forms/Input';
import { RadioGroup } from '../../design-system/Forms/Radio';

interface PropType {
  type: FieldMappingEnum,
}

enum FieldMappingEnum {
  text = 'text',
  number = 'number',
  checkbox = 'checkbox',
  radio = 'radio',
}

type FieldMappingType = {
  [Field in FieldMappingEnum]?: any
}

const fieldMapping: FieldMappingType = {
  [FieldMappingEnum.text]: Input,
  [FieldMappingEnum.number]: Input,
  [FieldMappingEnum.radio]: RadioGroup,
}

function useFieldSwitch({ type }: PropType) {
  const Component = useMemo(
    () => fieldMapping[type], 
    [type]
  );

  return ({ Component });
}

export default useFieldSwitch;
