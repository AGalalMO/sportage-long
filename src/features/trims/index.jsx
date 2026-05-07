import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const TRIMS = ['LX', 'EX', 'SX', 'SX Prestige'];

const CATEGORIES = [
    {
        key: 'engine',
        label: { en: 'ENGINE', ar: 'المحرك' },
        rows: [
            {
                feature: { en: 'Engine Type', ar: 'نوع المحرك' },
                values: ['2.5L MPI', '1.6L T-GDI', '1.6L T-GDI', '1.6L T-GDI HEV'],
            },
            {
                feature: { en: 'Horsepower', ar: 'القدرة الحصانية' },
                values: ['187 HP', '187 HP', '187 HP', '227 HP'],
            },
            {
                feature: { en: 'Torque', ar: 'عزم الدوران' },
                values: ['178 lb-ft', '195 lb-ft', '195 lb-ft', '258 lb-ft'],
            },
            {
                feature: { en: 'Transmission', ar: 'ناقل الحركة' },
                values: ['8-Speed AT', '8-Speed DCT', '8-Speed DCT', '6-Speed AT'],
            },
        ],
    },
    {
        key: 'dimensions',
        label: { en: 'DIMENSIONS', ar: 'الأبعاد' },
        rows: [
            {
                feature: { en: 'Length', ar: 'الطول' },
                values: ['4,515 mm', '4,515 mm', '4,515 mm', '4,515 mm'],
            },
            {
                feature: { en: 'Width', ar: 'العرض' },
                values: ['1,865 mm', '1,865 mm', '1,865 mm', '1,865 mm'],
            },
            {
                feature: { en: 'Height', ar: 'الارتفاع' },
                values: ['1,685 mm', '1,685 mm', '1,685 mm', '1,685 mm'],
            },
            {
                feature: { en: 'Wheelbase', ar: 'قاعدة العجلات' },
                values: ['2,755 mm', '2,755 mm', '2,755 mm', '2,755 mm'],
            },
        ],
    },
    {
        key: 'technology',
        label: { en: 'TECHNOLOGY', ar: 'التقنية' },
        rows: [
            {
                feature: { en: 'Infotainment Screen', ar: 'شاشة المعلومات والترفيه' },
                values: ['8"', '10.25"', '10.25"', '12.3"'],
            },
            {
                feature: { en: 'Digital Cluster', ar: 'لوحة العدادات الرقمية' },
                values: ['—', '—', '12.3"', '12.3"'],
            },
            {
                feature: { en: 'Wireless Apple CarPlay', ar: 'Apple CarPlay لاسلكي' },
                values: ['—', '✓', '✓', '✓'],
            },
            {
                feature: { en: 'Wireless Android Auto', ar: 'Android Auto لاسلكي' },
                values: ['—', '✓', '✓', '✓'],
            },
        ],
    },
    {
        key: 'safety',
        label: { en: 'SAFETY', ar: 'السلامة' },
        rows: [
            {
                feature: { en: 'Forward Collision Avoidance', ar: 'تجنب الاصطدام الأمامي' },
                values: ['✓', '✓', '✓', '✓'],
            },
            {
                feature: { en: 'Lane Keeping Assist', ar: 'مساعد الحفاظ على المسار' },
                values: ['✓', '✓', '✓', '✓'],
            },
            {
                feature: { en: 'Blind Spot Collision Warning', ar: 'تحذير التصادم في النقطة العمياء' },
                values: ['—', '✓', '✓', '✓'],
            },
            {
                feature: { en: 'Driver Attention Warning', ar: 'تحذير انتباه السائق' },
                values: ['—', '—', '✓', '✓'],
            },
        ],
    },
];

export default function TrimsSection () {
    const { i18n } = useTranslation('common');
    const isAr = i18n.language === 'ar';

    const [openCategories, setOpenCategories] = useState({ engine: true });

    const toggleCategory = (key) => {
        setOpenCategories((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <section
            className="relative w-screen min-h-screen flex flex-col items-center justify-center py-20 px-4"
            style={{ backgroundColor: '#06141F' }}
            dir={isAr ? 'rtl' : 'ltr'}
        >
            {/* Header */}
            <div className="text-center mb-10">
                <p
                    className="text-xs tracking-[0.3em] uppercase text-white/70 font-[InterBold] "
                    style={{ fontFamily: isAr ? 'GSSMedium' : 'InterBold' }}
                >
                    {isAr ? 'المواصفات' : 'SPECIFICATIONS'}
                </p>
                <h2
                    className="text-4xl md:text-3xl font-[InterBold]  text-white mt-4"
                    style={{ fontFamily: isAr ? 'GSSBold' : 'InterBold' }}
                >
                    {isAr ? 'مقارنة الفئات' : 'Compare Trims'}
                </h2>
            </div>

            {/* Table */}
            <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10">
                {/* Column Headers */}
                <div
                    className="grid border-b border-white/10"
                    style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', backgroundColor: '#192632' }}
                >
                    <div
                        className="py-4 px-6 text-white/40 text-xs tracking-widest uppercase"
                        style={{ fontFamily: isAr ? 'GSSLight' : 'InterLight' }}
                    >
                        {isAr ? 'الميزة' : 'FEATURE'}
                    </div>
                    {TRIMS.map((trim) => (
                        <div
                            key={trim}
                            className="py-4 px-4 text-white text-sm text-center"
                            style={{ fontFamily: isAr ? 'GSSBold' : 'InterBold' }}
                        >
                            {trim}
                        </div>
                    ))}
                </div>

                {/* Categories */}
                {CATEGORIES.map((cat) => {
                    const isOpen = !!openCategories[cat.key];
                    return (
                        <div key={cat.key}>
                            {/* Category Header Row */}
                            <button
                                onClick={() => toggleCategory(cat.key)}
                                className="w-full flex items-center gap-3 py-4 px-6 border-b border-white/10 hover:bg-white/5 transition-colors"
                                style={{ backgroundColor: '#0d1a26' }}
                            >
                                <span
                                    className="text-white/60 text-lg leading-none"
                                    style={{ transform: isOpen ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}
                                >
                                    ›
                                </span>
                                <span
                                    className="text-white text-xs tracking-widest uppercase"
                                    style={{ fontFamily: isAr ? 'GSSBold' : 'InterBold' }}
                                >
                                    {isAr ? cat.label.ar : cat.label.en}
                                </span>
                            </button>

                            {/* Category Rows */}
                            {isOpen &&
                                cat.rows.map((row, rowIdx) => (
                                    <div
                                        key={rowIdx}
                                        className="grid border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                                        style={{
                                            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                                            backgroundColor: rowIdx % 2 === 0 ? 'transparent' : '#192632',
                                        }}
                                    >
                                        <div
                                            className="py-4 px-6 text-white/60 text-sm"
                                            style={{ fontFamily: isAr ? 'GSSLight' : 'InterRegular' }}
                                        >
                                            {isAr ? row.feature.ar : row.feature.en}
                                        </div>
                                        {row.values.map((val, i) => (
                                            <div
                                                key={i}
                                                className={`py-4 px-4 text-sm text-center ${val === '✓'
                                                        ? 'text-white'
                                                        : val === '—'
                                                            ? 'text-white/20'
                                                            : 'text-white/80'
                                                    }`}
                                                style={{ fontFamily: isAr ? 'GSSLight' : 'InterRegular' }}
                                            >
                                                {val}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
