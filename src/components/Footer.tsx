const Footer = () => {
  return (
    <footer className='bg-primary-gray border-t-2 border-primary-yellow'>
      <div className='max-w-5xl mx-auto p-4'>
        {/* <hr className='my-4 border-t-2 border-gray-200'></hr> */}
        <div
          className='flex items-center text-sm md:text-base text-gray-100 gap-1.5 flex-wrap justify-center sm:justify-start'
        >
          <span
            className='font-semibold text-gray-100 uppercase tracking-widest text-[10px] md:text-xs mr-2 border-r border-gray-300 pr-3'
          >
            USM GWA CALCULATOR
          </span>
          Developed by
          <span
            className='font-bold text-primary-yellow tracking-wide'
          >
            Luis Lloyd Tolentino
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
