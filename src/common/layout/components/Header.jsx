'use client';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import SideMenu from './SideMenu';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const locale = router.locale;
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // Don't render content until client-s\ide hydration is complete
  if (!mounted) {
    return null;
  }

  return (
    <>
      {router.pathname.includes('configurator') ? null : (
        <header className="top-0 flex fixed z-[20000] left-0 w-full   px-12 items-center justify-between h-12  bg-[#06141F00]"
          
          style={{
            backdropFilter:'blur(5px) brightness(0.7)'
          }}
          dir='ltr'>
          <div className="w-full  items-center hidden lg:flex justify-between px-5">
            <img
              src="/assets/images/logoWhite.png"
              width={80}
              height={20}
              alt="Logo"
              className="h-[20px]"
            />
            <div className='flex gap-2 items-center ' dir={locale == 'ar' ? 'rtl' : 'ltr'}>
              <p className={`cursor-pointer ${router?.asPath =='/#highlights' ?"text-white":'text-[#FFFFFFAD]'}  ps-2 xl:ps-4 text-center   hover:text-white ${locale == 'en' ? 'font-["InterRegular"]' : 'font-["GSSMedium"]'}  text-sm  `} onClick={() => router.push('/#highlights')}>{t('Highlights')}</p>
             
              <p className={`cursor-pointer ${router?.asPath =='/#exterior'?"text-white":'text-[#FFFFFFAD]'}  ps-2 xl:ps-4 text-center   hover:text-white ${locale == 'en' ? 'font-["InterRegular"]' : 'font-["GSSMedium"]'}  text-sm `} onClick={() => router.push('/#exterior')}>{locale == 'ar'?'التصميم الخارجي': 'Exterior'} </p>
             

              <p className={`cursor-pointer ${router?.asPath =='/#interior'?"text-white":'text-[#FFFFFFAD]'}  ps-2 xl:ps-4 text-center   hover:text-white ${locale == 'en' ? 'font-["InterRegular"]' : 'font-["GSSMedium"]'}  text-sm `} onClick={() => router.push('/#interior')}>{locale == 'ar' ?'التصميم الداخلي': 'Interior'} </p>
             

              <p className={`cursor-pointer ${router?.asPath =='/#style'?"text-white":'text-[#FFFFFFAD]'}  ps-2 xl:ps-4 text-center   hover:text-white ${locale == 'en' ? 'font-["InterRegular"]' : 'font-["GSSMedium"]'}  text-sm `} onClick={() => router.push('/#style')}>{locale == 'ar' ? 'Style':'Style'}</p>
             
             

              <p className={`cursor-pointer ${router?.asPath =='/#kiaConnect'?"text-white":'text-[#FFFFFFAD]'}  ps-2 xl:ps-4 text-center   hover:text-white  !font-["InterRegular"]   text-sm `} onClick={() => router.push('/#performance')}>{ 'Performance'}</p>
              <p className={`cursor-pointer ${router?.asPath =='/#safety'?"text-white":'text-[#FFFFFFAD]'}  ps-2 xl:ps-4 text-center   hover:text-white ${locale == 'en' ? 'font-["InterRegular"]' : 'font-["GSSMedium"]'}  text-sm `} onClick={() => router.push('/#safety')}>{t('Safety')}</p>
             

              <p className={`cursor-pointer ${router?.asPath =='/#specs'?"text-white":'text-[#FFFFFFAD]'}  ps-2 xl:ps-4 text-center   hover:text-white ${locale == 'en' ? 'font-["InterRegular"]' : 'font-["GSSMedium"]'}  text-sm `} onClick={() => router.push('/#specs')}>{t('specso')}</p>

            </div>
            <a href={`/${locale == 'en' ? 'ar' : ''}${router.asPath.replace('/', '')}`} className={`!text-[#FFFFFFAD] text-[17px] font-semibold ${locale == 'ar' ? 'font-["InterBold"]' : 'font-["GSSMedium"]'} `}> {locale=='en'?"العربية":"English"}</a>
          </div>
        
          <button onClick={toggleMenu} className="p-2 !cursor-pointer lg:hidden">
            <Menu className="w-6 h-6 text-white" />
          </button>
          <div className="flex-1 flex justify-center md:hidden">
            <img
              src="/assets/images/logoWhite.png"
              width={'110px'}
              height={'50px'}
              alt="Logo"
              className="h-[30px]"
            />
          </div>
        </header>
      )}
     

      {/* Always render SideMenu but control visibility with isOpen prop */}
      <SideMenu toggleMenu={toggleMenu} isOpen={isOpen} />
    </>
  );
}


