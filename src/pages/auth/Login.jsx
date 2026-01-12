import { useState } from 'react';
import InputName from '../../components/global/form/InputName';
import PasswordInput from '../../components/global/form/InputPassword.jsx';
import LogoSvg from '../../assets/svgs/LogoSvg.jsx';
import LeftPinkButterfullySvg from '../../assets/svgs/LeftPinkButterfullySvg.jsx';
import RightPinkButterfullySvg from '../../assets/svgs/RightPinkButterfullysvg.jsx';
import { validateLoginForm } from '../../validations/loginValidation.js';
import { useDispatch,useSelector } from 'react-redux';
import {login}  from  '../../redux/actions/authActions.js'
import { useNavigate } from 'react-router-dom';
import SubmitLoading from '../../components/global/SubmitLoading';


const Login = () => {

 const dispatch =useDispatch();
 const navigate=useNavigate();

  const { loading  } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

const handleSubmit = async () => {
  const validationErrors = validateLoginForm(formData);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  const payload = {
    identifier: formData.email,
    password: formData.password,
  };

  console.log('Form submitted:', payload);

  dispatch(login(payload, navigate));

  setFormData({ email: '', password: '' });
};


  return (
    <div className="w-full h-screen flex items-center justify-center px-4 relative">
      <div className="absolute left-0 top-0 w-full h-[60%] z-5 bg-light-cyan">
        <div className="w-full h-full relative">
          {/* Left SVG */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <LeftPinkButterfullySvg className={' w-[100px] h-[100px]   md:w-auto md:h-auto  hidden  sm:block '} />
          </div>

          {/* Right SVG */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <RightPinkButterfullySvg  className={' w-[100px] h-[100px]   md:w-auto md:h-auto    hidden  sm:block'} />
          </div>
        </div>
      </div>

      <div className="relative z-10 lg:w-[40%] xl:w-[35%] md:w-[70%] w-full bg-white px-9 py-9 rounded-[20px] shadow-[30px_34px_50px_0px_#0B323F1A] flex flex-col gap-6">
        <LogoSvg />

        <div className="flex flex-col gap-2">
          <h2 className=" text-[25px] sm:text-[30px] md:text-[32px] font-bold">Welcome Back</h2>
          <p className="text-darkGreen text-sm sm:tex-base">
            Let's login into your IAMGifted Foundation account first
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <InputName
            label="Email"
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
          />

          <PasswordInput
            label="Password"
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
          />

   <button
  onClick={handleSubmit}
  disabled={loading}
  className="w-full h-[50px] text-sm sm:text-base rounded-full bg-black text-white cursor-pointer relative
             transition-colors duration-500 ease-in-out hover:bg-gray-200 hover:text-black
             disabled:opacity-70 disabled:cursor-not-allowed"
>
  {loading ? <SubmitLoading size={12} /> : 'Continue'}
</button>

        </div>
      </div>
    </div>
  );
};

export default Login;
