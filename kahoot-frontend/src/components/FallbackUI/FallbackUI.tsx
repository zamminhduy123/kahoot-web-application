import React from 'react';
import { Spinner } from '@chakra-ui/react';

export interface Props {}

const FallbackUI: React.FC<Props> = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: '#EBECEF',
      }}
    >
      <Spinner size="xl" label="Loading..."></Spinner>
    </div>
  );
};

export default FallbackUI;
