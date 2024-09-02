"use client"
import AssetScanner from "@/app/components/assets/Scan";
import useColorMode from "@/hooks/useColorMode";
import { useState } from "react";
import { BsQrCodeScan } from "react-icons/bs";

const QRScanner = () => {
    const [colorMode] = useColorMode();
    const [showScanner, setShowScanner] = useState(false)

    return (
        <>
            <li className="relative flex flex-col space-y-5">
                <p
                    onClick={() => { setShowScanner(!showScanner) }}
                    className="relative cursor-pointer flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-[#e9e9e9] dark:text-white"
                >
                    <BsQrCodeScan color="black" size={20} />
                </p>
            </li>
            {showScanner && <AssetScanner />}
        </>
    );
}

export default QRScanner;