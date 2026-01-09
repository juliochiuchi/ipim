import bannerJesus from '../../assets/jesus-banner.jpg'

export function Banner() {
  return (
    <section className="relative flex h-[100vh] bg-cover bg-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={bannerJesus} alt="banner Jesus" className="h-full w-full object-cover" />
      </div>
      <div
        className="relative z-10 mx-auto my-0 flex w-full items-center text-center phone:flex-wrap phone:justify-start
          laptop:h-auto laptop:flex-nowrap laptop:justify-center laptop:gap-96"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-poppins font-bold text-white phone:text-[2rem] laptop:text-[4em]">
            Revelar o amor de <br />
            <span className="italic underline decoration-indigo-500 underline-offset-4">
              Jesus
            </span>{' '}
            ao mundo
          </h1>

          <h3 className="font-nunito font-medium text-white phone:px-8 phone:text-[.9rem] laptop:text-[18px]">
            através da pregação do evangelho da graça e da fé.
          </h3>
        </div>
      </div>
    </section>
  )
}
