import { useForm } from 'react-hook-form';
import Button from '../../design-system/Button';
import { Flex } from '../../design-system/Styled';
import { Header1, Text1 } from '../../design-system/Typography';
import FeedbackScreen from '../FeedbackScreen';
import useFieldSwitch from './useFieldSwitch';
import useCallState from './useCallState';

interface PropType {
  survey: any,
}

function SurveyForm({ survey }: PropType) {
  const { register, handleSubmit } = useForm();
  const { Component: FieldComponent } = useFieldSwitch({ type: survey?.type });
  const { onSubmit, bgColor, state, isLoading } = useCallState({ survey });

  return (
    <Flex 
      background={bgColor}
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      p={4}
      height={'100%'}
    >
      
      {state === 'edit' && 
        <>
          <Header1 mb={5}>{survey.stepName}</Header1>
          <Text1 mb={4}>{survey.question}</Text1>
          <Flex
            as={'form'}
            alignItems={'center'}
            flexDirection={'column'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FieldComponent
              {...register('field', {required: true})}
              register={register}
              type={survey.type}
              options={survey.options}
            />

            <Button
              buttonType="submit"
              type='primary'
              mt={4}
              isLoading={isLoading}
            >
              avanti
            </Button>
          </Flex>
        </>
      }
      {state === 'success' && 
        <FeedbackScreen message="La risposta è esatta" />
      }
      {state === 'error' && 
        <FeedbackScreen message="La risposta è errata" />
      }
    </Flex>
  );
}

export default SurveyForm;
