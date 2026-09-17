import { useState } from 'react'
import { Clock2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

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
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div>
          <p className="font-poppins font-bold tracking-[0.14em] text-sm text-ipimNavy dark:text-white uppercase">
            Programação
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="p-2 rounded-full hover:bg-ipimCream dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-ipimNavy dark:text-gray-300"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} strokeWidth={2.2} />
          </button>
          <button
            onClick={next}
            disabled={currentIndex >= SCHEDULES.length - itemsPerPage}
            className="p-2 rounded-full hover:bg-ipimCream dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-ipimNavy dark:text-gray-300"
            aria-label="Próximo"
          >
            <ChevronRight size={20} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div className="mb-5">
        {SCHEDULES.slice(currentIndex, currentIndex + itemsPerPage).map(
          (schedule, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900/50 flex-1 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden transition-all duration-300 w-full"
            >
              <div className="bg-gradient-to-r from-ipimNavy to-ipimNavyLight dark:from-ipimNavyDark dark:to-ipimNavy px-5 py-4">
                <p className="font-poppins text-white font-bold tracking-[0.18em] text-sm">
                  {schedule.day}
                </p>
              </div>

              <div className="flex flex-col p-5">
                {schedule.events.map((event, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0"
                  >
                    <div className="min-w-0 pr-3">
                      <span className="font-poppins font-semibold tracking-tight text-sm text-ipimNavy dark:text-gray-100 m-0 p-0 block">
                        {event.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <div className="w-9 h-9 rounded-full bg-ipimGreen/10 dark:bg-ipimGreen/15 flex items-center justify-center">
                        <Clock2 size={17} className="text-ipimGreen dark:text-ipimGreenLight" />
                      </div>
                      <span className="font-poppins font-bold tracking-tight text-sm text-ipimNavy dark:text-gray-100 m-0 p-0">
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

      <div className="text-left">
        <Link
          to="/calendar"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-ipimNavy/15 dark:border-white/10 text-ipimNavy dark:text-white font-poppins font-semibold text-sm tracking-wide hover:bg-ipimNavy hover:text-white dark:hover:bg-white dark:hover:text-ipimNavy hover:border-ipimNavy dark:hover:border-white transition-all duration-200 active:scale-[0.98]"
        >
          Ver Programação Completa
        </Link>
      </div>
    </div>
  )
}
