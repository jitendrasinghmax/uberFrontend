import React from "react";

export interface InputProps {
    name?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    otp?:boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    variant: "primary" | "danger";
    warning?: string | null;
    ref?: React.Ref<HTMLInputElement>; // Updated type
}

const variants: Record<"primary" | "danger", string> = {
    primary: "bg-gray-100 text-gray-900 rounded-lg ",
    danger: "border-2 border-red-900 text-red-900 font-semibold rounded-sm",
};

const defaultStyle = "w-full p-x-4 py-2 bg-gray-50 text-md font-semibold";
const otpStyle= "w-full p-1 py-2 bg-gray-200 border-gray-400 border-2 text-md font-semibold"

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <div className="flex gap-y-2 flex-col">
            {props.label && <h1 className="font-bold text-md">{props.label}</h1>}
            <input
                name={props.name}
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                ref={ref} // Correctly forwarded ref
                onChange={props.onChange}
                className={` ${props.otp===true?otpStyle:defaultStyle} ${variants[props.variant]} `}
            />
            {props.warning && <h1 className="text-red-500 text-sm font-semibold">{props.warning}</h1>}
        </div>
    );
});