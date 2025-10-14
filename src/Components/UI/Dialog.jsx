
import React from 'react';



export function Dialog({ children }) {
    return <div className="fixed inset-0 bg-black/50 flex items-center justify-center">{children}</div>;
}

export function DialogContent({ children }) {
    return <div className="bg-white p-6 rounded shadow-lg">{children}</div>;
}

export function DialogHeader({ children }) {
    return <div className="mb-4 font-bold">{children}</div>;
}

export function DialogTitle({ children }) {
    return <h3 className="text-xl">{children}</h3>;
}


export function DialogFooter({ children }) {
    return <div className="mt-4 flex justify-end">{children}</div>;
}