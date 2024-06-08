// pages/api/save-data.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'data.json');

  if (req.method === 'POST') {
    const { title, location, date, list } = req.body;
    const data = { title, location, date, list };

    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error writing to data.json:', err);
      res.status(500).json({ error: 'Failed to save data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
