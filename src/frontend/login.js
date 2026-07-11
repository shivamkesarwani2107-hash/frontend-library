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

            localStorage.setItem(
                "accessToken",
                data.accessToken
            );

            localStorage.setItem(
                "refreshToken",
                data.refreshToken
            );

            navigate("/");

        },

        onError: (error) => {

            alert(error.message);

        },
    })

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
        <div className="flex justify-center items-center h-screen bg-gray-100">

            <div className="flex flex-col items-center gap-4 w-1/3">

                <h1 className="underline font-bold text-sky-500 text-[35px]">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 hover:border-black p-3 rounded-md w-full "
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2 p-3 hover:border-black rounded-md w-full"
                />

                <button
                    onClick={handleLogin}
                    className="border-2 p-3 rounded-md w-full bg-blue-600 text-white"
                >
                    Login
                </button>

                <p className="text-gray-600">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-blue-600 cursor-pointer font-semibold"
                    >
                        create account
                    </span>
                </p>

            </div>

        </div>

    )
}