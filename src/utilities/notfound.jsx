import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
            <h1 className="text-7xl font-bold text-purple-700">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
            <p className="mt-2 text-gray-600">
                Oops! The page you are looking for does not exist.
            </p>
            <button
                onClick={() => { navigate("/") }}
                className="mt-6 inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition"
            >
                Go Home
            </button>
        </div>
    );
}
