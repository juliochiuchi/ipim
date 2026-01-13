import { useState } from 'react'
import { Clock2, ChevronLeft, ChevronRight } from 'lucide-react'

const SCHEDULES = [
  {
    day: 'DOMINGO',
    events: [
      { name: 'Escola Bíblica Dominical', time: '09h00' },
      { name: 'Culto de Celebração', time: '19h30' },
    ],
  },
  {
    day: 'QUARTA',
    events: [
      { name: 'Culto de Oração e Estudo', time: '19h30' },
    ],
  },
]

export default function Paper() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 1

  const next = () => {
    if (currentIndex < SCHEDULES.length - itemsPerPage) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="w-full mx-auto px-4 phone:max-w-[35rem] phone:px-0 laptop:max-w-[35rem] laptop:w-[35rem] desktop:max-w-[60rem] desktop:w-[60rem] desktop:px-0">
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <p className="font-poppins text-[#333] font-bold tracking-wider text-sm">
            Programação
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="p-1.5 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-[#333]"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= SCHEDULES.length - itemsPerPage}
            className="p-1.5 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-[#333]"
            aria-label="Próximo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col phone:flex-row gap-6 mb-6">
        {SCHEDULES.slice(currentIndex, currentIndex + itemsPerPage).map(
          (schedule, index) => (
            <div
              key={index}
              className="bg-white flex-1 h-52 rounded-md shadow-sm w-full phone:min-w-[18rem] transition-all duration-300"
            >
              <div className="bg-black rounded-t-md p-4">
                <p className="font-poppins text-white font-bold tracking-wider">
                  {schedule.day}
                </p>
              </div>

              <div className="flex flex-col p-4">
                {schedule.events.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 border-b border-[#f6f6f6] last:border-b-0"
                  >
                    <div>
                      <span className="font-poppins text-[#333] font-bold tracking-wider text-sm m-0 p-0">
                        {event.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock2 size={20} color="#333" />
                      <span className="font-poppins text-[#333] font-bold tracking-wider text-sm m-0 p-0">
                        {event.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      <div className="text-right">
        <a href="/calendar" className="font-poppins text-[#333] font-bold tracking-wider text-sm border p-4 rounded-md">
          Ver Programação Completa
        </a>
      </div>
    </div>
  )
}
