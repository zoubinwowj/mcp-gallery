import { useState } from 'react';
import Head from 'next/head';

const backgrounds = [
  'https://example.com/monalisa.jpg',
  'https://example.com/starry-night.jpg',
  'https://example.com/the-scream.jpg',
  'https://example.com/the-persistence-of-memory.jpg',
];

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setImageUrl('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  // 随机选择背景
  const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-8 relative"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Head>
        <title>MCP Gallery</title>
      </Head>

      {/* 钱包登录按钮 */}
      <div className="absolute top-6 right-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-lg">
          登录钱包
        </button>
      </div>

      {/* 页面内容 */}
      <div className="bg-white bg-opacity-60 p-8 rounded-xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">🖼️ MCP Gallery</h1>

        <input
          type="text"
          placeholder="描述你想要的图像..."
          className="w-full px-4 py-2 mb-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={generateImage}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-pink-600 transition ease-in-out duration-300"
        >
          {loading ? '生成中...' : '生成图像'}
        </button>
      </div>

      {imageUrl && (
        <div className="mt-8 max-w-lg w-full">
          <img
            src={imageUrl}
            alt="AI生成图像"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
