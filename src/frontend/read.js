import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Read() {
    const { id } = useParams();
const fetchBook = async () =>{
    console.log("BOOK TESTING");

    const resp =await fetch(
        `http://localhost:4000/book/${id}`
    );

    const data = await resp.json();

     if (!resp.ok) {
        throw new Error(data.message);
    }

    return data;
    
}


const { data: book = {} } = useQuery({

    queryKey: ["book", id],

    queryFn: fetchBook,

    staleTime: 1000 * 60 * 5,

});


    return (
        <div className="min-h-screen bg-slate-100 p-10">

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">

                
              <div className="text-center">
                  <img
                    src="https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg"
                    alt="Atomic Habits"
                    className="w-1/3 h-1/2 mx-auto object-cover rounded"
                />

                <h1 className="text-4xl font-bold text-blue-600 mb-4">
                    {book.title}
                </h1>

                <h3 className="text-xl text-gray-600 mb-6">
                    Author:  {book.author}
                </h3>

              
              </div>


                <p className="text-gray-700 leading-8 whitespace-pre-line">

                    {`
Chapter 1 - The Beginning

Rich Dad Poor Dad is one of the most popular personal finance books ever written.
The book explains how people think differently about money and wealth.
Robert Kiyosaki shares lessons he learned from two important people in his life.
One was his real father, whom he calls Poor Dad.
The other was the father of his best friend, whom he calls Rich Dad.

Poor Dad believed that the path to success was getting good grades,
attending a good college, finding a secure job, and working hard for many years.
Rich Dad believed that financial education was more important than traditional education.
He taught that money should work for people instead of people working for money forever.

Chapter 2 - The First Lesson

As a child, Robert wanted to become rich.
He asked Rich Dad how wealthy people became successful.
Rich Dad explained that the first step was learning how money works.
Many people spend their entire lives chasing a paycheck.
They work hard every day but never truly understand money.

Rich Dad taught that fear and greed often control financial decisions.
People fear not having enough money,
so they work harder and harder.
Then they spend their income on things they do not really need.
This creates a cycle that is difficult to escape.

Chapter 3 - Assets and Liabilities

One of the most important lessons in the book is the difference
between assets and liabilities.

Rich Dad said:
"Assets put money into your pocket.
Liabilities take money out of your pocket."

Many people believe they are getting richer when they buy expensive items.
However, if those items constantly require money,
they are actually liabilities.

Examples of assets include:
Businesses,
Rental Properties,
Investments,
Royalties,
and other income-producing resources.

Examples of liabilities include:
Expensive cars,
Luxury items,
and unnecessary debts.

Chapter 4 - Financial Education

Rich Dad believed that schools teach people how to work for money
but rarely teach people how to manage money.

Financial education includes:
Budgeting,
Saving,
Investing,
Understanding taxes,
and managing risk.

People who understand these concepts often make better financial decisions.

Chapter 5 - Building Wealth

Building wealth takes patience and discipline.
Rich Dad explained that becoming rich is not about earning a huge salary.
It is about creating systems that generate income over time.

Small investments made consistently can grow significantly.
The earlier someone starts investing,
the more time money has to grow.

Chapter 6 - Taking Opportunities

Opportunities are everywhere,
but many people fail to recognize them.

Rich Dad encouraged Robert to keep learning,
read books,
study markets,
and develop new skills.

Knowledge creates confidence.
Confidence helps people take action.

Chapter 7 - Entrepreneurship

Starting a business can be challenging,
but it also creates opportunities for growth.

Entrepreneurs learn problem solving,
leadership,
communication,
and financial management.

Even small projects can teach valuable lessons.

Chapter 8 - Long-Term Thinking

Rich Dad focused on long-term goals instead of short-term rewards.

Many people want quick success,
but real wealth is usually built over years.

Patience,
consistency,
and continuous learning are essential.

Chapter 9 - Final Lessons

The book concludes by encouraging readers to take responsibility
for their financial future.

No one cares more about your future than you do.

Learning never stops.
Every new skill increases your value.

Financial freedom is achieved step by step.
Each smart decision contributes to a stronger future.

The key message of Rich Dad Poor Dad is simple:

Learn continuously.
Think independently.
Build assets.
Manage money wisely.
Create opportunities.
Invest in yourself.
And always keep improving.

Success is not determined by how much money you earn.
Success is determined by how effectively you use the money,
knowledge,
and opportunities available to you.

The journey toward financial freedom begins with education,
discipline,
and action.
`}
                </p>

            </div>

        </div>
    );
}