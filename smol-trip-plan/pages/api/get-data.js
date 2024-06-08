// pages/api/get-data.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'data.json');

  try {
    if (fs.existsSync(filePath)) {
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(jsonData);
      res.status(200).json(data);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error('Error reading data.json:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
