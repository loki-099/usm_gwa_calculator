import './App.css';
import { Header } from './components/Header';
import Footer from './components/Footer';
import CourseCard from './components/CourseCard';
import { useEffect, useState } from 'react';

function App() {
  type Course = {
    course?: string;
    units?: number;
    grade?: number;
  };

  const [courses, setCourses] = useState<Course[]>([]);
  const [unitsErrorIndices, setUnitsErrorIndices] = useState<number[]>([]);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [gwaResult, setGwaResult] = useState<number | null>(null);
  const [totalUnits, setTotalUnits] = useState<number>(0);
  const [academicAward, setAcademicAward] = useState<string>('None');

  const showErrorToast = (message: string) => {
    setErrorToast(message);
    window.clearTimeout((showErrorToast as unknown as { _t?: number; })._t)
      ; (showErrorToast as unknown as { _t?: number; })._t = window.setTimeout(() => {
        setErrorToast(null);
      }, 3000);
  };

  const validateUnitsOnly = (list: Course[]) => {
    const invalid: number[] = [];
    for (let i = 0; i < list.length; i++) {
      const u = list[i]?.units;
      if (u === 0 || u === null || u === undefined) invalid.push(i);
    }
    return invalid;
  };

  const addCourse = () => {
    setCourses([...courses, { course: '', units: 3, grade: 1.0 }]);
  };

  const removeCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
    setUnitsErrorIndices((prev) => prev.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i)));
  };

  const setCourse = (index: number, course: string) => {
    setCourses((prev) => {
      const newCourses = [...prev];
      newCourses[index] = { ...prev[index], course };
      return newCourses;
    });
  };

  const setUnits = (index: number, units?: number) => {
    setCourses((prev) => {
      const newCourses = [...prev];
      newCourses[index] = { ...prev[index], units };
      return newCourses;
    });

    if (units !== 0 && units !== null && units !== undefined) {
      setUnitsErrorIndices((prev) => prev.filter((i) => i !== index));
    }
  };

  const setGrade = (index: number, grade: number) => {
    setCourses((prev) => {
      const newCourses = [...prev];
      newCourses[index] = { ...prev[index], grade };
      return newCourses;
    });
  };

  const calculateGWA = () => {
    const invalidUnits = validateUnitsOnly(courses);
    if (invalidUnits.length > 0) {
      setUnitsErrorIndices(invalidUnits);
      showErrorToast('Please enter valid units for the highlighted course(s).');
      const first = invalidUnits[0];
      window.setTimeout(() => {
        const el = document.getElementById(`units${first}`);
        el?.focus?.();
      }, 0);
      return;
    } else {
      let totalUnits = 0;
      let totalGrade = 0;
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        totalUnits += course.units || 0;
        totalGrade += (course.grade || 0) * (course.units || 0);
      }
      let gwa = totalGrade / totalUnits;
      if (gwa <= 1.25) {
        setAcademicAward('UAA');
      } else if (1.26 <= gwa && gwa <= 1.5) {
        setAcademicAward('CAA');
      } else {
        setAcademicAward('None');
      }
      setTotalUnits(totalUnits);
      setGwaResult(gwa);
    }

    console.log(courses);
    console.log(gwaResult);
  };

  useEffect(() => {
    setCourses([
      {
        course: '',
        units: 3,
        grade: 1.0,
      },
      {
        course: '',
        units: 3,
        grade: 1.0,
      },
      {
        course: '',
        units: 3,
        grade: 1.0,
      },
    ]);
  }, []);

  return (
    <>
      <div className='min-h-screen bg-gray-100 font-display text-primary-gray'>
        {errorToast ? (
          <div className='fixed w-full top-16 px-4 left-1/2 -translate-x-1/2 z-50'>
            <div className='bg-red-600 max-w-md mx-auto text-white px-4 py-2 rounded-md shadow-lg border border-red-700'>
              <h1 className='font-bold text-white text-md'>Invalid Units</h1>
              <p className='text-white text-sm'>{errorToast}</p>
            </div>
          </div>
        ) : null}
        <Header />
        <main className='min-h-screen py-6 px-3 max-w-5xl mx-auto mb-10'>
          {/* Calculate Container */}
          <div className='rounded-md shadow-xl bg-gray-50'>
            {/* Calculate Header */}
            <div className='bg-linear-to-r from-primary-green to-primary-green-light p-4 md:p-6 border-b border-primary-yellow rounded-t-md'>
              <h1 className='font-bold text-white text-xl md:text-2xl'>
                Calculate your GWA
              </h1>
              <p className='text-white text-xs md:text-sm'>
                Enter your courses, corresponding units, grades, and calculate
                your GWA.
              </p>
            </div>
            {/* Course Input Form */}
            <div className='py-4 px-4 md:py-6 md:px-30'>
              <div className='flex items-center justify-between mb-4'>
                <h1 className='font-bold text-lg text-primary-gray'>
                  Your Courses
                </h1>
                <button className='bg-linear-to-r text-sm font-medium from-primary-green to-primary-green-light text-white px-3 py-1.5 rounded-md' onClick={addCourse}>
                  + Add Course
                </button>
              </div>
              <div className='flex flex-col gap-y-3'>
                {courses.length === 0 ? (
                  <div className='bg-gray-150 rounded-md border border-gray-300  overflow-hidden text-center p-4 px-10'>
                    <h1 className='font-bold text-md text-primary-gray'>
                      No courses added yet
                    </h1>
                    <p className='text-xs text-primary-gray'>
                      Click the <span className='font-bold text-primary-green'>+ Add Course</span> button above to get started.
                    </p>
                  </div>
                ) : (
                  courses.map((course, index) => (
                    <CourseCard
                      key={index}
                      course={course.course || ''}
                      units={course.units ?? undefined}
                      grade={course.grade || 1.0}
                      index={index}
                      unitsHasError={unitsErrorIndices.includes(index)}
                      removeCourse={removeCourse}
                      setCourse={setCourse}
                      setUnits={setUnits}
                      setGrade={setGrade}
                    />
                  ))
                )}
              </div>
              <button className='w-full bg-linear-to-r from-primary-green to-primary-green-light text-white font-bold text-lg  py-2 rounded-md mt-6' onClick={calculateGWA}>
                Calculate GWA
              </button>
              {/* <CourseCard course='Math 101' units={3} grade={90} /> */}
            </div>
          </div>
          {/* Result Container */}
          <div className='rounded-md overflow-hidden shadow-xl bg-gray-50 mt-6'>
            {/* Header */}
            <div className='w-full bg-linear-to-r from-primary-green to-primary-green-light p-4 md:p-6 border-b border-primary-yellow text-white'>
              <h1 className='font-bold text-xl md:text-2xl text-center'>Your GWA Result</h1>
            </div>
            {/* Body */}
            <div className='py-4 px-4 md:py-6 md:px-30'>
              <h1 className='font-bold text-2xl md:text-3xl text-center'>{gwaResult ? gwaResult.toFixed(2) : '0.00'}</h1>
              <hr className='my-3 border-t border-gray-300' />
              <div className='flex justify-around items-center'>
                <div className='text-primary-gray flex flex-col items-center'>
                  <p className='text-xl font-bold'>{totalUnits}</p>
                  <p className='text-sm'>Total Units</p>
                </div>
                <div className='text-primary-gray flex flex-col items-center'>
                  <p className='text-xl font-bold'>{academicAward}</p>
                  <p className='text-sm'>Academic Award</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;