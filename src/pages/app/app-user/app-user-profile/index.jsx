import Heading from '../../../../components/global/Heading';
import ProfileDetail from '../../../../components/app/app-user-profile/ProfileDetail';
import AppUserTable from '../../../../components/app/app-user-profile/appUserTable/AppUserTable';
import Axios from '../../../../config/api';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { setDocDetails } from '../../../../redux/slices/appUserSlice';
import { useParams } from 'react-router-dom';
import DisplayError from '../../../../components/global/DisplayError';
import ItemNotFound from '../../../../components/global/ItemNotFound';
import Loader from '../../../../components/global/Loader';

const AppUserProfile = () => {
  const { docDetails } = useSelector((state) => state.appUser);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isLoading, isError, error } = useQuery(
    ['fetch-single-user', id],
    () => Axios.get(`/user/${id}`),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      onSuccess: (res) => {
        const {
          data: {
            data: { doc },
          },
        } = res;

        dispatch(setDocDetails(doc));
      },
    }
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      <Heading />

      {isLoading && <Loader />}

      {isError && (
        <DisplayError message={error?.message || 'Something went wrong'} />
      )}

      {!isLoading && !isError && docDetails && <ProfileDetail />}

      {!isLoading && !isError && !docDetails && (
        <ItemNotFound message="No app user detail found." />
      )}

      <AppUserTable />
    </div>
  );
};

export default AppUserProfile;
