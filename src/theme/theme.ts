import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    colors: {
        primary: string;
        background: string;
        error: string;
        success: string;
        disaled: string;
    };
  }
}

export const theme = {
    colors: {
        primary: '#fff',
        background: '#000',
        error: '#A85661',
        success: '#76A653',
        disaled: '#989898'
    },
};