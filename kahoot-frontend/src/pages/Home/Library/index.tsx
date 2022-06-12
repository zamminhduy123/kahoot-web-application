
import { Box, Heading, Center, SlideFade } from '@chakra-ui/react';
import HomePageLayout from '../HomePageLayout';
import LibraryList from './LibraryList';


export interface LoginProps {}

const Library = (props: LoginProps) => {
  return (
    <HomePageLayout>
      <SlideFade in={true} offsetY={100} unmountOnExit={true}>
        <LibraryList />
      </SlideFade>
    </HomePageLayout>
  );
};

export default Library;
