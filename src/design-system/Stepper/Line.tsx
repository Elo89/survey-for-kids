import { Div } from '../Styled';

interface PropType {
  indexActive: number,
  index: number,
}

function Line({ indexActive, index }: PropType) {
  return (
    <Div
      borderTop={["6px solid", "0 solid"]}
      borderLeft={["0 solid", "6px solid"]}
      borderRadius={'3px'}
      borderColor={indexActive >= index ? ["primary", "primary"] : ["white", "white"]}
      width={['30px', 0 ]}
      height={[0, '50px']}
      m={2}
    />
  );
}

export default Line;
