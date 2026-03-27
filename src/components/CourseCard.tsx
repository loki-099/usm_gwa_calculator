const CourseCard = ({
  course,
  units,
  grade,
  index,
  unitsHasError,
  removeCourse,
  setCourse,
  setUnits,
  setGrade,
}: {
  course: string
  grade: number
  units?: number
  index: number
  unitsHasError?: boolean
  removeCourse: (index: number) => void
  setCourse: (index: number, course: string) => void
  setUnits: (index: number, units?: number) => void
  setGrade: (index: number, grade: number) => void
}) => {
  return (
    <div className='bg-gray-150 rounded-md border border-gray-300  overflow-hidden'>
      {/* Heading */}
      <div className='w-full px-3 py-2 flex items-center justify-between border-b border-gray-300'>
        <h1 className='font-bold text-lg'>Course {index + 1}</h1>
        <button className='bg-red-50 border border-red-300 p-2 rounded-sm' onClick={() => removeCourse(index)}>
          <svg
            className='w-4 h-4 text-red-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
            />
          </svg>
        </button>
      </div>
      {/* Body */}
      <div className='flex flex-wrap gap-2 p-3'>
        <div className='w-full'>
          <label
            htmlFor={`course${index}`}
            className='block text-sm font-medium mb-1'
          >
            Course Title
          </label>
          <input
            id={`course${index}`}
            type='text'
            className='w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green p-2 rounded-md'
            placeholder='Enter course title'
            value={course}
            onChange={(e) => setCourse(index, e.target.value)}
          />
        </div>
        <div className='w-full flex justify-between items-center gap-2'>
          <div className='w-full flex-1'>
            <label
              htmlFor={`units${index}`}
              className='block text-sm font-medium mb-1'
            >
              Units
            </label>
            <input
              id={`units${index}`}
              type='number'
              className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 ${
                unitsHasError
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-gray-300 focus:ring-primary-green'
              }`}
              placeholder='Enter units'
              value={units === undefined || units === null ? '' : units}
              onChange={(e) => {
                const val = e.target.value
                if (val === '') {
                  setUnits(index, undefined)
                } else {
                  setUnits(index, Number(val))
                }
              }}
            />
          </div>
          <div className='flex-1 w-full'>
            <label
              htmlFor={`grade${index}`}
              className='block text-sm font-medium mb-1'
            >
              Grade
            </label>
            <div className='block w-full'>
              <select
                id={`grade${index}`}
                className='block w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green p-2 rounded-md'
                value={grade}
                onChange={(e) => setGrade(index, Number(e.target.value))}
              >
                <option value={1.0}>1.0</option>
                <option value={1.25}>1.25</option>
                <option value={1.50}>1.50</option>
                <option value={1.75}>1.75</option>
                <option value={2.0}>2.0</option>
                <option value={2.25}>2.25</option>
                <option value={2.50}>2.50</option>
                <option value={2.75}>2.75</option>
                <option value={3.0}>3.0</option>
                <option value={4.0}>4.0</option>
                <option value={5.0}>5.0</option>
              </select>
            </div>
            {/* <input
              id={`grade${id}`}
              type='number'
              className='w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green p-2 rounded-md'
              placeholder='Enter grade'
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
