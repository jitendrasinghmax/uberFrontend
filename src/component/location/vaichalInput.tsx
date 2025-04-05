import { Dispatch, SetStateAction } from "react";
import { LeftArrow } from "../../icons/leftArrow";

export const VechileInput = ({ setVechialPanal }: { setVechialPanal: Dispatch<SetStateAction<boolean>> }) => {
    const vehicles = [
        {
            name: "UberGo",
            capacity: 4,
            time: "2 mins away",
            description: "Affordable, compact rides",
            price: "₹193.20",
            icon: "🚗", // Placeholder for car icon
        },
        {
            name: "Moto",
            capacity: 1,
            time: "3 mins away",
            description: "Affordable motorcycle rides",
            price: "₹65",
            icon: "🏍️", // Placeholder for bike icon
        },
        {
            name: "UberAuto",
            capacity: 3,
            time: "3 mins away",
            description: "Affordable Auto rides",
            price: "₹118.86",
            icon: "🛺", // Placeholder for auto icon
        },
    ];

    return (
        <div className="flex flex-col gap-y-3 p-5">
            <div onClick={()=>setVechialPanal(false)}><LeftArrow/></div>
            {vehicles.map((vehicle, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-300 rounded-lg mb-2 bg-gray-100"
                >
                    <div className="flex items-center">
                        <div className="text-2xl mr-4">{vehicle.icon}</div>
                        <div>
                            <h4 className="m-0 text-base font-medium">
                                {vehicle.name} <span className="text-sm text-gray-600">• {vehicle.capacity}</span>
                            </h4>
                            <p className="m-0 text-sm text-gray-500">{vehicle.time}</p>
                            <p className="m-0 text-xs text-gray-400">{vehicle.description}</p>
                        </div>
                    </div>
                    <div className="text-base font-bold">{vehicle.price}</div>
                </div>
            ))}
        </div>
    );
};

