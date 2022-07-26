import { Flex } from '../../design-system/Styled';
import { Header1 } from '../../design-system/Typography';

interface PropType {
  message: string,
}

function FeedbackScreen({ message }: PropType) {
  return (
    <Flex
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Header1 color={'white'} textAlign="center">{message}</Header1>
    </Flex>
  );
}

export default FeedbackScreen;
