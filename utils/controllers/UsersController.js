import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
    static async postNew(req, res) {
        const { email, password } = req.body;

        if (!email) return res.status(400).json({ error: 'Missing email' });
        if (!password) return res.status(400).json({ error: 'Missing password' });

        const user = await dbClient.db.collection('users').findOne({ email });
        if (user) return res.status(400).json({ error: 'Already exist' });

        const hashedPassword = sha1(password);
        const result = await dbClient.db.collection('users').insertOne({ email, password: hashedPassword });

        res.status(201).json({ id: result.insertedId, email });
    }
}

export default UsersController;
