import { Loader } from "../loader/loader";

export interface ButtonProps {
    label: string;
    onClick?: () => void;
    loading?: boolean;
    variant: 'primary' | 'secondary'|"danger";
    size?: 'small' | 'medium' | 'large';
    loader?: React.ReactNode;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    width?: string;
    height?: string;
}
const variants:Record<"primary"|"secondary"|"danger", string> = {
    primary:"bg-gray-900 text-white rounded-md",
    secondary:"border-2 border-gray-900 text-gray-900 rounded-md",
    danger:"border-2 border-red-900 text-red-900 font-semibold rounded-md",
}
const sizes:Record<"small"|"medium"|"large", string> = {
    small:"",
    medium:"",
    large:""
}
const defaultStyle="w-full py-2 flex justify-center items-center"
//in the className default style is at start, so that it can be overridden by the variant and size styles
export const Button=(props:ButtonProps)=>{
    return (
        <>
      
            <button className={`${defaultStyle} ${variants[props.variant]} ${props.size?sizes[props.size]:"h-"+props.height+" w-"+props.width} `}
                     onClick={props.onClick} >
               {props.loading?<Loader/>:<>{props.startIcon}<span className="">{props.label}</span>{props.endIcon}</>}
           </button>
        
        </>
    )
}