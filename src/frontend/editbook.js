import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBook() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authorId, setAuthorId] = useState("");
    const [categoryId, setCategoryId] = useState("");

    function updateBook() {

        fetch(`${process.env.REACT_APP_API_URL}/book/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                authorId,
                categoryId
            })
        })
            .then((resp) => resp.json())
            .then((data) => {
                alert(data.message);

                navigate("/");
            });

        if (!title || !authorId || !categoryId) {
            alert("All fields are required");
            return;
        }
    }

    useEffect(() => {


        fetch( `${process.env.REACT_APP_API_URL}/login/${id}`)
            .then((resp) => resp.json())
            .then((book) => {
                console.log("book response:", book);
                setTitle(book.title || "");
            });


        fetch( `${process.env.REACT_APP_API_URL}/category`)
            .then((resp) => resp.json())
            .then((data) => {

                setCategories(data);

            });

        fetch( `${process.env.REACT_APP_API_URL}/author`)
            .then((resp) => resp.json())
            .then((data) => {
                setAuthors(data);
            });

    }, [id]);


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
                    onClick={updateBook}
                    className="bg-blue-600 text-white w-full p-3 rounded"
                >
                    Update Book
                </button>

            </div>

        </div>
    );
}