import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setImageUrl('');

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    setImageUrl(data.imageUrl);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>MCP Gallery</title>
      </Head>

      <h1 className="text-3xl font-bold mb-4">🖼️ MCP Gallery</h1>

      <input
        type="text"
        placeholder="描述你想要的图像..."
        className="w-full max-w-md px-4 py-2 mb-4 border rounded"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generateImage}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? '生成中...' : '生成图像'}
      </button>

      {imageUrl && (
        <div className="mt-6">
          <img src={imageUrl} alt="AI生成图像" className="rounded shadow" />
        </div>
      )}
    </div>
  );
}
