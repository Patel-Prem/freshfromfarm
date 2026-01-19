import { useState, useRef } from "react";

function ZoomImage({ src, alt, zoom = 2, zoomSize = 200 }) {
    const [isHover, setIsHover] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = imgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setCursorPos({ x, y, width: rect.width, height: rect.height });
    };

    return (
        <div className="relative inline-block">
            {/* Main Image */}
            <img
                src={src}
                alt={alt}
                ref={imgRef}
                className="w-96 h-96 object-fill border rounded-md cursor-zoom-in"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onMouseMove={handleMouseMove}
            />

            {/* Floating Zoom */}
            {isHover && (
                <div
                    className="absolute pointer-events-none shadow-lg rounded"
                    style={{
                        width: zoomSize,
                        height: zoomSize,
                        left: cursorPos.x + 20, // offset from cursor
                        top: cursorPos.y + 20,
                        backgroundImage: `url(${src})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${cursorPos.width * zoom}px ${cursorPos.height * zoom}px`,
                        backgroundPosition: `-${cursorPos.x * zoom - zoomSize / 2}px -${cursorPos.y * zoom - zoomSize / 2}px`,
                        zIndex: 100,
                    }}
                ></div>
            )}
        </div>
    );
}

export default ZoomImage;
