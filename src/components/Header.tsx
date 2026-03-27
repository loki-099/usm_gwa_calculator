import logo from '/logo.png'

export const Header = () => {
  return (
    <header className='bg-linear-to-r from-primary-green to-primary-green-light border-b-2 border-primary-yellow sticky top-0 z-10'>
      <div className='px-4 py-3 md:py-4 max-w-5xl mx-auto flex items-center gap-x-4'>
        <span className='bg-white/5 text-white backdrop-blur-sm p-2 border border-white/20 rounded-md font-bold'>
          <img src={logo} alt='logo' className='w-12 h-12' />
        </span>
        <h1 className='text-2xl md:text-3xl font-bold text-white'>
          USM GWA Calculator
        </h1>
      </div>
    </header>
  )
}
