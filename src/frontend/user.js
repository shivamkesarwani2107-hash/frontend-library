import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, } from "@tanstack/react-query";
export default function User() {

    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const limit = 5;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 800);

        return () => clearTimeout(timer);
    }, [search]);

    const fetchBooks = async ({ queryKey }) => {

        const [, page, limit, search, sort] = queryKey;

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/book?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
        );

        return response.json();
    };

    const {
        data: book = [],
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["book", page, limit, debouncedSearch, sort],
        queryFn: fetchBooks,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
    });

    const token = localStorage.getItem("accessToken");

    function addToWishlist(id) {

        const token =
            localStorage.getItem(
                "accessToken"
            );

        fetch(`${process.env.REACT_APP_API_URL}/wishlist/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then((resp) => resp.json())
            .then((data) => alert(data.message));
    }

    function deleteBook(id) {
        fetch(`${process.env.REACT_APP_API_URL}/book/${id}`, {
            method: "DELETE"
        })
            .then((resp) => resp.json())
            .then((data) => {
                alert(data.message);

                setBooks(
                    books.filter(
                        (book) => book._id !== id
                    )
                );

            })
    }

    function handleLogout() {

        localStorage.removeItem(
            "accessToken"
        );

        localStorage.removeItem(
            "refreshToken"
        );

        navigate("/goodbye")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-3xl font-bold text-blue-600">
                    Loading...
                </h1>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex justify-center items-center">

                <h1 className="text-3xl font-bold text-red-600">
                    {error.message}
                </h1>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-10 py-5 bg-blue-600 text-white shadow-lg">

                <h1 className="text-2xl font-bold">
                    📚 Library Management
                </h1>

                <div className="flex flex-wrap justify-center gap-3 md:gap-6 items-center">

                    {
                        token ? (
                            <button
                                onClick={() => navigate("/profile")}
                                className="hover:text-yellow-300"
                            >
                                My Profile
                            </button>
                        ) : null
                    }

                    <button
                        onClick={() => navigate("/addbook")}
                        className="hover:text-yellow-300"
                    >
                        Add Book
                    </button>

                    <button
                        onClick={() => navigate("/wishlist")}
                        className="hover:text-yellow-300"
                    >
                        Wishlist
                    </button>

                    {
                        !token ? (
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
                            >
                                Login
                            </button>

                        ) : (

                            <div className="relative">

                                <button
                                    onClick={() =>
                                        setShowDropdown(!showDropdown)
                                    }
                                    className="hover:text-yellow-300"
                                >

                                    Welcome User ▼

                                </button>

                                {
                                    showDropdown && (

                                        <div
                                            className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg "
                                        >

                                            <button
                                                onClick={() =>
                                                    navigate("/profile")
                                                }
                                                className="block w-full text-left px-4 py-2 rounded-lg  hover:bg-gray-200"
                                            >
                                                Profile
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate("/wishlist")
                                                }
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                            >
                                                Wishlist
                                            </button>

                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200">
                                                Logout
                                            </button>

                                        </div>

                                    )
                                }

                            </div>
                        )
                    }

                    <button
                        onClick={handleLogout}
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
                    >
                        Logout
                    </button>

                </div>

            </div>

            <div className="flex flex-col items-center justify-center mt-10 md:mt-20 px-4 text-center">

                <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-4">
                    Welcome to Library
                </h1>

                <p className="text-gray-600 text-base md:text-lg mb-6">
                    Discover, Manage and Organize Your Books Easily
                </p>

                {!token ? (
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Get Started
                    </button>
                ) : (
                    <button
                        onClick={() => navigate("/profile")}
                        className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
                    >
                        My Profile
                    </button>
                )}

            </div>

            <div className="mt-16 px-10 pb-10">

                <h2 className="text-3xl font-bold text-center mb-8 underline">
                    Available Books
                </h2>

                <div className="flex justify-center mb-4">

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border p-2 rounded-md bg-white"
                    >

                        <option value="">
                            Sort Books
                        </option>

                        <option value="asc">
                            A-Z
                        </option>

                        <option value="desc">
                            Z-A
                        </option>

                    </select>

                </div>


                <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        placeholder="Search book by title..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }} className="border p-3 rounded-lg w-full md:w-[400px] outline-none hover:border-2 hover:border-slate-400"
                    />
                </div>

                {
                    book.map((book) => (

                        <div
                            key={book._id}
                            className="bg-white border text-center rounded-lg p-5 mb-4 w-full max-w-md mx-auto shadow hover:shadow-md transition"
                        >

                            <h3 className="text-xl font-bold text-blue-600">
                                📚 {book.title}
                            </h3>

                            <p className="text-gray-600 mt-2">
                                ✍️ {book.author?.name}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4 justify-center text-center">

                                <button
                                    onClick={() => addToWishlist(book._id)}
                                    className="bg-pink-500 text-white px-3 py-2 rounded-md text-sm hover:bg-pink-600"
                                >
                                    ❤️ Wishlist
                                </button>

                                <button
                                    onClick={() => navigate(`/read/${book._id}`)}
                                    className="bg-green-500 text-white px-3 py-2 rounded-md text-sm hover:bg-green-600"
                                >
                                    📖 Read Now
                                </button>

                                <button
                                    onClick={() => deleteBook(book._id)}
                                    className="bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600"
                                >
                                    🗑 Delete
                                </button>

                                <button
                                    onClick={() => navigate(`/editbook/${book._id}`)}
                                    className="bg-yellow-500 text-white px-3 py-2 rounded-md text-sm hover:bg-yellow-300"
                                >
                                    ✏️ Edit
                                </button>

                            </div>

                        </div>

                    ))
                }
                <div className="flex justify-center gap-4 mt-6">

                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="border-2 hover:border-black px-4 py-2 rounded bg-slate-300"
                    >
                        Prev
                    </button>

                    <span className="font-semibold mt-2">
                        Page {page}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={book.length < limit}
                        className="border-2 hover:border-black px-4 py-2 rounded bg-slate-300"
                    >
                        Next
                    </button>

                </div>

            </div>

        </div >
    );
}


