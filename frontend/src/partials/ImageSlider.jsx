import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const ImageSlider = ({imgSrc}) => {
  return (
    <>
      {imgSrc && imgSrc.length > 0 && (
        <AwesomeSlider className='my-5'>
          {imgSrc.map(src =>  <div key={src} data-src={src} />)}
        </AwesomeSlider>
      )}
    </>
  )
};

export default ImageSlider;