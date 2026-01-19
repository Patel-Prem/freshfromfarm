import { useState, useRef, useEffect } from 'react';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function Calender() {

    const [calendarOpen, setCalendarOpen] = useState(false);
    const calenderRef = useRef();

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        color: '#4ade80', // ✅ Provide a color string
    });

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (calenderRef.current && !calenderRef.current.contains(e.target)) {
                setCalendarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <div className="relative grid gap-2" ref={calenderRef}>
                <button
                    onClick={() => setCalendarOpen((prev) => !prev)}
                    id="date"
                    className="min-w-[15.5rem] justify-start border-gray-200 bg-white px-2.5 text-left font-medium text-gray-600 border hover:border-gray-300 hover:text-gray-800 dark:border-gray-700/60 dark:!bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-100 rounded"
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="radix-:r0:"
                    data-state="closed"
                >
                    <svg
                        className="ml-1 mr-2 mt-2 fill-current text-gray-400 dark:text-gray-500"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                    >
                        <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z"></path>
                        <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z"></path>
                    </svg>

                    {selectionRange.startDate.toDateString()} - {selectionRange.endDate.toDateString()}

                </button>
                <div className="absolute mt-2 top-full left-0 z-50">
                    {calendarOpen && (
                        <DateRange
                            ranges={[selectionRange]}
                            onChange={(ranges) => {
                                setSelectionRange({
                                    ...ranges.selection,
                                    color: '#4ade80', // ✅ Must persist the color on update
                                });
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
