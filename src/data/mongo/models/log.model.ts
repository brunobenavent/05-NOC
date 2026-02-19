import mongoose from 'mongoose';

const logScehma = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})


export const LogModel = mongoose.model('Log', logScehma)