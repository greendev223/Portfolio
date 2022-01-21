// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

const PageLoading = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gray-300 ">
      <div className='text-45 text-indigo-600 font-medium'>
        {/* <CircularProgressbar value={66} /> */}
        Loading...
      </div>
    </div>
  )
}

export default PageLoading;