import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ id, children, title, dropPosition, activeColumn }) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-md h-[400px] relative overflow-y-auto"
        // style={{ backgroundColor: isOver ? "gray" : undefined }}
        >
            <div className="sticky top-0 flex items-center bg-gray-50/70 px-4 py-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-900/10 backdrop-blur-sm dark:bg-gray-700/70 dark:text-gray-200 dark:ring-black/10">
                <header className="flex justify-between items-start mb-2">
                    <h2 className="capitalize text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
                </header>
            </div>
            {children}

            {/* <h3 className="capitalize font-semibold mb-4">{title}</h3>
            {children} */}
        </div>
    );
};

export default Droppable;


