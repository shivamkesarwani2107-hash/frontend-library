import { useState, useEffect } from "react";

export default function Profile() {

    const [user, setUser] = useState({});

    useEffect(() => {

        const token =
            localStorage.getItem(
                "accessToken"
            );

        fetch(
             `${process.env.REACT_APP_API_URL}/profile`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then((resp) => resp.json())
            .then((data) => {
                setUser(data);
            });

    }, []);

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center">

            <div className="bg-white w-[90%] max-w-lg rounded-2xl shadow-lg p-8">

                <div className="flex flex-col items-center">

                    <div
                        className="
                        w-24
                        h-24
                        rounded-full
                        bg-blue-600
                        text-white
                        flex
                        items-center
                        justify-center
                        text-4xl
                        font-bold
                        mb-4
                        "
                    >
                        {
                            user.name
                                ? user.name.charAt(0).toUpperCase()
                                : "U"
                        }
                    </div>

                    <h1 className="text-3xl font-bold text-blue-600 mb-8">
                        My Profile
                    </h1>

                </div>

                <div className="space-y-4">

                    <div className="bg-slate-100 p-4 rounded-lg">

                        <p className="text-gray-500 text-sm">
                            Full Name
                        </p>

                        <p className="text-lg font-semibold">
                            {user.name}
                        </p>

                    </div>

                    <div className="bg-slate-100 p-4 rounded-lg">

                        <p className="text-gray-500 text-sm">
                            Email Address
                        </p>    

                        <p className="text-lg font-semibold">
                            {user.email}
                        </p>

                    </div>  

                </div>

            </div>

        </div>

    );
}