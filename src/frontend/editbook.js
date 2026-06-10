import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBook() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    function updateBook() {

        fetch(`http://localhost:4000/book/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                author
            })
        })
            .then((resp) => resp.json())
            .then((data) => {

                alert(data.message);

                navigate("/");
            });
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-100">

            <div className="bg-white p-8 rounded-lg shadow-md w-[500px]">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Edit Book
                </h1>

                <input
                    type="text"
                    placeholder="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-3 w-full rounded mb-4"
                />

                <input
                    type="text"
                    placeholder="Author Name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border p-3 w-full rounded mb-4"
                />

                <button
                    onClick={updateBook}
                    className="bg-blue-600 text-white w-full p-3 rounded"
                >
                    Update Book
                </button>

            </div>

        </div>
    );
}