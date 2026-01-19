import { useState, useEffect } from "react";
import {
    DndContext,
    rectIntersection,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import Droppable from "./Droppable";

import Backbutton from "../Utilities/Backbutton";

import { getOrders, changeStatus } from "../../api/orderAPI"

// const initialData = {
//     pending: [
//         { id: "order-1", name: "Order #1" },
//         { id: "order-2", name: "Order #2" },
//         { id: "order-3", name: "Order #3" },
//         { id: "order-4", name: "Order #4" },
//         { id: "order-5", name: "Order #5" },
//         { id: "order-6", name: "Order #4" }
//     ],
//     processing: [
//         { id: "order-7", name: "Order #7" },
//         { id: "order-8", name: "Order #8" },
//         { id: "order-9", name: "Order #9" }
//     ],
//     shipped: [],
//     delivered: [],
//     cancelled: [],
//     returned: [],
// };

const OrderBoard = () => {
    const [columns, setColumns] = useState({
        pending: [],
        processing: [],
        shipped: [],
        delivered: [],
        cancelled: [],
        returned: [],
    });

    const [activeOrder, setActiveOrder] = useState(null);

    const [dropPosition, setDropPosition] = useState({
        id: null,
        placement: null,
        columnId: null,
    });

    const sensors = useSensors(useSensor(PointerSensor));


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // const data = await getOrders();
                const res = await getOrders();
                const data = res.data.merchantOrders

                // Group by status
                const grouped = {
                    pending: [],
                    processing: [],
                    shipped: [],
                    delivered: [],
                    cancelled: [],
                    returned: [],
                };

                data.forEach((order) => {
                    const col = grouped[order.status] || grouped.pending;
                    col.push({
                        id: order._id,
                        name: `Order #${order._id.slice(-5)}`, // optional display
                    });
                });

                setColumns(grouped);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            }
        };

        fetchOrders();
    }, []);

    const findContainer = (id) => {
        if (id in columns) return id;
        return Object.keys(columns).find((key) =>
            columns[key].some((item) => item.id === id)
        );
    };

    const handleDragStart = (event) => {
        setActiveOrder(event.active.id);
        setDropPosition({ id: null, placement: null, columnId: null });
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) {
            setDropPosition({ id: null, placement: null, columnId: null });
            return;
        }

        const sourceColumn = findContainer(active.id);
        const targetColumn = findContainer(over.id);

        if (!sourceColumn || !targetColumn) {
            setDropPosition({ id: null, placement: null, columnId: null });
            return;
        }

        if (over.id === targetColumn) {
            // Dropped on empty column space
            setDropPosition({ id: null, placement: "after", columnId: targetColumn });
            return;
        }

        const overElement = document.getElementById(over.id);
        if (!overElement) {
            setDropPosition({ id: null, placement: null, columnId: null });
            return;
        }

        const rect = overElement.getBoundingClientRect();
        const pointerY = event.pointerCoordinates?.y ?? 0;

        const placement = pointerY > rect.top + rect.height / 2 ? "after" : "before";

        setDropPosition({ id: over.id, placement, columnId: targetColumn });
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setDropPosition({ id: null, placement: null, columnId: null });

        if (!over) {
            setActiveOrder(null);
            return;
        }

        const sourceColumn = findContainer(active.id);
        const targetColumn = findContainer(over.id);

        if (!sourceColumn || !targetColumn) {
            setActiveOrder(null);
            return;
        }

        const activeIndex = columns[sourceColumn].findIndex(
            (item) => item.id === active.id
        );

        let targetIndex;
        const targetItems = columns[targetColumn];

        if (over.id === targetColumn) {
            targetIndex = targetItems.length;
        } else {
            const overElement = document.getElementById(over.id);
            if (!overElement) {
                targetIndex = targetItems.length;
            } else {
                const rect = overElement.getBoundingClientRect();
                const pointerY = event.pointerCoordinates?.y ?? 0;

                const insertAfter = pointerY > rect.top + rect.height / 2;

                const overIndex = targetItems.findIndex((item) => item.id === over.id);
                targetIndex = insertAfter ? overIndex + 1 : overIndex;
            }
        }

        if (sourceColumn === targetColumn) {
            if (activeIndex !== targetIndex) {
                const newItems = arrayMove(columns[sourceColumn], activeIndex, targetIndex);
                setColumns((prev) => ({
                    ...prev,
                    [sourceColumn]: newItems,
                }));
            }
        } else {
            const movingItem = columns[sourceColumn][activeIndex];
            const newSourceItems = columns[sourceColumn].filter(
                (item) => item.id !== active.id
            );
            const newTargetItems = [...columns[targetColumn]];
            newTargetItems.splice(targetIndex, 0, movingItem);

            setColumns((prev) => ({
                ...prev,
                [sourceColumn]: newSourceItems,
                [targetColumn]: newTargetItems,
            }));

            try {
                await changeStatus(movingItem.id, { updatedStatus : targetColumn})
            } catch (err) {
                console.error("Failed to update status:", err);
            }
        }

        setActiveOrder(null);
    };

    const handleDragCancel = () => {
        setDropPosition({ id: null, placement: null, columnId: null });
        setActiveOrder(null);
    };

    return (
        <>
            <div
                id="orderBoard"
                className="max-w-9xl mx-auto w-full bg-gray-100 px-4 py-8 dark:bg-gray-900 sm:px-6 lg:px-8"
            >
                <div className="mb-8 sm:flex sm:items-center sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:text-3xl">
                            Order Borad
                        </h1>
                    </div>
                    <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
                        <Backbutton />
                    </div>
                </div>

                <DndContext
                    sensors={sensors}
                    collisionDetection={rectIntersection}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                >
                    {/* <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
                    <div className="grid grid-cols-12 gap-6">

                        {Object.keys(columns).map((columnKey) => {
                            const items = columns[columnKey];

                            return (
                                <Droppable
                                    key={columnKey}
                                    id={columnKey}
                                    title={columnKey}
                                    dropPosition={dropPosition}
                                    activeColumn={dropPosition?.columnId}
                                >
                                    <SortableContext
                                        items={items.map((item) => item.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {items.length === 0 ? (
                                            dropPosition &&
                                                dropPosition.columnId === columnKey &&
                                                dropPosition.id === null &&
                                                dropPosition.placement === "after" ? (
                                                <div
                                                    style={{
                                                        height: 2,
                                                        backgroundColor: "red",
                                                        margin: "6px 0",
                                                        borderRadius: 1,
                                                    }}
                                                />
                                            ) : null
                                        ) : (
                                            items.map((item, index) => {
                                                const isDraggingItem = item.id === activeOrder;

                                                const isDropLineBefore =
                                                    dropPosition &&
                                                    dropPosition.columnId === columnKey &&
                                                    dropPosition.id === item.id &&
                                                    dropPosition.placement === "before";

                                                const isDropLineAfter =
                                                    dropPosition &&
                                                    dropPosition.columnId === columnKey &&
                                                    dropPosition.id === item.id &&
                                                    dropPosition.placement === "after";

                                                return (
                                                    <div key={item.id}>
                                                        {/* Red line before item */}
                                                        {isDropLineBefore && (
                                                            <div
                                                                style={{
                                                                    height: 2,
                                                                    backgroundColor: "rgba(128,128,128, 0.5)",
                                                                    margin: "6px 0",
                                                                    borderRadius: 1,
                                                                }}
                                                            />
                                                        )}

                                                        <SortableItem
                                                            id={item.id}
                                                            name={item.name}
                                                            style={{
                                                                visibility: isDraggingItem ? "hidden" : "visible",
                                                            }}
                                                        />

                                                        {/* Red line after item */}
                                                        {isDropLineAfter && (
                                                            <div
                                                                style={{
                                                                    height: 2,
                                                                    backgroundColor: "rgba(128,128,128, 0.5)",
                                                                    margin: "6px 0",
                                                                    borderRadius: 1,
                                                                }}
                                                            />
                                                        )}

                                                        {/* If last item, also show red line if dropping at end */}
                                                        {index === items.length - 1 &&
                                                            dropPosition &&
                                                            dropPosition.columnId === columnKey &&
                                                            dropPosition.id === null &&
                                                            dropPosition.placement === "after" && (
                                                                <div
                                                                    style={{
                                                                        height: 2,
                                                                        backgroundColor: "rgba(128,128,128, 0.5)",
                                                                        margin: "6px 0",
                                                                        borderRadius: 1,
                                                                    }}
                                                                />
                                                            )}
                                                    </div>
                                                );
                                            })
                                        )}
                                    </SortableContext>
                                </Droppable>
                            );
                        })}
                    </div>

                    <DragOverlay>
                        {activeOrder ? (
                            <SortableItem
                                id={activeOrder}
                                name={
                                    Object.values(columns)
                                        .flat()
                                        .find((item) => item.id === activeOrder)?.name || ""
                                }
                                dragOverlay
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </>
    );
};

export default OrderBoard;
