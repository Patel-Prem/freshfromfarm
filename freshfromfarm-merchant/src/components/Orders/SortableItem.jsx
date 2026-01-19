import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const SortableItem = ({ id, name, dragOverlay, style = {} }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen((open) => !open);
    };

    // When dragOverlay is true, apply lifted styles + transform
    const dragOverlayStyle = dragOverlay
        ? {
            boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
            border: "2px solid rgba(128,128,128, 0.5)",
            borderRadius: 8,
            transform: CSS.Transform.toString(transform),
            transition,
            cursor: "grabbing",
            opacity: 1,
            margin: 8,
        }
        : {
            cursor: isDragging ? "grabbing" : "grab",
            // no transform or opacity to keep normal spacing
        };

    return (
        <div
            id={id}
            ref={setNodeRef}
            style={{ ...dragOverlayStyle, ...style }}
            className="p-2 m-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md select-none border border-gray-600 border-solid dark:border-gray-600"
        >
            <div className="flex items-center justify-between">
                <button
                    onClick={toggleOpen}
                    className="text-left flex-1 focus:outline-none"
                    type="button"
                >
                    {name}
                </button>
                <span
                    {...attributes}
                    {...listeners}
                    className={`cursor-grab text-gray-500 hover:text-gray-700`}
                    onClick={(e) => e.stopPropagation()}
                >
                    ⠿
                </span>
            </div>

            {isOpen && (
                <div className="border-t border-gray-600 p-3 mt-2">
                    ORDER DETAILS
                </div>
            )}
        </div>
    );
};

export default SortableItem;
