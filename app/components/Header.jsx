import { useState, useEffect } from 'react';
import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import {useAnalytics} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import { productImgs } from './productImgs';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  const headerText = [
    'SALES ITEMS ARE ONLY ELIGIBLE FOR STORE CREDIT OR EXCHANGE, THEY ARE ALL NON-REFUNDABLE',
    'GET FREE SHIPPING ON ORDERS ABOVE $200 AND MORE'
  ]

  const [count, setCount] = useState(0)
  const [ currentSlide, setCurrentSlide ] = useState('span1')

  const classItem = ['span1', 'span2']

  useEffect(() => {
    const timer = setInterval(() => {
    setCurrentSlide(classItem[count])
    if(count === 1) {
      setCount(0)
    } else {
      setCount(count + 1)
    }
    }, 4000);
    return () => clearInterval(timer);
  });

  return (
    <div className='fixed w-[1550px] z-10 max-w-full'>
      <div className='w-full overflow-hidden bg-black h-[40px]'>
        <div className={`${currentSlide} transition-all duration-1000`}>
          {headerText.map((textSpan, index) => (
              <div key={index} className='text-center h-[40px] flex flex-col justify-center items-center lg:px-0 lg:py-0 px-6'>
                <p className='text-white text-sm uppercase'>{textSpan}</p>
              </div>
            ))}
        </div>
      </div>
      <header className="header lg:pt-0 backdrop-blur-md lg:justify-around justify-between lg:w-auto w-full lg:py-0 py-0 lg:px-5 px-10 lg:mx-16 md:mx-14 mx-0">
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
        <div className='flex items-end justify-center space-x-6 pb-2'>
          <NavLink className='' prefetch="intent" to="/" style={activeLinkStyle} end>
            {
              productImgs.map((item, i) => (
                <div key={i}>
                  <img src={item.img1} alt="" className='w-[120px]' />
                </div>
              ))
            }
          </NavLink>
        </div>

        <div className='z-5'>
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} className='' />
        </div>
      </header>
    </div>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
      <CurrencySwitcher />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

// function SearchToggle() {
//   const {open} = useAside();
//   return (
//     <button onClick={() => open('search')} className="flex items-center gap-2 text-black hover:text-[#e3a81e] text-md cursor-pointer">
//       {/* Search */}
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" /></svg>
//     </button>
//   );
// }


function SearchToggle() {
  const { open } = useAside();

  return (
    <button
      onClick={() => open('search')}
      className="reset flex items-center gap-2 text-black hover:text-[#e3a81e] text-md cursor-pointer"
      aria-label="Search"
    >
      <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" /></svg></span>
    </button>
  );
}

function CurrencySwitcher() {
  const [currency, setCurrency] = useState(
    typeof window !== 'undefined' && localStorage.getItem('selected-currency') || 'NGN'
  );

  const handleChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected-currency', selectedCurrency);
      window.location.href = `/?currency=${selectedCurrency}`; // reload with query param
    }
  };

  return (
    <div className="ml-4">
      <label htmlFor="currency" className="sr-only">Currency</label>
      <select
        id="currency"
        value={currency}
        onChange={handleChange}
        className="border px-2 py-1 text-sm rounded-md"
      >
        <option value="NGN">NGN (₦)</option>
        <option value="USD">USD ($)</option>
        <option value="GBP">GBP (£)</option>
      </select>
    </div>
  );
}


// function Currency(){
//   const {shop} = useAnalytics();
//   return (
//     <div className='flex items-center gap-2 text-black hover:text-[#e3a81e] text-md'>
//       <span className='text-sm'>Currency:</span>
//       <span className='text-sm'>{shop.currencyCode}</span>
//     </div>
//   );
// }

/**
 * @param {{count: number | null}}
 */
function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className='flex items-center gap-2 text-black hover:text-[#e3a81e] text-md'
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      {/* <span> */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"><path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" /></svg>
      {/* </span> */}
      <span>
        {count === null ? <span>&nbsp;</span> : count}
      </span>
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'Contact',
      type: 'HTTP',
      url: '/contact',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
