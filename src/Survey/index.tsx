import { useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Flex } from '../design-system/Styled';
import SurveyForm from './SurveyForm';

import 'swiper/css';
import useIsMobile from '../hooks/useIsMobile';
import Stepper from '../design-system/Stepper';
import FeedbackScreen from './FeedbackScreen';

interface PropType {
  surveyConf: any,
}

function Survey({ surveyConf }: PropType) {
  const [active, setActive] = useState<number>(0);
  const isMobile = useIsMobile();

  const onActiveIndexChange = useCallback((swiper: any) => {              
    setActive(swiper.realIndex)
  }, []);
 
  return (
    <Flex 
      height={["calc(100vh - 230px)", "calc(100vh - 150px)"]}
      flexDirection={["column", 'row']}
    >
      <Flex
        width={['100%', '80px']}
        minHeight={["80px", '100%']}
        bg="#FBCAFF"
        alignItems="center"
        justifyContent="center"
      >
        <Stepper surveyConf={surveyConf} indexActive={active} />
      </Flex>
      <Flex flex={1}>
        <Flex 
          position="relative"
          width={["100%", "calc(100vw - 80px)"]}
          height="100%"
          maxHeight="100%"
          flexWrap="wrap"
          flex={1}
          >
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            noSwiping
            noSwipingClass="swiper-slide"
            onActiveIndexChange={onActiveIndexChange}
            direction={isMobile ? 'horizontal': 'vertical'}
          >
            {surveyConf?.map((survey: any, index: number) => 
              <SwiperSlide key={`survey-${index}`}>
                <SurveyForm survey={survey} />
              </SwiperSlide>
            )}
            <SwiperSlide>
              <Flex 
                background="#ffca00"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                p={4}
                height="100%"
              >
                <FeedbackScreen 
                  message="Survey completata"
                  data-testid="complete-survey"
                />
              </Flex>
            </SwiperSlide>
          </Swiper>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Survey;
