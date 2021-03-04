import { keyframes } from 'styled-components';

export const FadeInAnimation = keyframes`  
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const MenuSlideDown = keyframes`  
  from { transform:translateY(-100px) }
  to { transform:translateY(0) }
`;

export const SlideUpModal = keyframes`  
  from { transform:translate(-50%,0px) }
  to { transform:translate(-50%,-50%) }
`;
export const SlideUpModalMobile = keyframes`  
  from { transform:translateY(100%) }
  to { transform:translateY(0) }
`;

export const Rotate = keyframes`
    to {
        transform: rotateZ(360deg);
    }
`;
