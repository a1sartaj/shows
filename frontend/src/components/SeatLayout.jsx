const COLS = 10;

const SeatLayout = ({ totalSeats = 24, onSeatClick, selectedShow, selectedSeats }) => {
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);
  const remainder = totalSeats % COLS;

  let rows = [];

  if (remainder !== 0) {
    rows.push(seats.slice(0, remainder));
    for (let i = remainder; i < seats.length; i += COLS) {
      rows.push(seats.slice(i, i + COLS));
    }
  } else {
    for (let i = 0; i < seats.length; i += COLS) {
      rows.push(seats.slice(i, i + COLS));
    }
  }

  const getRowLetter = (index) => String.fromCharCode(65 + index);

  return (
    <div className="flex flex-col items-center gap-3 w-full">

      {/* SCREEN */}
      <div className="w-4/5 sm:w-3/4 md:w-2/3 h-2 bg-gray-400 rounded mt-2" />
      <p className="text-xs sm:text-sm text-gray-400 mb-2">SCREEN</p>

      {/* SEATS */}
      {rows.map((row, rowIndex) => {
        const rowLetter = getRowLetter(rowIndex);

        return (
          <div
            key={rowIndex}
            className={`flex flex-wrap justify-center gap-1 sm:gap-2 ${rowIndex === 0 && row.length < COLS ? "justify-center" : ""
              }`}
          >
            {row.map((_, colIndex) => {
              const seatLabel = `${rowLetter}${colIndex + 1}`;

              // console.log(`seat label ${seatLabel} : `, selectedShow)

              const booked = selectedShow.bookedSeats.includes(seatLabel)
              // const booked = null
              const selected = selectedSeats.includes(seatLabel)

              return (
                <button
                  key={seatLabel}
                  onClick={() => {
                    onSeatClick?.(seatLabel)
                  }}
                  disabled={booked}
                  className={`
                    w-7 h-7 text-[10px]
                    sm:w-8 sm:h-8 sm:text-xs
                    md:w-9 md:h-9 md:text-sm
                    lg:w-10 lg:h-10 lg:text-base
                     rounded-md flex items-center justify-center
                     ${booked ? "bg-glass-bg" : selected ? 'bg-button-primary' : 'bg-white text-black'}

                    `}>
                  {seatLabel}
                </button>
              );
            })}
          </div>
        );
      })}
    </div >
  );
};

export default SeatLayout;
