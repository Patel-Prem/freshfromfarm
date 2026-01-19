import { NavLink } from "react-router-dom"
export default function Sidebar({ open, setOpen }) {
    return (
        <>
            <div
                className={`fixed inset-0 z-40  bg-black/30 lg:hidden lg:z-auto transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setOpen(false)}
            ></div>
            <aside
                id="sidebar" className={`flex lg:flex! flex-col absolute z-40 left-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 lg:overflow-y-auto w-64 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:!bg-gray-800 p-4 transition-all duration-200 ease-in-out ${open ? 'translate-x-0' : '-translate-x-64'} rounded-r-2xl`}
            >
                {/* <div className="flex justify-between mb-10 pr-3 sm:px-2">
                    <button
                        onClick={() => setOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-400"
                        aria-controls="sidebar"
                        aria-expanded="true"
                    >
                        <span className="sr-only">Close sidebar </span>
                        <svg
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"
                            ></path>
                        </svg>
                    </button>
                    <a aria-current="page" className="block active" href="/" data-discover="true">
                        <svg
                            className="fill-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                        >
                            <path
                                d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z"
                            ></path>
                        </svg>
                    </a>
                </div> */}
                <div className="space-y-8">
                    <div>
                        <h3
                            className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3"
                        >
                            {/* <span
                                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                                aria-hidden="true"
                            >•••
                            </span>
                            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block"
                            >Pages
                            </span> */}
                        </h3>
                        <ul className="mt-3">
                            <li
                                className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r from-green-600/[0.12] dark:from-green-600/[0.24] to-green-600/[0.04]"
                            >
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-3 py-2 rounded-md transition duration-150 ${isActive
                                            ? "text-green-600 font-semibold bg-gray-100 dark:bg-gray-900"
                                            : "text-gray-800 dark:text-gray-100"
                                        }`
                                    }
                                >
                                    <svg
                                        className="shrink-0 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z"
                                        ></path>
                                        <path
                                            d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z"
                                        ></path>
                                    </svg>
                                    <span> Dashboard </span>
                                </NavLink>
                            </li>

                            <li
                                className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r false"
                            >
                                <NavLink
                                    to="/e-commerce"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-3 py-2 rounded-md transition duration-150 ${isActive
                                            ? "text-green-600 font-semibold bg-gray-100 dark:bg-gray-900"
                                            : "text-gray-800 dark:text-gray-100"
                                        }`
                                    }
                                >
                                    <svg
                                        className="shrink-0 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M9 6.855A3.502 3.502 0 0 0 8 0a3.5 3.5 0 0 0-1 6.855v1.656L5.534 9.65a3.5 3.5 0 1 0 1.229 1.578L8 10.267l1.238.962a3.5 3.5 0 1 0 1.229-1.578L9 8.511V6.855ZM6.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm4.803 8.095c.005-.005.01-.01.013-.016l.012-.016a1.5 1.5 0 1 1-.025.032ZM3.5 11c.474 0 .897.22 1.171.563l.013.016.013.017A1.5 1.5 0 1 1 3.5 11Z"
                                        ></path>
                                    </svg>
                                    <span>E-Commerce
                                    </span>
                                </NavLink>
                            </li>

                            <li
                                className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r from-green-600/[0.12] dark:from-green-600/[0.24] to-green-600/[0.04]"
                            >
                                <NavLink
                                    to="/finance"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-3 py-2 rounded-md transition duration-150 ${isActive
                                            ? "text-green-600 font-semibold bg-gray-100 dark:bg-gray-900"
                                            : "text-gray-800 dark:text-gray-100"
                                        }`
                                    }
                                >
                                    <svg
                                        className="shrink-0 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M6 0a6 6 0 0 0-6 6c0 1.077.304 2.062.78 2.912a1 1 0 1 0 1.745-.976A3.945 3.945 0 0 1 2 6a4 4 0 0 1 4-4c.693 0 1.344.194 1.936.525A1 1 0 1 0 8.912.779 5.944 5.944 0 0 0 6 0Z"
                                        ></path>
                                        <path
                                            d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                                        ></path>
                                    </svg>
                                    <span> Finance </span>
                                </NavLink>
                            </li>

                            <li
                                className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r from-green-600/[0.12] dark:from-green-600/[0.24] to-green-600/[0.04]"
                            >
                                <NavLink
                                    to="/orders"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-3 py-2 rounded-md transition duration-150 ${isActive
                                            ? "text-green-600 font-semibold bg-gray-100 dark:bg-gray-900"
                                            : "text-gray-800 dark:text-gray-100"
                                        }`
                                    }
                                >
                                    <svg
                                        className="shrink-0 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M7.586 9H1a1 1 0 1 1 0-2h6.586L6.293 5.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414L7.586 9ZM3.075 4.572a1 1 0 1 1-1.64-1.144 8 8 0 1 1 0 9.144 1 1 0 0 1 1.64-1.144 6 6 0 1 0 0-6.856Z"
                                        ></path>
                                    </svg>
                                    <span> Orders </span>
                                </NavLink>
                            </li>

                            <li
                                className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r from-green-600/[0.12] dark:from-green-600/[0.24] to-green-600/[0.04]"
                            >
                                <NavLink
                                    to="/messages"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-3 py-2 rounded-md transition duration-150 ${isActive
                                            ? "text-green-600 font-semibold bg-gray-100 dark:bg-gray-900"
                                            : "text-gray-800 dark:text-gray-100"
                                        }`
                                    }
                                >
                                    <svg
                                        className="shrink-0 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M13.95.879a3 3 0 0 0-4.243 0L1.293 9.293a1 1 0 0 0-.274.51l-1 5a1 1 0 0 0 1.177 1.177l5-1a1 1 0 0 0 .511-.273l8.414-8.414a3 3 0 0 0 0-4.242L13.95.879ZM11.12 2.293a1 1 0 0 1 1.414 0l1.172 1.172a1 1 0 0 1 0 1.414l-8.2 8.2-3.232.646.646-3.232 8.2-8.2Z"
                                        ></path>
                                        <path d="M10 14a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5Z"></path>
                                    </svg>
                                    <span>Messages</span>
                                    <div className="inline-flex">
                                        <span
                                            className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-green-600 px-2 rounded-sm"
                                        >4
                                        </span>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* <div>
                    <h3
                        className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3"
                    >
                        <span
                            className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                            aria-hidden="true"
                        >•••
                        </span>
                        <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">More </span>
                    </h3>
                    <ul className="mt-3">
                        <li
                            className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r undefined"
                        >
                            <a
                                href="#0"
                                className="block text-gray-800 dark:text-gray-100 truncate transition duration-150 hover:text-gray-900 dark:hover:text-white"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg
                                            className="shrink-0 fill-current text-gray-400 dark:text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M11.442 4.576a1 1 0 1 0-1.634-1.152L4.22 11.35 1.773 8.366A1 1 0 1 0 .227 9.634l3.281 4a1 1 0 0 0 1.59-.058l6.344-9ZM15.817 4.576a1 1 0 1 0-1.634-1.152l-5.609 7.957a1 1 0 0 0-1.347 1.453l.656.8a1 1 0 0 0 1.59-.058l6.344-9Z"
                                            ></path>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                        >Authentication
                                        </span>
                                    </div>
                                    <div className="flex shrink-0 ml-2">
                                        <svg
                                            className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 undefined"
                                            viewBox="0 0 12 12"
                                        >
                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                <ul className="pl-8 mt-1 hidden">
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className=""
                                            href="https://cruip.com/mosaic/ dark:hover:text-gray-200 transition duration-150 truncate"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Sign in
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className=""
                                            href="https://cruip.com/mosaic/ dark:hover:text-gray-200 transition duration-150 truncate"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Sign up
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className=""
                                            href="https://cruip.com/mosaic/ hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 truncate"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Reset Password
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li
                            className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r undefined"
                        >
                            <a
                                href="#0"
                                className="block text-gray-800 dark:text-gray-100 truncate transition duration-150 hover:text-gray-900 dark:hover:text-white"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg
                                            className="shrink-0 fill-current text-gray-400 dark:text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M6.668.714a1 1 0 0 1-.673 1.244 6.014 6.014 0 0 0-4.037 4.037 1 1 0 1 1-1.916-.571A8.014 8.014 0 0 1 5.425.041a1 1 0 0 1 1.243.673ZM7.71 4.709a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM9.995.04a1 1 0 1 0-.57 1.918 6.014 6.014 0 0 1 4.036 4.037 1 1 0 0 0 1.917-.571A8.014 8.014 0 0 0 9.995.041ZM14.705 8.75a1 1 0 0 1 .673 1.244 8.014 8.014 0 0 1-5.383 5.384 1 1 0 0 1-.57-1.917 6.014 6.014 0 0 0 4.036-4.037 1 1 0 0 1 1.244-.673ZM1.958 9.424a1 1 0 0 0-1.916.57 8.014 8.014 0 0 0 5.383 5.384 1 1 0 0 0 .57-1.917 6.014 6.014 0 0 1-4.037-4.037Z"
                                            ></path>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                        >Onboarding
                                        </span>
                                    </div>
                                    <div className="flex shrink-0 ml-2">
                                        <svg
                                            className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 undefined"
                                            viewBox="0 0 12 12"
                                        >
                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                <ul className="pl-8 mt-1 hidden">
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className=""
                                            href="https://cruip.com/mosaic/ hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 truncate"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Step 1
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className=""
                                            href="https://cruip.com/mosaic/ hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 truncate"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Step 2
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className=""
                                            href="https://cruip.com/mosaic/ hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 truncate"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Step 3
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className=""
                                            href="https://cruip.com/mosaic/ hover:text-gray-700 dark:hover:text-gray-200 transition duration-150 truncate"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Step 4
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li
                            className="pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r false"
                        >
                            <a
                                href="#0"
                                className="block text-gray-800 dark:text-gray-100 truncate transition duration-150 hover:text-gray-900 dark:hover:text-white"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg
                                            className="shrink-0 fill-current text-gray-400 dark:text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M.06 10.003a1 1 0 0 1 1.948.455c-.019.08.01.152.078.19l5.83 3.333c.053.03.116.03.168 0l5.83-3.333a.163.163 0 0 0 .078-.188 1 1 0 0 1 1.947-.459 2.161 2.161 0 0 1-1.032 2.384l-5.83 3.331a2.168 2.168 0 0 1-2.154 0l-5.83-3.331a2.162 2.162 0 0 1-1.032-2.382Zm7.856-7.981-5.83 3.332a.17.17 0 0 0 0 .295l5.828 3.33c.054.031.118.031.17.002l5.83-3.333a.17.17 0 0 0 0-.294L8.085 2.023a.172.172 0 0 0-.17-.001ZM9.076.285l5.83 3.332c1.458.833 1.458 2.935 0 3.768l-5.83 3.333c-.667.38-1.485.38-2.153-.001l-5.83-3.332c-1.457-.833-1.457-2.935 0-3.767L6.925.285a2.173 2.173 0 0 1 2.15 0Z"
                                            ></path>
                                        </svg>
                                        <span
                                            className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                        >Components
                                        </span>
                                    </div>
                                    <div className="flex shrink-0 ml-2">
                                        <svg
                                            className="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 false"
                                            viewBox="0 0 12 12"
                                        >
                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                <ul className="pl-8 mt-1 hidden">
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Button
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Input Form
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Dropdown
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Alert &amp; Banner
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Modal
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Pagination
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Tabs
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Breadcrumb
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Badge
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Avatar
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Tooltip
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Accordion
                                            </span>
                                        </a>
                                    </li>
                                    <li className="mb-1 last:mb-0">
                                        <a
                                            className="block transition duration-150 truncate text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                            href="https://cruip.com/mosaic/"
                                        >
                                            <span
                                                className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                                            >Icons
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div> */}
                </div>
                <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
                    {/* <div className="w-12 pl-4 pr-3 py-2">
                        <button
                            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                        >
                            <span className="sr-only">Expand / collapse sidebar </span>
                            <svg
                                className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z"
                                ></path>
                            </svg>
                        </button>
                    </div> */}
                </div>
            </aside>
        </>
    )
}
