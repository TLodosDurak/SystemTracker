// types/designSystemTypes.ts
export interface ColorsType {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    errorColor: string;
    successColor: string;
    warnColor: string;
  }
  
  export interface TypographyType {
    heading: TypographyStyle;
    subheading: TypographyStyle;
    body: TypographyStyle;
  }
  
  export interface TypographyStyle {
    fontSize: number;
    fontWeight: string;
  }
  
  export interface SpacingsType {
    page: number;
    card: number;
    gridGutter: number;
  }
  