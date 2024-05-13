// theme/ComponentsConfig.ts
import { ThemeManager } from 'react-native-ui-lib';

ThemeManager.setComponentTheme('Card', {
  borderRadius: 8
});

ThemeManager.setComponentTheme('Button', (props: { square?: boolean }, context: any) => {
  if (props.square) {
    return { borderRadius: 0 };
  }
});
