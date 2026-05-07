import { Linkedin, Facebook, Network, Youtube, Instagram, TwitterIcon, } from "lucide-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
export default function Footer ({ removeMedia }) {
    const { locale, pathname } = useRouter()
    const { t, i18n } = useTranslation('common')
    const isArabic=i18n?.language=='ar'
    return (
        <>
          
{pathname.includes('configurator')?null:
<>
                    
                    <div
                        style={{
                            background:'linear-gradient(180deg, #00000000 0%, #000000 100%)'
                    }}
                        dir={'ltr'} className={`! w-full  flex  flex-col lg:flex-row  items-center h-[15vh] py-10 lg:py-0  ${removeMedia ? 'justify-center' : 'justify-between'}  px-10 relative `}>

                        <div className={`flex flex-col gap-2 items-center justify-center lg:justify-start ${removeMedia ? 'lg:items-center' :'lg:items-start'}`}>
                            <img src='/assets/images/logoWhite.png' width={100} height={37} loading="lazy" decoding="async" />
                            <div className='flex justify-center gap-4  items-start   ' style={{ direction: 'ltr' }}>

                                <p><span style={{ fontSize: '11px', color: '#A3A8AD' }} className=" font-['InterRegular']">© 2025 All Right Reserved. Kia Middle East</span></p>

                            </div>
                        </div>
                        {removeMedia ? null : <div className=' flex flex-wrap justify-center  gap-4 items-center   '>
                            <a href='https://worldwide.kia.com/int/kia-global-websites' target="_blank" rel="noopener">
                                <img src='/assets/world.png' className='w-[24px] h-[24px]' loading="lazy" decoding="async" />
                            </a>
                            <a href='https://www.facebook.com/KiaMiddleEastandAfrica/' target="_blank" rel="noopener">
                                <img src='/assets/fb.png' className='w-[24px] h-[24px]' loading="lazy" decoding="async" />
                            </a>
                            <a href='https://x.com/KIA__MEA' target="_blank" rel="noopener">
                                <img src='/assets/x.png' className='w-[24px] h-[24px]' loading="lazy" decoding="async" />
                            </a>

                            <a href='https://www.instagram.com/kia_mea/' target="_blank" rel="noopener">
                                <Instagram className='text-white' width={24} height={24} />
                            </a>
                            <a href="https://www.linkedin.com/company/kia-middle-east-africa/" target="_blank" rel="noopener">
                                <img src='/assets/link.png' className='w-[24px] h-[24px]' loading="lazy" decoding="async" />
                            </a>
                            <a href='https://www.youtube.com/channel/UClAYWjFznLNw3saZHA5OkNw' target="_blank" rel="noopener">
                                <Youtube className='text-white' width={24} height={24} />
                            </a>
                            <a href='https://www.tiktok.com/@kia.mea' target="_blank" rel="noopener">
                                <img src='/assets/tiktok.png' className='w-[24px] h-[24px]' loading="lazy" decoding="async" />
                            </a>

                            <a href='https://www.snapchat.com/add/kia-mea' target="_blank" rel="noopener">
                                <img src='/assets/snap.png' className='w-[24px] h-[24px]' loading="lazy" decoding="async" />
                            </a>



                        </div>}
                      

                        <div className={`${removeMedia ?'hidden':'opacity-0'}`}>
                            <img src='/assets/images/logoWhite.png' width={100} height={37} loading="lazy" decoding="async" />
                            <div className='flex justify-center gap-4  items-center   ' style={{ direction: 'ltr' }}>

                                <p><span style={{ fontSize: '11px', color: '#A3A8AD' }} className=" font-['InterRegular']">© 2025 All Right Reserved. Kia Middle East</span></p>

                            </div>
                        </div>

                    </div></>
              
}
</>


       )
}

const SvgDivider = () => (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ zIndex: '150' }} height={250} viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path fill="white" d="M0,6V0h1000v100L0,6z"></path>
    </svg>
);
