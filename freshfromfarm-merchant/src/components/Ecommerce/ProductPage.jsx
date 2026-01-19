import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduce } from "../../api/produceAPI";
import ProductMediaGallery from "./ProductMediaGallery";

function ProductPage() {
    const { produceId } = useParams();
    const location = useLocation();

    const [produce, setProduce] = useState(location.state?.produce || null);

    useEffect(() => {
        if (!produce && produceId) {
            const fetchProduce = async () => {
                try {
                    const res = await getProduce(produceId);
                    setProduce(res.data.produceDetails);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchProduce();
        }
    }, [produceId, produce]);

    if (!produce) return <p>Loading...</p>;

    // ✅ Prepare media safely
    const media = produce.files?.filter((f) => f.file_from === "produce") || [];

    return (
        <div className="productPage p-6">
            <div className="flex flex-col md:flex-row gap-6 w-full">

                {/* Media Gallery */}
                <div id="productMediaGallery" className="w-full md:w-[30%]">
                    <ProductMediaGallery media={media} productName={produce.name} />
                </div>
                {/* Product Details */}
                <div id="productDetails" className="w-full md:w-[70%]">
                    <h1 className="text-2xl font-semibold dark:text-white">{produce.name}</h1>
                    <p className="mt-2 text-black dark:text-gray-300 text-justify">{produce.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur itaque, assumenda quidem consectetur explicabo nisi deserunt aperiam quos doloremque! Voluptate laudantium inventore eius veniam consequatur totam ipsa quos maiores numquam?
                    Repellendus illum dolorum corrupti doloribus. Earum, exercitationem soluta maiores quidem laborum itaque? Laboriosam quibusdam architecto totam laborum hic natus at, vitae earum a tempora in ab dignissimos doloremque, iusto quo?</p>
                    <p className="mt-4 font-medium text-green-950 dark:text-green-400/70">
                        ${produce.price}/{produce.quantity_unit}
                    </p>
                </div>

            </div>
        </div>
    );
}

export default ProductPage;