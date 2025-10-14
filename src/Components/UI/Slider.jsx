
import React from 'react';


export function Slider({ value, max, step, onValueChange, className, ...props }) {
   
    return (
        <div className={`p-2 ${className}`} {...props}>
            <input 
                type="range" 
                value={value?.[0] || 0} 
                max={max} 
                step={step} 
                onChange={(e) => onValueChange && onValueChange([Number(e.target.value)])}
                className="w-full"
            />
        </div>
    );
}