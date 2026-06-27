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
                "http://localhost:4000/signup",
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
        }
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
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center gap-4 w-1/3">
                <h1 className="underline font-bold text-sky-500 text-[35px]">Sign UP</h1>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 p-3 rounded-md w-full outline-none"
                />

                <input
                    type="text"
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
                    className="border-2 p-3 rounded-md w-full outline-none bg-blue-600 text-white"
                >
                    sumbit
                </button>

                <p className="text-gray-600">
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
    )
}