import React, { Suspense, ReactElement } from 'react';
import FallbackUI from '../../components/FallbackUI'
import { Box, Button, Center, Flex, Stack, IconButton, Wrap, WrapItem } from '@chakra-ui/react';


interface AccountPageLayoutProps {
  children: ReactElement | ReactElement[];
}

const AccountPageLayout = ({ children }: AccountPageLayoutProps) => {
  return (
    <React.Fragment>
      <Flex style={{ minHeight: '100vh' }} overflow="hidden">
        <Suspense fallback={<FallbackUI/>}>
            <Center w={{ base: '100%' }} pt={{ base: 10, md: 'unset' }}>
              {children}
            </Center>
        </Suspense>
      </Flex>
    </React.Fragment>
  );
};

export default React.memo(AccountPageLayout);
