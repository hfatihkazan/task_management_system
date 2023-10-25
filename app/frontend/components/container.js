import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import SortableItem from "./sortableItems";

const containerStyle = {
    background: "#dadada",
    padding: 10,
    margin: 10,
    flex: 1
};

export default function Container(props) {
    const { id, items,label } = props;

    const { setNodeRef } = useDroppable({
        id
    });

    return (
        <SortableContext
            id={id}
            items={items}
            strategy={verticalListSortingStrategy}
        >

            <div ref={setNodeRef} style={containerStyle}>
                <h4 style={{"textAlign":"center"}}>{label}</h4>

                {items.map((id) => (
                    <SortableItem key={id} id={id} />
                ))}
            </div>
        </SortableContext>

    );
}
