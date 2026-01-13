import { PulseLoader } from 'react-spinners';

const SubmitLoading = ({ size = 10, color="#fff" }) => {
  return <PulseLoader size={size} color={color} />;
};

export default SubmitLoading;
