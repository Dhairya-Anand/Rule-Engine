import React, { useState } from "react";

const EvaluateRule = () => {
  const [ruleName, setRuleName] = useState("");
  const [dataString, setDataString] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ruleName.trim() || !dataString.trim()) {
      setErrorMessage("Please fill in all fields without blank spaces.");
      setResponseMessage(null);
      return;
    }

    let data;
    try {
      data = JSON.parse(dataString);
    } catch (error) {
      setErrorMessage("Invalid JSON format: " + error.message);
      setResponseMessage(null);
      return;
    }

    try {
      const response = await fetch("/api/evaluate-rule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ruleName,
          data,
        }),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setResponseMessage(result.evaluationResult ? "True" : "False");
        setErrorMessage(null);
      } else {
        setErrorMessage(result.error || "Something went wrong");
        setResponseMessage(null);
      }
    } catch (error) {
      setErrorMessage("Network error: " + error.message);
      setResponseMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-md rounded px-16 py-8 mt-6 mb-4 w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Evaluate Rule</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="text-sm text-gray-500">Enter Rule Name:</div>
            <input
              type="text"
              placeholder="Rule Name"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              required
              className="shadow border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <div className="text-sm text-gray-500">Enter Data as JSON:</div>
            <textarea
              placeholder='{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}'
              value={dataString}
              onChange={(e) => setDataString(e.target.value)}
              required
              rows="6"
              className="shadow border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            >
              Evaluate Rule
            </button>
          </div>
        </form>

        {responseMessage && (
          <div className="mt-4 p-2 bg-green-200 text-green-800 text-sm rounded">
            {`Rule Evaluation Result: ${responseMessage}`}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-2 bg-red-200 text-red-800 text-sm rounded">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluateRule;
