import Head from 'next/head';
import { pocket } from '../../helpers';
import { useIsLoggedIn } from '../../hooks';

const Layout = ({ children }) => {
  const isUserLoggedIn = useIsLoggedIn();

  const handleUserActionClick = (e) => {
    e.preventDefault();

    if(isUserLoggedIn) {
      pocket.logOut();
    } else {
      pocket.logInPart1();
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Easy Pocket Client</title>

        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:200,400&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="./favicon.ico" />
      </Head>
      <div className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">

        <nav id="header" className="w-full z-30 top-0 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">

            <div className="order-1 md:order-2">
              <span className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
                Easy Pocket Client
              </span>
            </div>

            <div className="order-2 md:order-3 flex items-center" id="nav-content">

              <a className="flex no-underline hover:text-black" href="#" onClick={handleUserActionClick}>
                <span>
                  {isUserLoggedIn ? 'Logout' : 'Login'}
                </span>
                <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <circle fill="none" cx="12" cy="7" r="3" />
                  <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
                </svg>
              </a>

            </div>
          </div>
        </nav>

        <section className="bg-white py-8">
          <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            {children}
          </div>
        </section>

        <footer className="container mx-auto bg-white py-8 border-t border-gray-400">
          <div className="container flex px-3 py-8 ">
            <div className="w-full mx-auto flex flex-wrap">
              <div className="flex w-full lg:w-1/2 ">
                <div className="px-3 md:px-0">
                  <h3 className="font-bold text-gray-900">About</h3>
                  <div className="py-4">
                    <p>
                      I really like pocket app, but for me it is a little bit too complicated. I prefer to just click on link and be immediately sent to article/website. Because of that I decided to create this simple client for pocket. That uses original Engine, but UI is much simpler.
                    </p>
                    <p>
                      <a
                        className="inline-block no-underline hover:text-black hover:underline py-1"
                        href="https://github.com/niecnasowa"
                        target="_blank"
                        rel="noreferrer"
                      >
                        ~ Damian
                        </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
