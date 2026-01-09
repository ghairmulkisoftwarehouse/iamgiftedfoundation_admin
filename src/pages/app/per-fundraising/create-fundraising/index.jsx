import FundraisningForm  from '../../../../components/app/create-fundraisnig/FundraisningForm';
import Heading  from '../../../../components/global/Heading';


const CreateFundraising = () => {
  return (
    <div  className='flex  flex-col  gap-6 w-full'>
          <Heading/>
        <FundraisningForm/>
    </div>
  )
}

export default CreateFundraising