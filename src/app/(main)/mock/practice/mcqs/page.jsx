"use server";

import { generateMCQs } from "@/actions/mock-practice";
import McqCard from "@/components/mcq-card";
import { Suspense } from "react";

const questions = [
  {
    question:
      "You're building a real-time chat application using Node.js and React.js. You're using WebSockets to handle the real-time communication. You're experiencing frequent disconnections. What is the most likely cause, and what is the best way to address it?",
    category: "Node.js/React.js/WebSockets",
    difficulty: "INTERMEDIATE",
    options: [
      "A. The server is overloaded and not able to handle incoming WebSocket connections. Implement connection throttling and optimize server resources.",
      "B. The client's browser is blocking the WebSocket connection.  Ensure CORS is correctly configured on the server and WebSocket server is on the same domain, or use a proxy.",
      "C. The client is sending too many messages at once. Implement backpressure on the client-side to limit the number of messages.",
      "D. All of the above",
    ],
    correctAnswer: "D. All of the above",
    explanation:
      "Frequent disconnections in a WebSocket application can be caused by several factors. Overloaded servers (A) can lead to dropped connections. Improper CORS configuration (B) or cross-origin requests can be a frequent cause. Client-side flooding (C) can overwhelm the server, resulting in disconnections. Therefore, the most comprehensive solution is to address all potential issues.",
    timeLimit: 120,
    codeSnippet:
      "//Example: Node.js server with Socket.IO\nconst io = require('socket.io')(server, {cors: {origin: '*'}});\n\nio.on('connection', (socket) => {\n  console.log('a user connected');\n\n  socket.on('chat message', (msg) => {\n    io.emit('chat message', msg);\n  });\n\n  socket.on('disconnect', () => {\n    console.log('user disconnected');\n  });\n});",
    hints: [
      "Consider server load",
      "Think about cross-origin requests",
      "Remember client behavior",
    ],
    tags: ["nodejs", "reactjs", "websockets", "real-time", "troubleshooting"],
  },
  {
    question:
      "You are designing an API using Node.js and MongoDB. You need to ensure the atomicity of a transaction that involves multiple database operations (inserting a new user, updating a related profile). Which MongoDB feature should you leverage to guarantee atomicity?",
    category: "Databases/Node.js/MongoDB",
    difficulty: "INTERMEDIATE",
    options: [
      "A. Using `forEach` loop in the server-side Javascript to perform all operations.",
      "B. Implementing optimistic locking on the data.",
      "C. Employing MongoDB transactions to group operations and ensure all-or-nothing execution.",
      "D. Using the `$isolated` operator to prevent interference from other concurrent operations.",
    ],
    correctAnswer:
      "C. Employing MongoDB transactions to group operations and ensure all-or-nothing execution.",
    explanation:
      "MongoDB transactions are designed to provide atomicity across multiple operations. Transactions allow you to group a series of operations together and either commit them all (if successful) or roll them back (if any operation fails). This guarantees data consistency.",
    timeLimit: 90,
    codeSnippet:
      "//Example: MongoDB transaction (Node.js)\nconst session = await mongoose.startSession();\nsession.startTransaction();\n\ntry {\n  const newUser = await User.create([{...}], { session });\n  await Profile.updateOne({ userId: newUser._id }, {...}, { session });\n  await session.commitTransaction();\n} catch (error) {\n  await session.abortTransaction();\n  throw error;\n} finally {\n  session.endSession();\n}",
    hints: ["Atomicity", "MongoDB transactions", "All or nothing"],
    tags: ["mongodb", "nodejs", "transactions", "atomicity", "database"],
  },
  {
    question:
      "In React.js, you have a component that needs to fetch data from an API. You want to use the `useEffect` hook. How should you handle potential errors during the API call to provide a user-friendly experience?",
    category: "React.js/API calls",
    difficulty: "INTERMEDIATE",
    options: [
      "A. Use a `try...catch` block inside the `useEffect` hook and update the component's state to display an error message.",
      "B. Ignore errors; the component will rerender correctly with the new data (or no data if the call fails).",
      "C. Use a `finally` block to always reset the component's state regardless of success or failure.",
      "D.  Use the `async` and `await` syntax and implicitly handle errors by not catching exceptions.",
    ],
    correctAnswer:
      "A. Use a `try...catch` block inside the `useEffect` hook and update the component's state to display an error message.",
    explanation:
      "The best practice is to use `try...catch` block to handle errors gracefully within `useEffect`. Fetching API data is often asynchronous, and errors can occur.  Catching the error allows you to update your component's state (e.g., setting an `error` state variable) so that the user is informed about the failure. This improves the user experience by providing feedback.",
    timeLimit: 90,
    codeSnippet:
      "//React Component\nimport React, { useState, useEffect } from 'react';\n\nfunction MyComponent() {\n  const [data, setData] = useState(null);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    async function fetchData() {\n      try {\n        const response = await fetch('/api/data');\n        if (!response.ok) {\n          throw new Error(`HTTP error! status: ${response.status}`);\n        }\n        const jsonData = await response.json();\n        setData(jsonData);\n      } catch (error) {\n        setError(error.message);\n      }\n    }\n    fetchData();\n  }, []);\n\n  if (error) return <p>Error: {error}</p>;\n  if (!data) return <p>Loading...</p>;\n  return <p>Data: {data.value}</p>;\n}\n",
    hints: ["Error handling", "User Experience", "useEffect"],
    tags: ["reactjs", "apicalls", "errorhandling", "useEffect", "frontend"],
  },
  {
    question:
      "You are working on a Python script and need to make it faster. The bottleneck is a computationally intensive function that processes large numerical datasets. What is the most suitable approach to significantly speed up the script?",
    category: "Python/Performance",
    difficulty: "INTERMEDIATE",
    options: [
      "A. Using the `multiprocessing` module to parallelize the computation across multiple CPU cores.",
      "B. Re-writing the function in JavaScript.",
      "C. Using a faster database for the input data.",
      "D. Replacing the Python interpreter with a different one, like PyPy.",
    ],
    correctAnswer:
      "A. Using the `multiprocessing` module to parallelize the computation across multiple CPU cores.",
    explanation:
      "The `multiprocessing` module allows you to take advantage of multiple CPU cores, enabling true parallelism. For computationally intensive tasks, distributing the work across multiple cores can significantly reduce execution time, especially if the task can be easily split into independent subtasks.",
    timeLimit: 90,
    codeSnippet:
      "//Python Example - Multiprocessing\nimport multiprocessing\n\ndef worker(data):\n    # computationally intensive task\n    return data * data\n\nif __name__ == '__main__':\n    data = [i for i in range(10000)]\n    with multiprocessing.Pool(multiprocessing.cpu_count()) as pool:\n        results = pool.map(worker, data)\n    print(sum(results))",
    hints: ["Parallelism", "CPU cores", "Multiprocessing"],
    tags: ["python", "performance", "multiprocessing", "optimization"],
  },
  {
    question:
      "You are tasked with developing a high-performance, concurrent network service in Rust. Which of the following standard library components or crates is most suitable to manage concurrent tasks and data sharing safely and efficiently?",
    category: "Rust/Concurrency",
    difficulty: "INTERMEDIATE",
    options: [
      "A. Using the `unsafe` keyword to bypass Rust's memory safety guarantees.",
      "B. Employing raw pointers for manual memory management.",
      "C. Leveraging threads and synchronization primitives like `Mutex` and `Arc` to manage shared mutable state safely.",
      "D. Using global mutable static variables.",
      "E. Implementing everything single-threaded to avoid synchronization problems.",
    ],
    correctAnswer:
      "C. Leveraging threads and synchronization primitives like `Mutex` and `Arc` to manage shared mutable state safely.",
    explanation:
      "Rust's ownership and borrowing system helps to prevent data races and memory issues. When dealing with concurrency and shared mutable state, `Mutex` (mutual exclusion) and `Arc` (atomic reference counting) are critical tools. `Mutex` protects data from concurrent modification, and `Arc` allows multiple threads to safely share ownership of data, preventing dangling pointers and memory leaks. These components are essential for writing concurrent Rust programs that are both efficient and safe. Avoiding `unsafe` as the primary solution is a better option.",
    timeLimit: 120,
    codeSnippet:
      '//Rust example: Threaded access with mutex\nuse std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    let counter = Arc::new(Mutex::new(0));\n    let mut handles = vec![];\n\n    for _ in 0..10 {\n        let counter = Arc::clone(&counter);\n        let handle = thread::spawn(move || {\n            let mut num = counter.lock().unwrap();\n            *num += 1;\n        });\n        handles.push(handle);\n    }\n\n    for handle in handles {\n        handle.join().unwrap();\n    }\n\n    println!("Result: {}", *counter.lock().unwrap());\n}',
    hints: ["Concurrency", "Rust's ownership", "Mutex and Arc", "Threads"],
    tags: ["rust", "concurrency", "threads", "mutex", "arc", "memory safety"],
  },
];

export default async function MCQsPage() {
  // const questions = await generateMCQs();
  // console.log("mcq questions", questions);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto py-8">
        <McqCard questions={questions} />
      </div>
    </Suspense>
  );
}
