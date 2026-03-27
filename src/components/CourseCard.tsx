import { useEffect, useMemo, useRef, useState } from 'react'

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
  const gradeOptions = useMemo(
    () => [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 4.0, 5.0],
    [],
  )
  const [isGradeOpen, setIsGradeOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isGradeOpen) return

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null
      if (target && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsGradeOpen(false)
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsGradeOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isGradeOpen])

  const toggleGrade = () => setIsGradeOpen(!isGradeOpen)
  const selectGrade = (val: number) => {
    setGrade(index, val)
    setIsGradeOpen(false)
  }

  const formatGrade = (val: number) => String(val).includes('.') ? String(val) : `${val}.0`

  return (
    <div className='bg-gray-150 rounded-md border border-gray-300'>
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
            className='w-full h-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green p-2 rounded-md'
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
              className={`w-full h-10 border p-2 rounded-md focus:outline-none focus:ring-2 ${
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
            <div className='relative w-full' ref={dropdownRef}>
              {/* Hidden input so label htmlFor still points somewhere */}
              <input id={`grade${index}`} className='sr-only' readOnly value={grade} />

              <button
                type='button'
                aria-haspopup='listbox'
                aria-expanded={isGradeOpen}
                className='w-full h-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green px-3 rounded-md flex items-center justify-between'
                onClick={toggleGrade}
              >
                <span className='text-sm'>{Number.isFinite(grade) ? formatGrade(grade) : 'Select grade'}</span>
                <svg className='w-4 h-4 text-gray-500' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                  <path fillRule='evenodd' d='M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z' clipRule='evenodd' />
                </svg>
              </button>

              {isGradeOpen ? (
                <div
                  role='listbox'
                  className='absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-56 overflow-auto'
                >
                  {gradeOptions.map((opt) => {
                    const isActive = opt === grade
                    return (
                      <button
                        key={opt}
                        type='button'
                        role='option'
                        aria-selected={isActive}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                          isActive ? 'bg-primary-green/10 font-semibold' : ''
                        }`}
                        onClick={() => selectGrade(opt)}
                      >
                        {formatGrade(opt)}
                      </button>
                    )
                  })}
                </div>
              ) : null}
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
