import { Flex } from '../Styled';
import { Text1 } from '../Typography';
import Line from './Line';
import { useCallback } from 'react';

interface PropType {
  surveyConf: any,
  indexActive: number,
}

function Stepper({ surveyConf, indexActive }: PropType) {
  const stepColor = useCallback((index: number) => {
    if (indexActive === index) 
      return 'highlight'; 
    if (indexActive >= index) 
      return 'primary'; 
    return 'white'
  }, [indexActive]);

  return (
    <Flex
      flexDirection={['row', 'column']}
      alignItems="center"
    >
      {surveyConf?.map((survey: any, index: number) =>
        <Flex 
          key={`step-${index}`}
          alignItems={["flex-start", "center"]}
          flexDirection={['row', 'column']}
          flex={1}
        >
          {index !== 0 && 
            <Line indexActive={indexActive} index={index} />
          }
          <Text1 
            width={'55px'}
            color={stepColor(index)}
          >
            {survey.stepName}
          </Text1>
        </Flex>
      )}
    </Flex>
  );
}



export default Stepper;
