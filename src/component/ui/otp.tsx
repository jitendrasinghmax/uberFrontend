import React, { Dispatch, SetStateAction, useRef } from "react";
import { Input } from "./input";

export interface otpValueInterface {
    0: string;
    1: string;
    2: string;
    3: string;
}
interface propsInterface {
    otpValue: otpValueInterface;
    setOtpValue: Dispatch<SetStateAction<otpValueInterface>>;
}

const Otp = (props: propsInterface) => {
    const ref0 = useRef<HTMLInputElement>(null);
    const ref1 = useRef<HTMLInputElement>(null);
    const ref2 = useRef<HTMLInputElement>(null);
    const ref3 = useRef<HTMLInputElement>(null);

    const otpHandeler = (
        previous: React.RefObject<HTMLInputElement | null> | undefined,
        e: React.ChangeEvent<HTMLInputElement>,
        next: React.RefObject<HTMLInputElement | null>|undefined
    ) => {
        const { name, value } = e.target;
        if(value===""){
            props.setOtpValue((prev) => {
                return { ...prev, [name]: "" };
            });
        }

        if (value === "" && previous?.current) {
            previous.current.focus();
            return;
        }

        if (value.length === 1) {
            props.setOtpValue((prev) => {
                return { ...prev, [name]: value };
            });
            if (next?.current) {
                next.current.focus();
            }
        }
    };

    return (
        <>
            <div className="flex gap-x-2 w-32">
                <Input
                    ref={ref0}
                    name="0"
                    otp={true}
                    value={props.otpValue[0]}
                    variant="primary"
                    onChange={(e) => otpHandeler(undefined, e, ref1)}
                />
                <Input
                    ref={ref1}
                    name="1"
                    otp={true}
                    value={props.otpValue[1]}
                    variant="primary"
                    onChange={(e) => otpHandeler(ref0, e, ref2)}
                />
                <Input
                    ref={ref2}
                    name="2"
                    otp={true}
                    value={props.otpValue[2]}
                    variant="primary"
                    onChange={(e) => otpHandeler(ref1, e, ref3)}
                />
                <Input
                    ref={ref3}
                    name="3"
                    otp={true}
                    value={props.otpValue[3]}
                    variant="primary"
                    onChange={(e) => otpHandeler(ref2, e, undefined)}
                />
            </div>
        </>
    );
};

export default Otp;