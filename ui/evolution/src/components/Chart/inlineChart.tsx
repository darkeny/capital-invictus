import React from 'react';

const InlineChart: React.FC = () => {

    return (
        <>
            <div className="flex justify-center sm:justify-end items-center gap-x-4 mb-3 sm:mb-6">
                <div className="inline-flex items-center">
                    <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
                    <span className="text-[13px] text-gray-600 dark:text-neutral-400">
                        Income
                    </span>
                </div>
                <div className="inline-flex items-center">
                    <span className="size-2.5 inline-block bg-purple-600 rounded-sm me-2"></span>
                    <span className="text-[13px] text-gray-600 dark:text-neutral-400">
                        Outcome
                    </span>
                </div>
            </div>

            <div id="hs-multiple-area-charts-compare-two-tooltip"></div>
            
        </>
    );
};

export { InlineChart };
