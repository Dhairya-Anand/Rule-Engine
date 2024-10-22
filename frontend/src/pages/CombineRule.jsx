import React, { useState } from "react";

const CombineRule = () => {
  const [ruleName, setRuleName] = useState("");
  const [rules, setRules] = useState(["", ""]); // Initialize with two empty rules
  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Handle change in each rule condition
  const handleRuleChange = (index, value) => {
    const updatedRules = [...rules];
    updatedRules[index] = value;
    setRules(updatedRules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty or whitespace-only inputs
    if (!ruleName.trim() || rules.some(rule => !rule.trim())) {
      setErrorMessage("Please fill in all fields without blank spaces.");
      setResponseMessage(null);
      return;
    }

    try {
      const response = await fetch("/api/combine-rule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ruleName,
          rules, // Sending the two rules
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage(data.message);
        setErrorMessage(null);
      } else {
        setErrorMessage(data.error || "Something went wrong");
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
        <h1 className="text-3xl font-bold mb-6 text-center">Combine Rules</h1>
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

          {rules.map((rule, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="text-sm text-gray-500">Enter Rule Condition {index + 1}:</div>
              <input
                type="text"
                placeholder={`Rule Condition ${index + 1}`}
                value={rule}
                onChange={(e) => handleRuleChange(index, e.target.value)}
                required
                className="shadow border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            >
              Combine Rules
            </button>
          </div>
        </form>

        {responseMessage && (
          <div className="mt-4 p-2 bg-green-200 text-green-800 text-sm rounded">
            {responseMessage}
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

export default CombineRule;