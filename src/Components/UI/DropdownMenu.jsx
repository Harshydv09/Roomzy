// src/Components/UI/DropdownMenu.jsx - Placeholder
import React from 'react';


export function DropdownMenu({ children }) { return <div>{children}</div>; }

export function DropdownMenuTrigger({ children }) {

    return <button>{children}</button>;
}

export function DropdownMenuContent({ children }) {

    return <div className="border bg-white shadow-lg p-2 absolute z-30">{children}</div>;
}

export function DropdownMenuItem({ children }) {

    return <div className="p-1 hover:bg-gray-100 cursor-pointer">{children}</div>;
}


export function DropdownMenuSeparator() {
    return <div className="my-1 h-px bg-gray-200" />;
}