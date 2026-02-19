import { number } from "framer-motion"


export const fullDataToYear = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
        year : "numeric"
    })
}