import type { ThemeConfig } from 'antd';
import vars from '@/assets/styles/_variables.module.scss';

const config: ThemeConfig = {
  token: {
    fontFamily: vars.mainFont,
    fontSize: 16,
    colorPrimary: vars.primaryBlackColor,
  },
  components: {
    Input: {
      activeBorderColor: 'black',
      hoverBorderColor: vars.darkColor,
      controlOutline: vars.darkTransparentColor,
      colorBorder: vars.inputBorderColor,
    },
    Select: {
      colorPrimaryHover: vars.darkColor,
      colorPrimary: vars.darkColor,
      controlOutline: vars.darkTransparentColor,
      optionSelectedBg: vars.darkTransparentColor,
    },
    Menu: {
      itemHoverBg: vars.grayscaleColor3,
      itemActiveBg: vars.grayscaleColor4,
      itemSelectedBg: vars.grayscaleColor4,
    },
  },
};

export default config;
