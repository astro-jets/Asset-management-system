"use client"
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import jwt from "jsonwebtoken"; // Import the JWT library
import { useRouter } from "next/navigation";

const AssetScanner = () => {
    const [scanResult, setScanResult] = useState("");
    const router = useRouter();

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 500,
                height: 500
            },
            fps: 5,
        }, false);

        function success(result: string) {
            scanner.pause();
            scanner.clear();
            // Decode the JWT token (assuming it contains the asset ID)
            try {
                const arrayToken = result.split('.');
                const tokenPayload = JSON.parse(atob(arrayToken[1]));
                const url = `/admin/assets/${tokenPayload.id}`;
                router.push(url);

            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }

        function error(err: any) {
            // console.log(err);
        }

        scanner.render(success, error);

        return () => {
            scanner.clear();
        };
    }, []);

    return (
        <div className="absolute top-10 left-0 right-0 w-full h-screen  z-999999 flex min-h-full items-center justify-center">
            <div className="w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-graydark flex flex-col w-full items-center justify-center">
                    <h1>Scan QR code</h1>
                    <div id="reader" className="w-full rounded-2xl"></div>
                    {scanResult && <p className="text-xs text-boxdark-2">Asset details here: {scanResult}</p>}
                </div>
            </div>
        </div>
    );
};

export default AssetScanner;
