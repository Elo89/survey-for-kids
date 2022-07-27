import { Flex } from '../../design-system/Styled';
import { Header1 } from '../../design-system/Typography';

interface PropType {
  message: string,
}

function FeedbackScreen({ message, ...props }: PropType) {
  return (
    <Flex
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Header1 color={'white'} textAlign="center" {...props}>{message}</Header1>
    </Flex>
  );
}

export default FeedbackScreen;
