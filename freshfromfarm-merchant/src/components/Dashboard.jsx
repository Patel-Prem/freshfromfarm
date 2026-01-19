import Backbutton from './Utilities/Backbutton';
import Calender from './Utilities/Calender';

export default function Dashboard() {
  return (
    <div
      id="dashboard"
      className="bg-background max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Dashboard
          </h1>
        </div>
        <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
          <Backbutton />
          <Calender />

          <button
            className="px-2 rounded 
          bg-foreground text-background"
          >
            <span className="max-xs:sr-only">Add Item</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-muted-background shadow-xs rounded-xl">
          <div className="px-5 pt-5">
            <header className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Total Sales Amount
              </h2>
            </header>
            {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales
            </div> */}
            <div className="flex items-start">
              <div className="text-3xl font-bold text-foreground mr-2">
                $24,780
              </div>
              {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%
              </div> */}
            </div>
          </div>
          <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
            <canvas
              width="479"
              height="160"
              style={{
                display: "block",
                boxSizing: "border-box",
                height: "128px",
                width: "383px",
              }}
            ></canvas>
          </div>
        </div>

        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-muted-background shadow-xs rounded-xl">
          <div className="px-5 pt-5">
            <header className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Total Pending Amount
              </h2>
            </header>
            {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales
            </div> */}
            <div className="flex items-start">
              <div className="text-3xl font-bold text-foreground mr-2">
                $24,780
              </div>
              {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%
              </div> */}
            </div>
          </div>
          <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
            <canvas
              width="479"
              height="160"
              style={{
                display: "block",
                boxSizing: "border-box",
                height: "128px",
                width: "383px",
              }}
            ></canvas>
          </div>
        </div>

        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-muted-background shadow-xs rounded-xl">
          <div className="px-5 pt-5">
            <header className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Total Orders
              </h2>
            </header>
            {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales
            </div> */}
            <div className="flex items-start">
              <div className="text-3xl font-bold text-foreground mr-2">
                $24,780
              </div>
              {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%
              </div> */}
            </div>
          </div>
          <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
            <canvas
              width="479"
              height="160"
              style={{
                display: "block",
                boxSizing: "border-box",
                height: "128px",
                width: "383px",
              }}
            ></canvas>
          </div>
        </div>

        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-muted-background shadow-xs rounded-xl">
          <div className="px-5 pt-5">
            <header className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Total Dispatch Orders
              </h2>
            </header>
            {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales
            </div> */}
            <div className="flex items-start">
              <div className="text-3xl font-bold text-foreground mr-2">
                $24,780
              </div>
              {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%
              </div> */}
            </div>
          </div>
          <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
            <canvas
              width="479"
              height="160"
              style={{
                display: "block",
                boxSizing: "border-box",
                height: "128px",
                width: "383px",
              }}
            ></canvas>
          </div>
        </div>

        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-muted-background shadow-xs rounded-xl">
          <div className="px-5 pt-5">
            <header className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Total Pending Orders
              </h2>
            </header>
            {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales
            </div> */}
            <div className="flex items-start">
              <div className="text-3xl font-bold text-foreground mr-2">
                $24,780
              </div>
              {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%
              </div> */}
            </div>
          </div>
          <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
            <canvas
              width="479"
              height="160"
              style={{
                display: "block",
                boxSizing: "border-box",
                height: "128px",
                width: "383px",
              }}
            ></canvas>
          </div>
        </div>

        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-muted-background shadow-xs rounded-xl">
          <div className="px-5 pt-5">
            <header className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Total Cancle Orders
              </h2>
            </header>
            {/* <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">Sales
            </div> */}
            <div className="flex items-start">
              <div className="text-3xl font-bold text-foreground mr-2">
                $24,780
              </div>
              {/* <div className="text-sm font-medium text-green-700 px-1.5 bg-green-500/20 rounded-full">+49%
              </div> */}
            </div>
          </div>
          <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
            <canvas
              width="479"
              height="160"
              style={{
                display: "block",
                boxSizing: "border-box",
                height: "128px",
                width: "383px",
              }}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}