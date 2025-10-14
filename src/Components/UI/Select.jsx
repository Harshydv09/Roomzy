
import React from 'react';


export function Select({ children }) { return <div>{children}</div>; }
export function SelectTrigger({ children }) { 
    return <button className="border p-2 rounded w-full">{children}</button>;
}
export function SelectContent({ children }) { 
    return <div className="border p-2 absolute bg-white shadow-lg z-20">{children}</div>;
}
export function SelectItem({ children }) { 
    return <div className="p-1 hover:bg-gray-100">{children}</div>;
}
export function SelectValue({ children }) { 
    return <span>{children}</span>;
}