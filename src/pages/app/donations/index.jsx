
import Heading  from '../../../components/global/Heading';
import DonationsTable   from '../../../components/app/donations/DonationsTable';

const Donations = () => {
    return (
     
            <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
              <DonationsTable/>
            
              
            </div>
          
       
    )
}

export default Donations;