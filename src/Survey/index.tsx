import React from 'react';
import { Div } from '../design-system/Styled';
import { Header1, Text1 } from '../design-system/Typography';

interface PropType {
  surveyConf: any,
}

function Survey({ surveyConf }: PropType) {  
  return (
    <>
      {surveyConf?.map((survey: any, index: string) => 
        <Div key={`survey-${index}`} background={['blue', 'red', 'green']}>
            <Header1>{survey.question}</Header1>
            {survey?.options?.map((opt: any, index: string) =>
              <Text1 key={`opt-${index}`}>{opt.text}</Text1>
            )}
        </Div>
      )}
    </>
  );
}

export default Survey;
