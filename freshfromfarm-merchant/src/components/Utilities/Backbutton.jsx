import { useNavigate } from "react-router-dom";
export default function Backbutton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="px-2 py-2 rounded bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
            <span className="sr-only">Back</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"></path>
            </svg>
        </button>
    )
}
