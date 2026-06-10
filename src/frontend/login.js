import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleLogin() {
        if (!email || !password) {
            alert("ALL FIELDS ARE REQUIRED")
            return;
        }
        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then((resp) => resp.json())
            .then((data) => {
                alert(data.message);

                if (data.accessToken) {

                    localStorage.setItem(
                        "accessToken",
                        data.accessToken
                    );

                    localStorage.setItem(
                        "refreshToken",
                        data.refreshToken
                    );
                    console.log(
                        localStorage.getItem("accessToken")
                    );
                }
                navigate("/")
            })
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