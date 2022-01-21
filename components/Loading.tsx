import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar value={66} />
      </div>
      
    </div>
  )
}

export default Loading;