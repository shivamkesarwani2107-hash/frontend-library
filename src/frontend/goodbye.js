import { useNavigate } from "react-router-dom";

export default function Goodbye() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100">

            <h1 className="text-5xl font-bold text-blue-600 mb-4">
                👋 Thank You For Visiting
            </h1>

            <p className="text-gray-600 text-lg mb-6">
                Hope to see you again soon.
            </p>

            <div className="flex gap-4">

                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                    Login
                </button>

                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                    Home Page
                </button>

            </div>

        </div>
    );
}