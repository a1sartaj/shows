import showModel from "../models/show.Model.js";




export const createShow = async (req, res) => {
    try {

        const { movieId, showDateTime, screen, format, language, price, totalSeats } = req.body;

        const exist = await showModel.findOne({ movieId, showDateTime, screen })

        if (exist) {
            return res.status(400).json({ success: false, message: 'Show already exists' })
        }

        const expireAt = new Date(new Date(showDateTime).getTime() + 4 * 60 * 60 * 1000);

        const show = await showModel.create({
            movieId,
            showDateTime,
            price,
            totalSeats,
            screen,
            format,
            language,
            expireAt,
        })

        return res.status(201).json({ success: true, message: 'Show created successfully', data: show })

    } catch (error) {
        console.error("Create show error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create show",
        });
    }
}

export const getAvailableDates = async (req, res) => {
    try {
        const { movieId } = req.params;

    

        const shows = await showModel.find({ movieId }).select('showDateTime')

        if (!shows || shows.length === 0) {
            return res.status(404).json({ success: false, message: 'No shows found for the given movie' })
        }

        const dates = [...new Set(shows.map(show => show.showDateTime.toISOString().split('T')[0]))]

        return res.status(200).json({ success: true, message: 'Available dates fetched successfully', data: dates })

    } catch (error) {
        console.error("Get available dates error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch available dates",
        });
    }
}

export const getShowsByDate = async (req, res) => {

    try {

        const { movieId, date } = req.query;

        if (!movieId || !date) {
            return res.status(400).json({ success: false, message: 'Movie ID and date are required' })
        }

        const start = new Date(`${date}T00:00:00.000Z`)
        const end = new Date(`${date}T23:59:59.999Z`)

        const shows = await showModel.find({ movieId, showDateTime: { $gte: start, $lte: end } }).sort({ showDateTime: 1 })

        res.status(200).json({ success: true, message: 'Shows fetched successfully', data: shows })

    } catch (error) {
        console.error("Get shows by date error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch shows by date",
        });
    }
}



