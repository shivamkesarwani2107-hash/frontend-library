import { useState } from "react";

export default function AddBook() {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");

    function handleSubmit() {

        fetch("http://localhost:4000/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                author,
                category
            })
        })
            .then((resp) => resp.json())
            .then((data) => {
                alert(data.message);

                setTitle("");
                setAuthor("");
                setCategory("");
            });

        if (!title || !author || !category) {
            alert("All fields are required");
            return;
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">

            <div className="flex flex-col gap-4 w-1/3">

                <h1 className="text-3xl font-bold text-center">
                    Add Book
                </h1>

                <input
                    type="text"
                    placeholder="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-3 rounded"
                />

                <input
                    type="text"
                    placeholder="Author Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border p-3 rounded"
                />

                <input
                    type="text"
                    placeholder="Book Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-3 rounded"
                />

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white p-3 rounded"
                >
                    Add Book
                </button>

            </div>

        </div>
    );
}