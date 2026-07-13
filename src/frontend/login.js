import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginMutation = useMutation({
        mutationFn: async (loginData) => {
            const resp = await fetch(
                `${process.env.REACT_APP_API_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginData),
                }
            );

            const data = await resp.json();

            if (!resp.ok) {
                throw new Error(data.message);
            }

            return data;
        },

        onSuccess: (data) => {
            alert(data.message);

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            navigate("/");
        },

        onError: (error) => {
            alert(error.message);
        },
    });

    function handleLogin() {
        if (!email || !password) {
            alert("ALL FIELDS ARE REQUIRED");
            return;
        }

        loginMutation.mutate({
            email,
            password,
        });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-100 px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="underline font-bold text-sky-500 text-[35px] text-center mb-6">
                    Login
                </h1>

                <div className="flex flex-col gap-4">

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 hover:border-black p-3 rounded-md w-full outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 hover:border-black p-3 rounded-md w-full outline-none"
                    />

                    <button
                        onClick={handleLogin}
                        className="bg-blue-600 text-white p-3 rounded-md w-full"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-600">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-blue-600 cursor-pointer font-semibold"
                        >
                            Create Account
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
}