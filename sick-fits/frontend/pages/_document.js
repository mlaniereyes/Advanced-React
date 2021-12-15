import Document, { Html, Head, NextScript, Main } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-CA">
        {
          // <Head>test</Head>
        }
        <body className="hello">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
