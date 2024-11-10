import Image from "next/image";
import { useState } from "react";
import FallBackImg from "@/assets/img/img.png";

function ImageWithFallback(props) {
    const { src, fallbackSrc=FallBackImg, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image alt="" key={imgSrc}
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
        />
    );
}

export default ImageWithFallback;