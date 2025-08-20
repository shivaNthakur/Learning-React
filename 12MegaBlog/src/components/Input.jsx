import React, { useId } from 'react';

const Input = React.forwardRef( function Input({
    label,
    type="text",
    className="",
    ...props
},ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label className='inline-block pl-1 mb-1' htmlFor={id}>
                    {label}
            </label>
            }
            <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} 
            ref={ref}
            {...props}
            id={id}
            />
            
        </div>
    )
})

export default Input;


// We use forwardRef when we are having component elsewhere and we are using it on every input but input is on login page then we use it to pass refrence from components

// Video 23 timeStamp: 34min