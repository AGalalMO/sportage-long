import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
const VRControls = ({  onViewChange, view}) => {
  const { t } = useTranslation('common');
  const {locale}=useRouter()  
  return (
    <div
      className="vr-controls"
      style={{
        borderRadius: '10px',
        color: 'white',
      }}
    >
      <div id={'styling'}>
        <div  className='flex w-full justify-center gap-5 mt-2 lg:mt-0' >
          <button className={`text-sm lg:text-base rounded-lg w-auto lg:w-[134px] text-white  hover:bg-white px-6 lg:px-4  py-1.5 lg:py-[10px] bg-[#06141F] hover:text-[#06141F]  btn-showRoom ${locale=='ar'?'font-["GSSBold"]':'font-["InterBold"]'} cursor-pointer `} onClick={() => onViewChange('exterior')}
>             {t('exterior.name')}</button>
          <button className={`text-sm lg:text-base rounded-lg w-auto lg:w-[134px] text-white hover:bg-white px-6 lg:px-4  py-1.5 lg:py-[10px] bg-[#06141F] hover:text-[#06141F]  btn-showRoom ${locale == 'ar' ? 'font-["GSSBold"]' : 'font-["InterBold"]'} cursor-pointer `}
            // onClick={() => onViewChange('interior')}
          >
          
            {t('interior.name')}
          
           
          </button>

        
        </div>
      </div>
    </div>
  );
};

export default VRControls;
