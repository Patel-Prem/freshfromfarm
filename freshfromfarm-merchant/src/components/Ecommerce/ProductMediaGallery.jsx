import { useState, useMemo } from "react";
import config from "../../config/config";
import ZoomImage from "./ZoomImage";

function ProductMediaGallery({ media = [], productName }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isZoomOpen, setIsZoomOpen] = useState(false);

    const normalizedMedia = useMemo(
        () =>
            media.map((file) => ({
                ...file,
                type: file.mimetype.startsWith("image/")
                    ? "image"
                    : file.mimetype.startsWith("video/")
                        ? "video"
                        : "unknown",
                url: `${config.API_BASE_URL}/${file.path.replace(/\\/g, "/")}`,
            })),
        [media]
    );

    if (normalizedMedia.length === 0) {
        return (
            <div className="h-96 w-96 bg-gray-200 rounded-md flex items-center justify-center">
                No media available
            </div>
        );
    }

    const activeFile = normalizedMedia[activeIndex];

    return (
        <div className="flex gap-4">
            {/* Thumbnails */}
            <ul className="flex flex-col gap-2">
                {normalizedMedia.map((file, index) => (
                    <li key={index}>
                        {file.type === "image" ? (
                            <img
                                src={file.url}
                                alt={productName}
                                className={`h-16 w-16 rounded-md object-cover cursor-pointer border ${index === activeIndex ? "border-green-300" : ""}`}
                                onClick={() => setActiveIndex(index)}
                                onMouseEnter={() => setActiveIndex(index)}
                            />
                        ) : (
                            <div className="relative">
                                <svg
                                    className="h-8 w-8 text-white absolute translate-x-1/2 translate-y-1/2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                <video
                                    src={file.url}
                                    muted
                                    className={`h-16 w-16 rounded-md object-fill cursor-pointer border ${index === activeIndex ? "border-green-300" : ""}`}
                                    onClick={() => setActiveIndex(index)}
                                    // onMouseEnter={() => setActiveIndex(index)}
                                />
                            </div>

                        )}
                    </li>
                ))}
            </ul>

            {/* Main Media */}
            <div>
                {activeFile.type === "image" ? (
                    <ZoomImage
                        src={activeFile.url}
                        alt="Product"
                        zoom={3}        // 3x zoom
                        zoomSize={300}  // 120px diameter lens
                    />

                ) : (
                    <video
                        src={activeFile.url}
                        controls
                        className="h-96 w-96 rounded-md object-fill border"
                    />
                )}
            </div>


        </div>
    );
}

export default ProductMediaGallery;
