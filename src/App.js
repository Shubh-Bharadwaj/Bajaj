import React, { useState } from 'react';

function App() {
  const [jsonData, setJsonData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonData);
      const response = await fetch('https://testbfhl.herokuapp.com/bfhl', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });
      const responseData = await response.json();
      setResponse(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const renderFilteredResponse = () => {
    if (!response) {
      return null;
    }

    const filteredData = [];
    if (selectedOptions.includes('Numbers')) {
      filteredData.push({ Numbers: response.numbers.join(', ') });

    }
    if (selectedOptions.includes('alphabets')) {
      filteredData.push({ Alphabets: response.alphabets.join(', ') });
    }
    if (selectedOptions.includes('highestLowercaseAlphabet')) {
      filteredData.push({ HighestLowercaseAlphabet: response.highest_lowercase_alphabet });

    }

    return filteredData.map((item, index) => (
      <li key={index}>{item}</li>
    ));
  };

  return (
    <div>
      <h2>Sample Output:</h2>
      <p>In case, user selects only "Numbers" from the multiselect filter, response will look as following:</p>
      <div>
        <textarea
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          placeholder="Enter JSON data"
        />
        <button onClick={handleSubmit}>Submit</button>
        <div>
          <select multiple onChange={handleOptionChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highestLowercaseAlphabet">Highest Lowercase Alphabet</option>
          </select>
        </div>
        <div>
          <h3>Filtered Response:</h3>
          <ul>
            {renderFilteredResponse()}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;