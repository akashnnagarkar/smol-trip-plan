// pages/index.js
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home({ data }) {
  const router = useRouter();

  const handleAddDataClick = () => {
    router.push('/data-input');
  };

  return (
    <>
      <Head>
        <title>{data.title || 'Road Trip Date'}</title>
        <meta name="description" content="Made for smolest" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-custom-blue via-custom-green to-custom-purple p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 bg-opacity-80 backdrop-filter backdrop-blur-lg w-full max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">
            🚗 {data.title || 'No Title'}
          </h1>
          <div className="flex flex-col sm:flex-row justify-between mb-6 sm:mb-8 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl mb-4 sm:mb-0"><span className='font-bold'>Location:</span> {data.location || 'No Location'}</h2>
            <h2 className="text-xl sm:text-2xl"><span className='font-bold'>Date:</span> {data.date || 'No Date'}</h2>
          </div>
          <h2 className="text-2xl mb-4 text-center">Agenda:</h2>
          <ul className="space-y-4 mb-6 sm:mb-8">
            {data.list ? (
              data.list.map((item, index) => (
                <li key={index} className="bg-gray-700 text-white p-4 rounded shadow transition-transform transform hover:scale-105">
                  <p>{item}</p>
                </li>
              ))
            ) : (
              <p className="text-center">No items in the list</p>
            )}
          </ul>
          <div className="text-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              onClick={handleAddDataClick}
            >
              Add/Edit Plans
            </button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-500">Developed with love by Akash Nagarkar❤️</p>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'data.json');
  let data = {};

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(jsonData);
  } catch (err) {
    console.error('Error reading or parsing data.json:', err);
  }

  return {
    props: {
      data,
    },
  };
}
