import { useEffect, useState } from "react";

export default function Category() {

    const [category, setCategory] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {

        if (!category) {
            setBooks([]);
            return;
        }

        fetch(`http://localhost:4000/category/${category}`)
            .then((resp) => resp.json())
            .then((data) => {
                setBooks(data);
            });


    }, [category]);

    return (
        <div className="min-h-screen bg-slate-100 flex justify-center items-center">

            <div className="bg-white w-[500px] p-6 rounded-lg shadow">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Book Category
                </h1>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border p-3 rounded-md outline-none"
                >
                    <option value="">Select Category</option>
                    <option value="class-10">Class-10</option>
                    <option value="class-12">Class-12</option>
                </select>

                <div className="mt-6">

                    {
                        books.map((book) => (

                            <div
                                key={book._id}
                                className="border rounded-md p-4 mb-4 shadow-sm"
                            >

                                <h2 className="text-xl font-bold text-blue-600">
                                    📚 {book.title}
                                </h2>

                                <p className="text-gray-600 mt-2">
                                    ✍️ {book.author}
                                </p>

                            </div>

                        ))
                    }

                </div>

            </div>

        </div>
    );
}