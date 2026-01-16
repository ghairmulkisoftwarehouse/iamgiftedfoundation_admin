
import Heading  from '../../../../components/global/Heading';
import ProfileDetail   from '../../../../components/app/app-user-profile/ProfileDetail';
import AppUserTable   from '../../../../components/app/app-user-profile/appUserTable/AppUserTable';
const AppUserProfile = () => {
    return (
     
            <div className='flex  flex-col  gap-6 w-full'>
              <Heading/>
              <ProfileDetail/>
              <AppUserTable/>
            </div>
          
       
    )
}

export default AppUserProfile;