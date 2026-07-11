import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function AddBook() {

    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState([]);
    const [authorId, setAuthorId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const queryClient = useQueryClient();

    const addBookMutation = useMutation({

        mutationFn: async (bookData) => {

            const token = localStorage.getItem("accessToken");

            const response = await fetch(
                 `${process.env.REACT_APP_API_URL}/book`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify(bookData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            return data;
        },

        onSuccess: (data) => {

            alert(data.message);

            setTitle("");
            setAuthorId("");
            setCategoryId("");

            queryClient.invalidateQueries({
                queryKey: ["book"],
            });

        },

        onError: (error) => {

            alert(error.message);

        }

    });

    useEffect(() => {

        `${process.env.REACT_APP_API_URL}/category`
            .then((resp) => resp.json())
            .then((data) => {

                setCategories(data);

            });

        `${process.env.REACT_APP_API_URL}/author`
            .then((resp) => resp.json())
            .then((data) => {
                setAuthors(data);
            });
    }, []);


    function handleSubmit() {

        if (!title || !authorId || !categoryId) {

            alert("All fileds are required");

            return;
        }

        addBookMutation.mutate({
            title,
            authorId,
            categoryId,
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

                <select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    className="border p-3 rounded w-full"
                >
                    <option value="">Select Author</option>

                    {authors.map((author) => (
                        <option key={author._id} value={author._id}>
                            {author.name}
                        </option>
                    ))}
                </select>


                <select

                    value={categoryId}

                    onChange={(e) => setCategoryId(e.target.value)}

                    className="border p-3 rounded w-full"

                >

                    <option value="">

                        Select Category

                    </option>

                    {

                        categories.map((category) => (

                            <option
                                key={category._id}

                                value={category._id}
                            >
                                {category.name}

                            </option>

                        ))

                    }

                </select>

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