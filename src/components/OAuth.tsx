import { useLocation, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import { toast } from 'react-toastify';

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  };

  return (
    <div className='w-2/3 mx-auto'>
      <button
        className='w-full py-1.5 font-bold text-sm text-gray-600 rounded-sm border border-slate-400 bg-white transition duration-200 hover:bg-slate-50'
        onClick={onGoogleClick}
      >
        <svg
          className='inline w-5 mr-2'
          viewBox='0 0 124 124'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0)'>
            <path
              d='M119.081 51.0933L69.0114 51.0909C66.8004 51.0909 65.0083 52.8828 65.0083 55.0938V71.0887C65.0083 73.2992 66.8004 75.0916 69.0112 75.0916H97.2073C94.1198 83.1043 88.3572 89.8147 81.005 94.0785L93.0277 114.891C112.314 103.737 123.716 84.1664 123.716 62.2585C123.716 59.1391 123.486 56.9092 123.026 54.3982C122.677 52.4905 121.02 51.0933 119.081 51.0933Z'
              fill='#167EE6'
            />
            <path
              d='M62.3391 99.1246C48.5404 99.1246 36.4944 91.5853 30.0247 80.429L9.21289 92.4247C19.8039 110.781 39.6442 123.141 62.3391 123.141C73.4724 123.141 83.9775 120.144 93.0272 114.92V114.891L81.0044 94.0785C75.505 97.2682 69.141 99.1246 62.3391 99.1246Z'
              fill='#12B347'
            />
            <path
              d='M93.0275 114.919V114.891L81.0047 94.0781C75.5053 97.2675 69.1418 99.1242 62.3394 99.1242V123.141C73.4727 123.141 83.9783 120.143 93.0275 114.919Z'
              fill='#0F993E'
            />
            <path
              d='M24.9802 61.7646C24.9802 54.9631 26.8363 48.5999 30.0253 43.1007L9.21345 31.105C3.96074 40.1262 0.963379 50.6028 0.963379 61.7646C0.963379 72.9265 3.96074 83.4031 9.21345 92.4242L30.0253 80.4285C26.8363 74.9294 24.9802 68.5661 24.9802 61.7646Z'
              fill='#FFD500'
            />
            <path
              d='M62.3391 24.4057C71.3372 24.4057 79.6023 27.603 86.0581 32.9214C87.6508 34.2334 89.9656 34.1387 91.4244 32.6798L102.757 21.3467C104.413 19.6915 104.295 16.9821 102.527 15.4482C91.7102 6.06454 77.6368 0.388916 62.3391 0.388916C39.6442 0.388916 19.8039 12.7498 9.21289 31.1056L30.0247 43.1013C36.4944 31.9449 48.5404 24.4057 62.3391 24.4057Z'
              fill='#FF4B26'
            />
            <path
              d='M86.0584 32.9214C87.6511 34.2334 89.9661 34.1387 91.4248 32.6798L102.758 21.3467C104.413 19.6915 104.295 16.9821 102.527 15.4482C91.7106 6.0643 77.6372 0.388916 62.3394 0.388916V24.4057C71.3372 24.4057 79.6026 27.603 86.0584 32.9214Z'
              fill='#D93F21'
            />
          </g>
          <defs>
            <clipPath id='clip0'>
              <rect
                width='122.752'
                height='122.752'
                fill='white'
                transform='translate(0.963379 0.388794)'
              />
            </clipPath>
          </defs>
        </svg>
        <span className=' align-middle'>
          Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with Google
        </span>
      </button>
    </div>
  );
};
export default OAuth;
