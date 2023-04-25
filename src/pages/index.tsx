import React, { useState } from 'react';

export default function Home() {
  const [searchVal, setSearchVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');

  async function generateImage(): Promise<any> {
    if (searchVal === '' || null) return;
    setLoading(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `${searchVal}`,
      }),
    });

    const data = await response.json();
    setImage(data.url);
    setLoading(false);
    setSearchVal('');
  }

  return (
    <div>
      <h2>Enter a prompt, watch the magic happen </h2>

      <textarea
        rows={3}
        placeholder="Example"
        value={searchVal}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          setSearchVal(event.target.value)
        }
      />

      <button onClick={() => generateImage()}>
        {loading ? 'Loading...' : 'Generate image'}
      </button>

      {image && <img src={image} alt="generated image" />}
    </div>
  );
}
