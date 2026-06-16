import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Wishlist() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(() => {

        const token =
            localStorage.getItem(
                "accessToken"
            );

        fetch(
            "http://localhost:4000/wishlist",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )
            .then((resp) => resp.json())
            .then((data) => setBooks(data));

    }, []);

    return (
        <div className="min-h-screen bg-slate-100 p-10">

            <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
                ❤️ My Wishlist
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {
                    books.map((book) => (
                        <div
                            key={book._id}
                            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
                        >

                            <h2 className="text-xl font-bold text-blue-600">
                                📚 {book.title}
                            </h2>

                            <p className="text-gray-600 mt-2">
                                ✍️ {book.author}
                            </p>

                            <div className="mt-4 flex justify-between">
                               
                                <button 
                                    onClick={() => navigate(`/read/${book._id}`)}
                                    className="bg-green-500 text-white px-3 py-2 rounded-md text-sm hover:bg-green-600"
                                >
                                    📖 Read Now
                                </button>
                            </div>
                        </div>
                    ))
                }

            </div>


        </div>
    );
}