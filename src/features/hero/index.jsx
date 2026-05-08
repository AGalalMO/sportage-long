import dynamic from 'next/dynamic';
import { exterior1 } from 'public/assets/seq/seq';
import DriveModeIcon from 'public/assets/svg/drivemode';
import { Engine } from 'public/assets/svg/engine';
import { Terrain } from 'public/assets/svg/otain';
import { WarrantySVG } from 'public/assets/svg/warranty';
import { useTranslation } from 'react-i18next';

const ScrollSequence = dynamic(() => import('../../modules/ImageSequence'), {
    ssr: false,
});

export default function Hero () {
    const {t}=useTranslation('common')
    return (
        <ScrollSequence
            imagesUrl={exterior1}
            totalFrames={exterior1?.length}
            heroData={{
                heading: 'KIA SPORTAGE L 2027',
                subheading: t('tagline'),
                specs: [
                    {
                        icon: <Engine />,
                        title: t('specs.engine')?.split('/')?.[0],
                        subtitle: t('specs.engine')?.split('/')?.[1],
                    },
                    {
                        icon: <Terrain />,
                        title: t('specs.transmission')?.split('/')?.[0],
                        subtitle: t('specs.transmission')?.split('/')?.[1],
                    },
                    {
                        icon: <DriveModeIcon />,
                        title: t('specs.driveMode')?.split('/')?.[0],
                        subtitle: t('specs.driveMode')?.split('/')?.[1],
                    },
                    {
                        icon: <WarrantySVG />,
                        title: t('specs.warranty')?.split('/')?.[0],
                        subtitle: t('specs.warranty')?.split('/')?.[1],
                    },
                ],
            }}
            isHero={true}
        />
    );
}
