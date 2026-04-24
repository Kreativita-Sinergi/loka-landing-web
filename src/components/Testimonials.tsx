import React from 'react';
import { testimonials } from '@/data/testimonials';

const ICONS = ['🍽️', '☕', '🏪'];

const Testimonials: React.FC = () => {
    return (
        <div className="grid gap-6 max-w-lg w-full mx-auto lg:gap-6 lg:grid-cols-3 lg:max-w-full">
            {testimonials.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
                >
                    {/* Icon + Header */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                            {ICONS[index]}
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-900">{item.name}</h3>
                            <p className="text-xs text-red-500 font-medium mt-0.5">{item.role}</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* Solution */}
                    <p className="text-sm text-gray-600 leading-relaxed">{item.message}</p>
                </div>
            ))}
        </div>
    );
};

export default Testimonials;
