import dynamic from 'next/dynamic';
import { exterior1 } from 'public/assets/seq/seq';
import { Engine } from 'public/assets/svg/engine';
import { Terrain } from 'public/assets/svg/otain';
import { WarrantySVG } from 'public/assets/svg/warranty';

const ScrollSequence = dynamic(() => import('../../modules/ImageSequence'), {
    ssr: false,
});

export default function Hero () {
    return (
        <ScrollSequence
            imagesUrl={exterior1}
            totalFrames={exterior1?.length}
            heroData={{
                heading: 'KIA SPORTAGE L 2027',
                subheading: 'The City Top Choice',
                specs: [
                    {
                        icon: <Terrain />,
                        title: '1.6L TURBO',
                        subtitle: 'I am text block',
                    },
                    {
                        icon: <Engine />,
                        title: '1.6L TURBO',
                        subtitle: 'I am text block',
                    },
                    {
                        icon: <WarrantySVG />,
                        title: '5 YEARS WARRANTY',
                        subtitle: '150,000 Km *WCF',
                    },
                ],
            }}
            isHero={true}
        />
    );
}
