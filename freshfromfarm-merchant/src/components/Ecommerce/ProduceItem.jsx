import config from "../../config/config";
import { Link } from "react-router-dom";

function ProduceItem({ produceList, isListView }) {
  return (
    <div id="produceItem">
      <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
        {isListView ? (
          <div className="mt-6 flex flex-col space-y-2">
            {produceList.map((produce) => {
              const imageFile = produce.files?.find(file => file.mimetype.startsWith("image/"));
              const backgroundImage = imageFile
              // produce.backgroundImage = imageFile
                ? `${config.API_BASE_URL}/${imageFile.path.replace(/\\/g, "/")}`
                : null;

              return (
                <Link>
                  <div
                    key={produce._id}
                    className="flex items-center justify-between rounded-md border p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    {/* Image */}
                    <div className="flex-shrink-0">
                      {backgroundImage ? (
                        <img
                          alt={produce.name}
                          src={backgroundImage}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-md bg-gray-200 dark:bg-gray-700" />
                      )}
                    </div>

                    {/* Product Name */}
                    <div className="flex-1 px-4">
                      <h3 className="text-2xl text-gray-900 dark:text-gray-200 truncate">
                        {produce.name}
                      </h3>
                    </div>

                    {/* Price and Quantity Unit */}
                    <div className="flex-shrink-0">
                      <p className="text-lg font-semibold text-green-950 dark:text-green-400/70">
                        {/* <p className="text-lg font-semibold text-gary-900 dark:text-gray-200"> */}
                        $ {produce.price}/{produce.quantity_unit}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {produceList.map((produce) => {
              const imageFile = produce.files?.find(file => file.mimetype.startsWith("image/"));
              const backgroundImage = imageFile
              // produce.backgroundImage = imageFile
                ? `${config.API_BASE_URL}/${imageFile.path.replace(/\\/g, "/")}`
                : null;

              return (
                <Link to={`${produce._id}`} key={produce._id} state={{ produce }}>
                  <div
                    // key={produce._id}
                    className="group relative rounded-md border bg-white p-2 shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                  >
                    {backgroundImage ? (
                      <img
                        alt={produce.name}
                        src={backgroundImage}
                        className="aspect-square w-full rounded-md object-cover group-hover:opacity-80"
                      />
                    ) : (
                      <div className="aspect-square w-full rounded-md bg-gray-200 dark:bg-gray-700" />
                    )}
                    <div className="mt-2 flex justify-between items-center px-1">
                      <div>
                        <h3 className="text-2xl text-gray-900 dark:text-gray-200">
                          {produce.name}
                        </h3>
                      </div>
                      {/* <div className="border py-2 px-4 rounded-lg bg-green-600 dark:bg-green-700"> */}

                      <p className="text-lg font-semibold text-green-950 dark:text-green-400/70">
                        {/* <p className="text-lg font-semibold text-gray-900 dark:text-gray-200"> */}
                          $ {produce.price}/{produce.quantity_unit}
                        </p>
                        {/* </div> */}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProduceItem;

