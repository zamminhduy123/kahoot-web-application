import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

export interface ReferralProps {}

const NotFound = (props: ReferralProps) => {
  return (
    <div className="error">
      <div className="container-floud">
        <div className="col-xs-12 text-center">
          <div className="container-error-404">
            <div className="clip">
              <div className="shadow">
                <span className="digit thirdDigit">4</span>
              </div>
            </div>
            <div className="clip">
              <div className="shadow">
                <span className="digit secondDigit">0</span>
              </div>
            </div>
            <div className="clip">
              <div className="shadow">
                <span className="digit firstDigit">4</span>
              </div>
            </div>
          </div>
          <div className="h1">Look like you're lost</div>
          <div className="semi">The page you are looking for not available!</div>
          <Link to='/'>
            <Box as="button" borderRadius="md" bg="pink.600" color="white" px={4} h={8}>
              Back to my dashboard
            </Box>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
