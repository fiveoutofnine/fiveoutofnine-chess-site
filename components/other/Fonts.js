import { Global } from '@emotion/react'

const Fonts = () => (
    <Global
        styles={`
            @font-face {
                font-family: Circular Std;
                src: url("/fonts/CircularStd500.ttf") format("truetype");
                font-size: normal;
                font-display: block;
            }
            @font-face {
                font-family: Circular Std Light;
                src: url("/fonts/CircularStd-Light.otf") format("truetype");
                font-size: normal;
                font-display: block;
            }
        `}
    />
)

export default Fonts
