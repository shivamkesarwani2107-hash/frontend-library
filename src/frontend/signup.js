import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassowrd] = useState("");

    const signMutation = useMutation({
        mutationFn: async (signupData) => {
            const resp = await fetch(
                `${process.env.REACT_APP_API_URL}/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signupData),
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

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassowrd("");

            navigate("/login");
        },

        onError: (error) => {
            alert(error.message);
        },
    });

    function handleSubmit() {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!name || !email || !password || !confirmPassword) {
            alert("All fields are required");
            return;
        }

        signMutation.mutate({
            name,
            email,
            password,
        });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-100 px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="underline font-bold text-sky-500 text-[35px] text-center mb-6">
                    Sign Up
                </h1>

                <div className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-2 p-3 rounded-md w-full outline-none"
                    />

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 p-3 rounded-md w-full outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 p-3 rounded-md w-full outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassowrd(e.target.value)}
                        className="border-2 p-3 rounded-md w-full outline-none"
                    />

                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white p-3 rounded-md w-full"
                    >
                        Submit
                    </button>

                    <p className="text-center text-gray-600">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-blue-600 cursor-pointer font-semibold"
                        >
                            Login
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
}