import DashboardCard   from '../../../components/app/dashboard/DashboardCard';
import DashboardChart   from '../../../components/app/dashboard/Dashboardchart/DashboardChart';
import DashboardTable   from '../../../components/app/dashboard/DashboardTable'
import Heading  from '../../../components/global/Heading';


const Dashboard = () => {
    return (
     
            <div className='flex  flex-col  gap-6 w-full'>
                 <Heading/>
               <DashboardCard/>
               <DashboardChart/>
               <DashboardTable/>
              
            </div>
          
       
    )
}

export default Dashboard