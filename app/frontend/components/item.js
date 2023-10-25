import React from "react";

export default function Item(props) {
    const { id } = props;

    const style = {
        width: "100%",
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        margin: "10px 0",
        background: "white"
    };

    return (
        <div style={style}>
            {id}
            <input/>
        </div>
    );
}