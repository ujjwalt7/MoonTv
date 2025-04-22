import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";

function ImageWithFallback(props) {
    const { src, aspectRatio = "2/3", ...rest } = props;
    const [isError, setIsError] = useState(false);
    const [imgSrc, setImgSrc] = useState(src);

    if (isError) {
        return (
            <div 
                style={{ aspectRatio }}
                className={`w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm ${rest.className || ''}`}
            >
                <div className="flex flex-col items-center gap-2 text-gray-500">
                    <IoImageOutline className="w-12 h-12" />
                    <div className="text-xs">Image not found</div>
                </div>
            </div>
        );
    }

    return (
        <img
            alt=""
            key={imgSrc}
            {...rest}
            src={imgSrc}
            onError={() => {
                setIsError(true);
                setImgSrc("");
            }}
        />
    );
}

export default ImageWithFallback;