interface InputProps { 
    placeholder: string; 
    reference?: any,
    className?: string
}

export function Input({placeholder, reference,className}: InputProps) {
    return <div>
        <input ref={reference} placeholder={placeholder} type={"text"} className={` ${className}  px-4 py-2 border rounded   ` }></input>
    </div>
}