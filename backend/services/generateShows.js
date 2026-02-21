import movieModel from "../models/movie.Model.js"
import showModel from "../models/show.Model.js"

// Time Slots
const TIME_SLOTS = [9, 12, 15, 18, 21];
const TICKET_PRICE = [49, 99, 149, 199, 249, 299, 349, 499]
const SEAT_LAYOUT = [48, 56, 64, 72, 80, 88, 96, 100]
const FORMAT = ["2D", "3D", "IMAX 2D", "IMAX 3D", "4DX", "Dolby", "ScreenX", "VIP"]

export const generateShows = async () => {
    try {

        const movieId = await movieModel.find().select('movieId')

        const now = new Date()

        for (const movieid of movieId) {

            for (let day = 0; day < 3; day++) {

                const date = new Date()

                date.setDate(date.getDate() + day)

                // console.log(date)

                for (const hour of TIME_SLOTS) {
                    const showTime = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        hour,
                        0,
                        0,
                    )

                    if (showTime < now) continue

                    const ramdom = Math.floor(Math.random() * 8)

                    const expireAt = new Date(new Date(showTime).getTime() + 4 * 60 * 60 * 1000);

                    const screen = `Screen ${ramdom + 1}`

                    const exist = await showModel.findOne({ movieId : movieid, showDateTime: showTime })

                    if (exist) continue


                    const show = await showModel.create({
                        movieId: movieid,
                        showDateTime: showTime,
                        price: TICKET_PRICE[ramdom],
                        totalSeats: SEAT_LAYOUT[ramdom],
                        screen,
                        format: FORMAT[ramdom],
                        language: 'Hindi', 
                        expireAt,

                    })

                }


            }

        }

        console.log("Successfully Added shows")
    } catch (error) {
        console.error("Auto Create Shows error : ", error)
    }
}