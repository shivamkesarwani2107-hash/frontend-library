import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function AddBook() {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const queryClient = useQueryClient();

    const addBookMutation = useMutation({
        mutationFn: async (bookData) => {
            const response = await fetch(
                "http://localhost:4000/book",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookData),
                }
            );
            return response.json();
        },

        onSuccess: (data) => {

            alert(data.message);

            setTitle("");
            setAuthor("");
            setCategory("");

            queryClient.invalidateQueries({
                queryKey: ["book"],
            });
        },

        onError: (error) => {
    alert(error.message);
}

    });


    function handleSubmit() {

        if (!title || !author || !category) {

            alert("All fileds are required");

            return;
        }

        addBookMutation.mutate({
            title,
            author,
            category,
        });
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