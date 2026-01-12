import { PulseLoader } from 'react-spinners';

const SubmitLoading = ({ size = 10 }) => {
  return <PulseLoader size={size} color="#fff" />;
};

export default SubmitLoading;
