import { Flex } from '../Styled';
import { Header1 } from '../Typography';

const iconPath = process.env.PUBLIC_URL + '/assets/images/';

function Header() {
  return (
    <Flex 
      alignItems="center"
      justifyContent="center"
      bg="#00D7FF"
      height="150px"
      data-testid={'header-title'}
    >
      <img
        src={`${iconPath}logo.png`}
        width="100px"
        alt="Logo"
        style={{
          margin: "20px"
        }}
      />
      <Header1 color="primary" fontWeight={700} mr={4}>Survey for Kids</Header1>
    </Flex>
  );
}

export default Header;
