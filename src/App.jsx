import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordHistory, setPasswordHistory] = useState([]);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    // Notify user that password is copied
    alert("Password copied to clipboard!");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const addToPasswordHistory = () => {
    setPasswordHistory([...passwordHistory, password]);
  };

  const clearPasswordHistory = () => {
    setPasswordHistory([]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-lg mx-auto shadow-xl rounded-lg px-8 py-10 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center text-4xl font-semibold mb-10">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-3 px-4 bg-gray-700 text-white text-lg"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 ml-2 transition duration-300"
          >
            Copy
          </button>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-white text-lg">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer w-full ml-4"
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-white text-lg">Include Numbers</label>
            <label className={`relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition duration-300 ${numberAllowed ? 'bg-green-500' : 'peer-checked:bg-gray-900'}`}>
              <input
                className="peer sr-only"
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <span className={`toggle-label absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all ${numberAllowed ? 'peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent' : ''}`} />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-white text-lg">Include Special Characters</label>
            <label className={`relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition duration-300 ${charAllowed ? 'bg-green-500' : 'peer-checked:bg-gray-900'}`}>
              <input
                className="peer sr-only"
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <span className={`toggle-label absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all ${charAllowed ? 'peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent' : ''}`} />
            </label>
          </div>
          <div className="flex justify-center"> {/* Centering container for buttons */}
            <button
              onClick={addToPasswordHistory}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition duration-300 mr-4"
            >
              Add to History
            </button>
            <button
              onClick={clearPasswordHistory}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Clear History
            </button>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-white text-lg font-semibold mb-2">Password History</h2>
            <ul className="text-white">
              {passwordHistory.map((pass, index) => (
                <li key={index} className="mb-2">
                  {pass}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
