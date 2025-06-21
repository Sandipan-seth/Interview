import React from 'react'
import VapiWidget from './Pages/Interview'

const App = () => {
  return (
    <div>
      <VapiWidget
        apiKey= {import.meta.env.VITE_VAPI_API_KEY}
        assistantId={import.meta.env.VITE_VAPI_ASSISTANT_ID}
      />
    </div>
  );
}

export default App
