import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SwiperSection = ({ noBg, dark, id = 0, height, bottom }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);
    const touchCurrentXRef = useRef(0);
    const isDraggingRef = useRef(false);
    const { t, i18n } = useTranslation('common');
const isArabic=i18n?.language=='ar'
    const slides1Slides = [
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/f44c6bdf-0295-4e7c-02b4-bc1b8f973d00/public',
            featureTitle: isArabic ? `عجلات ألمنيوم 17 إنش مع إطارات لجميع التضاريس` : '17” Alloy Wheels with All-Terrain Tires',
            featureDescription: isArabic ? `تصميم نظيف وواثق يمزج الأداء اليومي بالأناقة المتحفظة. تمنح هذه العجلات كيا سبورتاج لمسة راقية.` : 'A clean, confident design that blends everyday performance with understated style. These alloys bring a refined edge to your sportage’s foundation.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/0d1507c4-c94f-45c8-33df-c29ba19ab800/public',
            featureTitle: isArabic ?`مصابيح أمامية LED`: 'LED Projection Headlights',
            featureDescription: isArabic ? `مصابيح سبورتاج الأمامية بتقنية LED تضيء الطريق بوضوح ودقة , مثالية للقيادة أثناء الليل او النهار في مختلف الظروف.` : 'Shine brighter, see further. The sportage’s LED headlights cut through the dark with precision and clarity – built for late-night drives and early starts.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/2dc0d5c1-4ee1-496b-ffff-d0f1c1e16400/public',
            featureTitle: isArabic ?`مصابيح خلفية LED`: 'LED Rear Lights',
            featureDescription: isArabic ? `تأتي كيا سبورتاج بمصابيح خلفية مزدوجة LED تنتج إضاءة ساطعة وواضحة لرؤية وأمان أفضل. هذه المصابيح تعزز من الشكل العصري للسيارة وتجعلك مرئيًا بوضوح أمام جميع مستخدمي الطريق في شتى الظروف.` : "The Kia sportage is equipped with distinctive full LED rear combination lamps that provide bright, clear illumination for enhanced visibility and safety. These LED rear lights contribute to the vehicle's modern, confident design while ensuring you are clearly seen by other road users in all conditions."
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/275d62e7-19c7-41b1-eb22-f88ea4a7ab00/public',
            featureTitle: isArabic ?`قضبان سقف`: 'Roof Rack',
            featureDescription: isArabic ?`مصممة لتحمل المزيد ، حيث تزيد من سعة التخزين، لكي تأخذ كل أغراضك أينما اتجهت مغامراتك.`: 'Built for extra cargo and bigger adventures – the roof rack expands your carrying capacity, so you can take more gear wherever the road leads.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/25192b86-b024-4ee0-54d5-6674344f9c00/public',
            featureTitle: isArabic ?`عتبات جانبية`: 'Side Steps',
            featureDescription: isArabic ?`مصنوعة لتتحمل وترتقي بالمظهر القوي. العتبات الجانبية تضيف لمسة مغامرة عملية، وتجعل دخول وخروج السيارة أكثر سهولة ، مثالية لمن يحبون الطرق الوعرة.`: 'Built tough with a no-nonsense look, the pipe-type sidestep adds off-road flair and practical access. Ideal for those who like their ride a little rougher around the edges.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/d0a780d6-59e9-477f-04d2-310e71f4ad00/public',
            featureTitle: isArabic ?`عتبات ركنية`: 'Corner Steps',
            featureDescription: isArabic ?`تم تثبيت عتبة عند زوايا الصندوق الخلفي لسهولة الدخول والخروج وتحميل الأمتعة.`: 'A step has been installed in the rear corner to make it easier to get on and off the bed.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/9158b597-5bfe-4a3c-daee-1e7595366b00/public',
            featureTitle: isArabic ?`تخزين جانبي في الرفارف`: 'Fender Side Storage',
            featureDescription: isArabic ?`تخزين مبتكر وآمن مدمج بسلاسة في الرفارف ، مثالي للأدوات أو المعدات التي تحتاجها في التنقل.`: 'Smart, secure, and seamlessly built into the fender — perfect for stashing tools, gear, or anything you need on the go.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/c92d72f0-d329-4ff2-e090-fc98f0bafd00/public',
            featureTitle: isArabic ?`درع حماية سفلي`: 'Underbody Skid Plate',
            featureDescription: isArabic ? `لحماية أثناء مغامرات الطرق الوعرة، تأتي سبورتاج مزودة بدرع حماية سفلي صُلب يحمي الهيكل السفلي من الصخور والرواسب، ليحافظ على سلامة المكونات المهمة ويُعزّز صلابة المركبة واستعدادها لأقسى البيئات.` : "For serious off-road protection, the sportage comes with underbody skid plates. These robust plates shield the vehicle's undercarriage from rocks, debris, and rough terrain, helping to maintain critical component integrity when venturing off the beaten path. This feature reinforces the sportage's ruggedness and readiness for demanding environments.."
        }
    ];
   
    const swiper2Slides = [
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/d48b7706-7ab0-4d15-c40e-bb557f277b00/public',
            featureTitle: isArabic ?`مصباح باب جانبي`: 'Door Spot Lamp',
            featureDescription: isArabic ?`مصابيح الباب تضيء الأرضية والمحيط عند الدخول أو الخروج. تمنحك رؤية أفضل وأمان أعلى في الظلام، كما تنبّه المارة والمركبات الأخرى.`: "The door spot lamps are cleverly integrated on the front doors to illuminate the ground and surroundings when entering or exiting the vehicle. This feature enhances convenience and safety, especially in dark or low-light environments, by lighting your path and alerting nearby pedestrians or vehicles."
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/6647ac8c-52b0-4b1a-b195-b22f35d35d00/public',
            featureTitle: isArabic ?`نظام صوت Harman Kardon الفاخر`: 'Harman Kardon Premium Sound System',
            featureDescription: isArabic ?`ارتقِ بالتجربة السمعية ، نظام Harman Kardon يُقدّم صوتًا ثريًا وغامرًا لتجعل كل رحلة وكأنها جزء من مغامراتك.`: 'Crank it up or set the mood – the Harman Kardon system delivers rich, immersive audio that transforms every journey into a soundtrack-worthy experience.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/9ba40bd5-a780-4a3e-fda5-589fe37e9100/public',
            featureTitle: isArabic ?`تخزين متعدّد في التابلوه`: 'Crashpad Multi-Storage',
            featureDescription: isArabic ?`يوفر الدرج الموجود أمام مقعد الراكب مساحة تخزين إضافية للأشياء التي تود إبقاؤها قريبة وسهلة الوصول.`: 'The passenger seat crash pad storage space allows you to store items anywhere within reach.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/71549e8b-dffb-4d4a-9c06-8fd409ebcb00/public',
            featureTitle: isArabic ?`مقاعد خلفية قابلة للأمالة والأنزلاق`: 'Sliding & Reclining Rear Seats',
            featureDescription: isArabic ?`تمدد أو استرخِ كما تشاء، حيث تنزلق المقاعد الخلفية وتتحرك لتضمن أقصى درجات الراحة، سواء كنت تحمل أغراضك أو تحتاج إلى قسط من الراحة بعد يوم طويل.`: `Stretch out or settle in. The rear seats slide and recline for maximum comfort – whether you're loading up gear or lounging after a long day outdoors.`
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/69164a9b-4ac3-414e-299e-c500dcc24000/tv',
            featureTitle: isArabic ?`تخزين أسفل المقعد`: 'Under-Seat Storage',
            featureDescription: isArabic ?`تصميم ذكي لراحتك اليومية. يحتوي الصف الثاني على مساحة تخزين خفية بسعة 33 لترًا، مثالية للحفاظ على مقتنياتك آمنة ومنظمة وسهلة الوصول.`: `Smart design meets everyday convenience. The second-row packs 33 liters of hidden storage – perfect for keeping things tidy, secure, and easily accessible.`
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/8766195c-da08-4999-a010-1c9e6a319600/public',
            featureTitle: isArabic ?`مصباح صندوق التحميل`: 'Bed Lamp',
            featureDescription: isArabic ?`إضاءة LED قياسية لدعم التحميل الليلي براحة وسهولة.`: 'LED lighting is standard to support night loading.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/369879c6-5ca6-4ac3-bb6b-6ac9f0dbb100/public',
            featureTitle: isArabic ?`مقبس كهرباء في الصندوق`: 'Bed Power Outlet',
            featureDescription: isArabic ?`مقبس 220 فولت للراحة والكفاءة في العمل أو الرحلات الترفيهية.`: 'The 220V power outlet has improved work efficiency and leisure usability.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/b2d8b0b8-72a6-4257-4c45-2efd511afa00/public',
            featureTitle: isArabic ?`دواسات أرضية لجميع الفصول`: 'All-Weather Mat',
            featureDescription: isArabic ?`احمِ سيارتك من الداخل مع دواسات كيا الأصلية، والمصنوعة من خامات TPO عالية التحمل ومصممة بحواف مرتفعة لمنع دخول الأوساخ والسوائل، وتمنح سيارتك مظهرًا متجددًا في كل المواسم.`: "Keep your car clean and protected with Kia Genuine All Weather Mats. Crafted from durable TPO material and designed with raised sides, they effectively shield your vehicle's lower footwell from dirt, spills, and debris. Perfect for all seasons, these mats offer a custom fit for your Kia, enhancing both style and functionality."
        }
    ]
  
    const swiper3Slides = [
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/f06a30a2-7ec6-4ac3-80e2-0e4d750b0000/public',
            featureTitle: isArabic ?`هيكل على إطار`: 'Frame Body',
            featureDescription: isArabic ?`الهيكل المبني على الإطار يمنح المتانة في مواجهة الصدمات والطريق الوعر.`: 'Body-on-frame structure ensures durability from impacts when driving on rough roads.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/3d3a9997-dbd0-4628-2a56-749cfc9eda00/public',
            featureTitle: isArabic ?`وضعية X-Trek`: 'X-Trek Mode',
            featureDescription: isArabic ?`ركز على الطريق ودع السيارة تتكفل بالسرعة والكبح في التضاريس الصعبة. نمط الزحف يُساعدك على تسلق المنحدرات الحادة والنزول عنها بكل ثقة.`: 'Focus on the trail, not the throttle. Crawl Mode automatically controls speed and braking on rough terrain, so you can tackle steep climbs and descents with total confidence.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/40f27c6d-7b36-4e86-fbd9-8da77dfaf500/semi',
            featureTitle: isArabic ?`وضعية القيادة / التضاريس`: 'Drive / Terrain Mode',
            featureDescription: isArabic ? `أنماط متعددة للأداء الأمثل والسلامة في ظروف مثل الثلج، والطين، والرمال، الصخور. فعّل وضعية X-Trek للسيطرة الكاملة بسرعة منخفضة في التضاريس الأصعب.` : "Terrain modes optimizes performance & safety across various conditions such as Snow, Mud, Desert & Rock. Activate the X-Trek mode (low speed cruise control) for driving on especially difficult terrain at low speeds."
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/bf199f41-1282-40b3-17e6-260397980800/public',
            featureTitle: isArabic ?`قدرة اجتياز المياه`: 'Wading',
            featureDescription: isArabic ? `مصممة لتخطي أصعب التضاريس وعبور المياه بقدرة غمر تصل إلى 800 مم بسرعة أقل من 7 كم/س. مع مدخل هواء عالي داخل الرفرف الأمامي لمنع تسرب الماء، وتوصيلات كهربائية مقاومة للماء لضمان القوة والاعتمادية في مغامراتك.` : "Designed to tackle challenging terrain and water crossings, the Kia sportage offers a confident wading capability of up to 800mm depth at speeds under 7 km/h. The engineering includes a high air intake positioned inside the front fender to prevent water ingress, along with waterproof connectors for critical components, ensuring durability and reliability during off-road adventures."
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/87dcae85-2e22-40e0-abc9-eafceb0e2500/public',
            featureTitle: isArabic ?`شاشة معلومات للطرق الوعرة`: 'Off-road Screen',
            featureDescription: isArabic ?`تصلك بمعلومات حالة السيارة الضرورية لقيادة أكثر أمانًا ومتعة خارج الطرق المعبدة.

*قد تختلف توفر صفحة الطرق الوعرة (واجهة المستخدم) ونظام مراقبة الأرض حسب المنطقة وتكوين السيارة.*`: `Provides vehicle status information necessary for off-road driving, providing a safer and more enjoyable driving experience.`,
      
         dis: isArabic ? `
توفر صفحة الطرق الوعرة (واجهة الطرق الوعرة) ونظام عرض الرؤية الأرضية يعتمد على الاختلافات الإقليمية وتجهيزات المركبة المحددة.`: 'The availability of the Off-Road Page (Off-Road GUI) and Ground View Monitor is subject to regional differences and specific vehicle configurations.'

        
        
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/f48cc070-cc92-42f7-c123-d32ea6959800/public',
            featureTitle: isArabic ?`نظام مراقبة الأرض (GVM)`: 'Ground View Monitor (GVM)',
            featureDescription: isArabic ?`احصل على رؤية كاملة لما يختبئ أسفل وأمام سيارتك. نظام GVM يُساعدك على عبور المسارات الضيقة والمناطق الصخرية بكل ثقة.

*قد تختلف توفر صفحة الطرق الوعرة (واجهة المستخدم) ونظام مراقبة الأرض حسب المنطقة وتكوين السيارة.*`: 'Get a clear view of what’s directly beneath and in front of your sportage. The Ground View Monitor helps you navigate tight trails, rocky paths, and tricky terrain with confidence.',
        
         dis: isArabic ? `
توفر صفحة الطرق الوعرة (واجهة الطرق الوعرة) ونظام عرض الرؤية الأرضية يعتمد على الاختلافات الإقليمية وتجهيزات المركبة المحددة.`: 'The availability of the Off-Road Page (Off-Road GUI) and Ground View Monitor is subject to regional differences and specific vehicle configurations.'

        
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/51850fdf-eb13-4bed-37e0-44e865cb9e00/public',
            featureTitle: isArabic ?`قفل تفاضلي إلكتروني (ELD)`: 'Electronic Locking Differential (ELD)',
            featureDescription: isArabic ? `مع نظام قفل تفاضلي إلكتروني وتوزيع عزم مُعدل للطرق الوعرة، تخوض سبورتاج الرمال والطين والأخاديد بثبات.` : 'With an electronic differential lock and off-road-tuned torque delivery, the sportage pushes through sand, mud, and ruts with confidence.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/e61fd259-8f73-439e-2823-2ba47d01e200/public',
            featureTitle: isArabic ?`وحدة تحكم بفرامل المقطورة (ITBC)`: 'Integrated Trailer Brake Controller(ITBC)',
            featureDescription: isArabic ?`عند ربط مقطورة بالسيارة، تساعد هذه الوحدة في التحكم بفرامل المقطورة لضمان سحب آمن وخالي من المشاكل.`: `When a trailer is connected to a vehicle, it is a device that helps control the trailer's brakes, helping to tow the trailer safely.`
        }
    ]
    const swiper4Slides = [
        {
            video: '/assets/videos/ktk-fca2.webm',
            featureTitle: isArabic ?`نظام مساعد لتجنب الاصطدام الأمامي  (FCA 2)`: 'Forward Collision-Avoidance Assist 2 (FCA2)',
            featureDescription: isArabic ?`يراقب هذا النظام محيطك ويقوم بتحذيرك في حال تحديد خطر اصطدام بمركبة أخرى أو بأحد المشاة أو راكب دراجة أمامك. يقوم نظام FCA 2 بتوقيف السيارة تلقائياً، كما يساعد في توجيه عجلة القيادة في حال قام بتحديد خطر الاصطدام بمركبة أو أحد المشاة أو راكب دراجة، بالقرب من الجهة الأمامية للسيارة.`: 'FCA 2 monitors the surroundings and automatically assists braking when the risk of collision increases with a vehicle, motorcyclist, pedestrian, or cyclist ahead; with an oncoming vehicle from the opposite side or from the left/right side at an intersection; or with a directly oncoming vehicle in the same lane. It also automatically assists steering when there is a risk of collision with an oncoming vehicle or a vehicle in the next lane while changing lanes, as well as with a vehicle or pedestrian on the edge of the lane.'
        },
        {
            video: '/assets/videos/ktk-lfa2.webm',
            featureTitle: isArabic ?`نظام المساعدة على اتباع المسار (LFA)`: 'Lane Following Assist 2 (LFA2)',
            featureDescription: isArabic ?`يستخدم هذا النظام كاميرا الرؤية الأمامية لمساعدتك على إبقاء السيارة في وسط المسار أثناء القيادة وذلك من خلال تحديد خطوط المسار أو السيارة التي أمامك.
`: 'LFA 2 helps center the vehicle in the lane. Steering control has been improved and a Hands-On Detection (HOD) sensor can determine whether the driver is holding the steering wheel for optimal system performance.'
        },
        {
            video: '/assets/videos/ktk-scc.webm',
            featureTitle: isArabic ?`نظام تثبيت السرعة الذكي (SCC)`: 'Smart Cruise Control (SCC)',
            featureDescription: isArabic ? `يساعدك في الحفاظ على مسافة آمنة من السيارة التي أمامك بالسرعة التي تحددها. ستتوقف سيارتك EV5 تلقائياً في حال توقفت السيارة التي أمامك فجأة، ثم تستأنف سيرها. أما إذا توقفت السيارة لمدة أطول، فيمكنك عندها متابعة السير من خلال الضغط على دواسة الوقود أو مفتاح +/-.` : 'SCC helps you drive at a preset speed while maintaining a safe distance from the vehicle ahead. It automatically brings the sportage to a stop then proceeds again when the vehicle ahead accelerates. If the stop is extended, you may need to press the accelerator pedal. When activated, SCC drives automatically, reflecting the learned driving style.'
        },
        {
            video: '/assets/videos/ktk-rspa.webm',
            featureTitle: isArabic ?`نظام المساعدة الذكي لركن السيارة عن بعد (RSPA)`: 'Remote Smart Parking Assist (RSPA)',
            featureDescription: isArabic ?`يتيح لك إمكانية ركن السيارة أو إخراجها من الموقف من دون أن تضطر لركوبها وذلك باستخدام تقنية الاستشعار حيث يقوم نظام RSPA 2 بتحديد مواقف السيارات، ثم يساعدك تلقائياً في توجيه السيارة والقيادة ونقل الحركة. أما في حال استشعر وجود عائق فيعمد النظام إلى توقيف المركبة تلقائياً. ويتميز هذا النظام المحسن بقدرته على التعرف على خطوط المواقف والمساعدة في الركن الموازي بالإضافة إلى خاصية التشغيل عن بُعد المحسنة.`: `RSPA lets you park in or exit a parking spot as you stand outside the vehicle. Using sensor technology, it automatically assists with steering, accelerating, decelerating and shifting, while also automatically braking if it senses an obstacle.`
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/ccb1515c-3eeb-4d00-8ec0-6258bff05800/public',
            featureTitle: isArabic ?`نظام المساعدة على تجنب الاصطدام الخلفي (RCTA)`: 'Rear Cross-Traffic Collision-Avoidance Assist',
            featureDescription: isArabic ?`يصدر النظام تحذيراً عند تحديد خطر الاصطدام بمركبة تقترب من اليسار أو اليمين عند الرجوع إلى الخلف كما يساعد تلقائياً في المناورة في حال تصاعد خطر الاصطدام.
`: `If a risk of collision with an approaching vehicle from the left or right is detected while reversing, a warning is given, and if the risk of collision increases even after the warning, the system automatically assists with braking.`
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/03fd8687-2076-4b77-d7a5-0d301d081600/public',
            featureTitle: isArabic ?`شاشة عرض النقطة العمياء (BVM)`: 'Blind-Spot View Monitor (BVM)',
            featureDescription: isArabic ?`عند تشغيل مفتاح إشارة الانعطاف، يتم عرض الصورة الجانبية الخلفية للاتجاه المقابل في لوحة العدادات`: 'BVM displays the rear-side image of the corresponding direction when the turn signal switch is engaged.'
        },
        {
            image: 'https://imagedelivery.net/2Dh6erMZ0IA4Y2r-mRikDg/052940fd-d6f0-47cc-b326-349fa1d0c700/public',
            featureTitle: isArabic ?`شاشة الرؤية المحيطة (SVM)`: 'Surround View Monitor (SVM)',
            featureDescription: isArabic ?`تعرض صور المركبة من كاميرات واسعة الزاوية لإظهار الرؤية المحيطية في أوضاع عرض مختلفة. توفر رؤية ثلاثية الأبعاد 360  درجة قابلة للتغيير.`: 'See it all, from every angle. The Surround View Monitor gives you a 360-degree bird’s-eye view of your surroundings – perfect for navigating tight trails or crowded city streets.'
        },
        
    ]
    const slides = [
        slides1Slides,
        swiper2Slides,
        swiper3Slides,
        swiper4Slides
    ]
    const changeSlide = (newSlideIndex) => {
        setIsAnimating(true);
        setCurrentSlide(newSlideIndex);

        // Reset animation state after animation completes
        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    const nextSlide = () => {
        const newIndex = (currentSlide + 1) % slides[id].length;
        changeSlide(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentSlide - 1 + slides?.[id].length) % slides?.[id].length;
        changeSlide(newIndex);
    };

    const goToSlide = (index) => {
        changeSlide(index);
    };

    const isMobileView = () => typeof window !== 'undefined' && window.innerWidth < 1024;

    const onTouchStart = (e) => {
        if (isAnimating || !isMobileView()) return;
        const touch = e.touches?.[0];
        if (!touch) return;
        touchStartXRef.current = touch.clientX;
        touchStartYRef.current = touch.clientY;
        touchCurrentXRef.current = touch.clientX;
        isDraggingRef.current = true;
    };

    const onTouchMove = (e) => {
        if (!isDraggingRef.current || !isMobileView()) return;
        const touch = e.touches?.[0];
        if (!touch) return;
        touchCurrentXRef.current = touch.clientX;
    };

    const onTouchEnd = () => {
        if (!isDraggingRef.current || !isMobileView()) return;
        const deltaX = touchCurrentXRef.current - touchStartXRef.current;
        const deltaY = Math.abs(touchStartYRef.current);
        isDraggingRef.current = false;
        // Trigger only for horizontal intent and sufficient distance
        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    };

    return (
        <div className={`w-full ${noBg ? '' : 'bg-[#06141F]'} ${height ? height : 'min-h-[50vh] lg:min-h-screen'} py-10 gap-16 flex flex-col justify-center items-center`} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>

            <div className="w-full flex items-center justify-between max-w-[1420px]">
                <div className=" flex-col items-center w-full lg:items-start lg:flex-row flex min-h-[600px] lg:h-[600px]">
                    {/* Left Section - Image with specific dimensions */}
                    {slides?.[id][currentSlide]?.image ?
                        <div className="w-[90%] lg:w-[550px] lg:ms-4 ms-0 xl:!w-[750px] h-[250px] lg:h-[400px] xl:!h-[600px] relative overflow-hidden">
                            <div
                                style={{
                                    backgroundImage: slides?.[id][currentSlide]?.image ? `url(${slides?.[id][currentSlide].image})` : 'null',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                                className="w-full h-full rounded-2xl"
                            />
                            {/* Navigation arrows */}
                            <button
                                onClick={prevSlide}
                                disabled={isAnimating}
                                className="absolute top-1/2 bg-[#06141f] lg:bg-transparent  lg:ms-0 left-[2px] lg:left-4 transform -translate-y-1/2 w-[30px] lg:w-12 h-[30px] lg:h-12 bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-4xl cursor-pointer transition-all duration-300 z-10 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-10 h-10 text-white/70 hover:text-white" />
                            </button>
                            <button
                                onClick={nextSlide}
                                disabled={isAnimating}
                                className="absolute top-1/2 bg-[#06141f] lg:bg-transparent   right-[2px] lg:right-4 transform -translate-y-1/2 w-[30px] lg:w-12 h-[30px] lg:h-12  bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-4xl cursor-pointer transition-all duration-300 z-10 disabled:opacity-50"
                            >
                                <ChevronRight className="w-10 h-10 text-white/70 hover:text-white" />
                            </button>
                        </div>
                        : <div className='relative w-[90%] lg:w-[550px] lg:ms-4 xl:!w-[750px]'>
                            <video src={slides?.[id]?.[currentSlide]?.video} className='w-full rounded-2xl object-cover md:w-[750px] h-[250px] lg:h-[400px] xl:!h-[600px]' muted playsInline autoPlay loop />
                            <button
                                onClick={prevSlide}
                                disabled={isAnimating}
                                className="absolute top-1/2 left-[2px] bg-[#06141f]   lg:bg-transparent md:left-4 transform -translate-y-1/2 w-[30px] lg:w-12 h-[30px] lg:h-12  bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-4xl cursor-pointer transition-all duration-300 z-10 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-10 h-10 text-white/70 hover:text-white" />
                            </button>
                            <button
                                onClick={nextSlide}
                                disabled={isAnimating}
                                className="absolute top-1/2 right-[2px] md:right-4   bg-[#06141f] lg:bg-transparent transform -translate-y-1/2 w-[30px] lg:w-12 h-[30px] lg:h-12  bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-4xl cursor-pointer transition-all duration-300 z-10 disabled:opacity-50"
                            >
                                <ChevronRight className="w-10 h-10 text-white/70 hover:text-white" />
                            </button>
                        
                        
                        </div>}
                  

                    {/* Right Section - Content */}
                    <div className="flex-1 pt-4  lg:p-12 lg:ps-8 lg:pe-0 pe-0 flex flex-col justify-between lg:justify-start  relative w-[90%] lg:h-[100%]">
                        <div className="text-white space-y-8 w-[90vw] lg:w-auto">
                            {/* Main description */}
                            

                            {/* Feature section */}
                            <div className="space-y-2 md:space-y-4 ">
                                <h3 className={`text-base md:text-2xl ${isArabic? "font-['GSSMedium']" : "font-[InterBold]"} font-bold  ${dark ? 'text-[#06141F] text-start' : "text-white"} text-start transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'
                                    }`}>
                                    {slides?.[id][currentSlide].featureTitle?.includes('17') ? <>
                                        {slides?.[id][currentSlide].featureTitle?.split('17')?.[0]}
                                        <span className='font-[InterBold]'>17</span>
                                        {slides?.[id][currentSlide].featureTitle?.split('17')?.[1]}
                                    </> : slides?.[id][currentSlide].featureTitle?.includes('LED') ? <>
                                        {slides?.[id][currentSlide].featureTitle?.split('LED')?.[0]}
                                        <span className='font-[InterBold]'>LED</span>
                                        {slides?.[id][currentSlide].featureTitle?.split('LED')?.[1]}
                                        </> : slides?.[id][currentSlide].featureTitle?.includes('Harman Kardon') ? <>
                                            {slides?.[id][currentSlide].featureTitle?.split('Harman Kardon')?.[0]}
                                            <span className='font-[InterBold]'>Harman Kardon</span>
                                            {slides?.[id][currentSlide].featureTitle?.split('Harman Kardon')?.[1]}
                                            </> : slides?.[id][currentSlide].featureTitle?.includes('X-Trek') ? <>
                                                {slides?.[id][currentSlide].featureTitle?.split('X-Trek')?.[0]}
                                                <span className='font-[InterBold]'>X-Trek</span>
                                                {slides?.[id][currentSlide].featureTitle?.split('X-Trek')?.[1]}
                                                </> : slides?.[id][currentSlide].featureTitle?.includes('(GVM)') ? <>
                                                    {slides?.[id][currentSlide].featureTitle?.split('(GVM)')?.[0]}
                                                    <span className='font-[InterBold]'>(GVM)</span>
                                                    {slides?.[id][currentSlide].featureTitle?.split('(GVM)')?.[1]}
                                    </> : slides?.[id][currentSlide].featureTitle?.includes('e-LD') ? <>
                                        {slides?.[id][currentSlide].featureTitle?.split('e-LD')?.[0]}
                                        <span className='font-[InterBold]'>e-LD</span>
                                        {slides?.[id][currentSlide].featureTitle?.split('e-LD')?.[1]}
                                                        </> : slides?.[id][currentSlide].featureTitle?.includes('ITBC') ? <>
                                                            {slides?.[id][currentSlide].featureTitle?.split('ITBC')?.[0]}
                                                            <span className='font-[InterBold]'>ITBC</span>
                                                            {slides?.[id][currentSlide].featureTitle?.split('ITBC')?.[1]}
                                                            </> : slides?.[id][currentSlide].featureTitle?.includes('FCA 2') ? <>
                                                                {slides?.[id][currentSlide].featureTitle?.split('FCA 2')?.[0]}
                                                                <span className='font-[InterBold]'>FCA 2</span>
                                                                {slides?.[id][currentSlide].featureTitle?.split('FCA 2')?.[1]}
                                                                </> : slides?.[id][currentSlide].featureTitle?.includes('LFA') ? <>
                                                                    {slides?.[id][currentSlide].featureTitle?.split('LFA')?.[0]}
                                                                    <span className='font-[InterBold]'>LFA</span>
                                                                    {slides?.[id][currentSlide].featureTitle?.split('LFA')?.[1]}
                                                                    </> : slides?.[id][currentSlide].featureTitle?.includes('SCC') ? <>
                                                                        {slides?.[id][currentSlide].featureTitle?.split('SCC')?.[0]}
                                                                        <span className='font-[InterBold]'>SCC</span>
                                                                        {slides?.[id][currentSlide].featureTitle?.split('SCC')?.[1]}
                                    </> : slides?.[id][currentSlide].featureTitle?.includes('RSPA') ? <>
                                        {slides?.[id][currentSlide].featureTitle?.split('RSPA')?.[0]}
                                        <span className='font-[InterBold]'>RSPA</span>
                                        {slides?.[id][currentSlide].featureTitle?.split('RSPA')?.[1]}
                                    </> :
                                                                                slides?.[id][currentSlide].featureTitle?.includes('RCTA') ? <>
                                                                                    {slides?.[id][currentSlide].featureTitle?.split('RCTA')?.[0]}
                                                                                    <span className='font-[InterBold]'>RCTA</span>
                                                                                    {slides?.[id][currentSlide].featureTitle?.split('RCTA')?.[1]}
                                                                                </> 
                                            : slides?.[id][currentSlide].featureTitle?.includes('BVM') ? <>
                                                {slides?.[id][currentSlide].featureTitle?.split('BVM')?.[0]}
                                                <span className='font-[InterBold]'>BVM</span>
                                                {slides?.[id][currentSlide].featureTitle?.split('BVM')?.[1]}
                                                                                    </> :
                                                slides?.[id][currentSlide].featureTitle?.includes('SVM') ? <>
                                                    {slides?.[id][currentSlide].featureTitle?.split('SVM')?.[0]}
                                                    <span className='font-[InterBold]'>SVM</span>
                                                    {slides?.[id][currentSlide].featureTitle?.split('SVM')?.[1]}
                                                </> :
                                        
                                        slides?.[id][currentSlide].featureTitle}
                                </h3>
                                <p className={`text-sm lg:text-lg leading-relaxed max-w-[80vw] ${dark ? 'text-[#54595F] text-start' : id == 0 ? 'text-[#A3A8AD]' : 'text-white'} ${isArabic ? "font-['GSSMedium']" : "font-[InterRegular]"} lg:max-w-full text-start transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'
                                    }`}>
                                    {slides?.[id][currentSlide].featureDescription}
                                </p>
                                {slides?.[id]?.[currentSlide]?.dis ? <p className={`text-[10px] lg:text-sm flex items-start gap-2   leading-relaxed max-w-[80vw] ${dark ? 'text-[#54595F] text-start' : id == 0 ? 'text-[#A3A8AD]' : 'text-white'} ${isArabic ? "font-['GSSMedium']" : "font-[InterRegular]"} lg:max-w-full text-start transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'
                                    }`}>
                                    <img src='/assets/iinnff.png' width={16} className='mt-1' height={16} loading="lazy" decoding="async" />
                                    {slides?.[id]?.[currentSlide]?.dis}
                                </p> :null}
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className={`relative mt-5 lg:absolute ${bottom ? 'bottom-[14%]' :'bottom-0 '} lg:bottom-8 end-0 lg:end-4 xl:end-0 justify-center lg:justify-start w-full lg:w-auto flex space-x-2`}>
                            {slides?.[id].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    disabled={isAnimating}
                                    className={`w-6 md:w-[40px] h-6 md:h-[40px] !font-[InterBold] flex items-center justify-center cursor-pointer text-base md:text-xl  ${isArabic ? "font-['GSSMedium']" : "font-[InterBold]"} transition-all duration-300 ${index === currentSlide
                                        ? `${dark ? 'bg-[#06141F] text-white' :'bg-white text-[#06141F]'}`
                                        : `${dark ? 'text-black border-black ' : 'text-white border-white '} border-b-2 border-solid hover:bg-opacity-20`
                                        } ${isAnimating ? 'opacity-50' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};