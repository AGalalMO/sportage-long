import React from 'react';
import ScrollSequence from '@src/modules/ImageSequence';
import InteriorFeatureSlider from '@src/features/slider';
import { interior } from 'public/assets/seq/seq';

const ParallaxSection = () => {
    return (
        <section className="relative bg-transparent" >
            <div className="relative z-[1]">
                <ScrollSequence
                    id="canvas22"
                    imagesUrl={interior}
                    totalFrames={interior?.length}
                />
            </div>

            <div className="relative z-[2] -mt-[18vh] md:-mt-[24vh]">
                <div className="relative h-[120vh] w-screen overflow-hidden">
                    <div className="pointer-events-none min-h-[20vh]  to-transparent" style={{
                        background: 'linear-gradient(180deg, #00000000 0%, #06141f 100%)'
                    }} />

                    <div  className="relative z-[1] flex   w-screen h-screen items-center justify-center bg-[#06141F]">
                        <InteriorFeatureSlider />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ParallaxSection;
