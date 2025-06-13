import {useState, useEffect, useMemo} from 'react';
import {defer, json} from '@shopify/remix-oxygen';
import {Image, Money} from '@shopify/hydrogen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import FooterLinks from '~/components/FooterLinks';
import { Footer } from '~/components/Footer';
import { sliderContent } from '~/components/sliderContent';
import Slider from '~/components/Slider';
import Swiper from 'swiper';
import { SwiperSlide } from 'swiper/react';
import {motion, AnimatePresence} from 'framer-motion';
import Testimonials from '~/components/Testimonials';
import DialogflowChatbot from '~/components/DialogflowChatbot';
import FAQComponent from '~/components/FAQComponent';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'GCFR Stores | Home'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */

export async function loader({ context }) {
  const collectionHandles = ['the-perfect-groom', 'gentleman-collection', 'the-modern-man'];

  // Deferred non-critical data (Recommended Products)
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  // Critical featured collection query
  const [{ collections }, collectionsData] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    Promise.all(
      collectionHandles.map(async (handle) => {
        const { collection } = await context.storefront.query(COLLECTION_QUERY, {
          variables: { handle, first: 100 },
        });
        return { handle, collection };
      })
    ),
  ]);

  const collectionsMap = collectionsData.reduce((acc, { handle, collection }) => {
    acc[handle] = collection;
    return acc;
  }, {});

  return defer({
    featuredCollection: collections.nodes,
    recommendedProducts,
    ...collectionsMap, // perfect-groom, gentleman, modern-man
  });
}


/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();


  return (
    <div className='mx-0'>
  {/* Slider */}
  <div className='mt-20 sm:mt-28 md:mt-32'>
    <Slider />
  </div>

  {/* Featured Products */}
  <div className='z-10 relative py-10 px-4 sm:px-4 md:px-10 lg:px-16'>
    <FeaturedCollection collections={data.featuredCollection} />
  </div>

  <div className='z-10 relative py-10 pb-0 px-4 sm:px-6 md:px-10 lg:px-16'>
    <RecommendedProducts products={data.recommendedProducts} />
  </div>

  <div className='z-10 relative pb-10 pt-10 lg:pt-0 px-4 sm:px-6 md:px-10 lg:px-16'>
    <TabComponent collectionsData={data} />
  </div>

  <div className='z-10 relative pt-16'>
    <Testimonials />
  </div>

  <div className='z-10 relative pt-16'>
    <FAQComponent />
  </div>

  {/* Chatbot */}
  <div className='z-20 relative'>
    <DialogflowChatbot />
  </div>
  <div className='z-10 relative'>
    <FooterLinks />
  </div>
</div>

    // <div className='mx-0'>
    //   {/* Slider */}
    //   <div className='mt-32'>
    //     <Slider />
    //   </div>

    //   {/* Featured Products */}
    //   <div className='z-10 relative py-10  px-16'>
    //     <FeaturedCollection collections={data.featuredCollection} />
    //   </div>

    //   <div className='z-10 relative pt-10 pb-0 px-16'>
    //     <RecommendedProducts products={data.recommendedProducts} />
    //   </div>

    //   <div className='z-10 relative pb-10 pt-0 px-16'>
    //     <TabComponent collectionsData={data} />
    //   </div>
      
    //   <div className='z-10 relative'>
    //     <FooterLinks/>
    //   </div>
    // </div>
  );
}

export function TabComponent({ collectionsData }) {
  const tabs = ['The Perfect Groom', 'Gentleman Collection', 'The Modern Man'];

  const tabHandles = {
    'The Perfect Groom': 'the-perfect-groom',
    'Gentleman Collection': 'gentleman-collection',
    'The Modern Man': 'the-modern-man',
  };

  const [activeTab, setActiveTab] = useState('The Perfect Groom');
  const [visibleCount, setVisibleCount] = useState(8);

  // Debug: Log the data you receive for collections
  console.log('collectionsData in TabComponent:', collectionsData);

  // Grab the collection based on active tab
  // const currentCollection = collectionsData?.[tabHandles[activeTab]]?.collection;
  const currentCollection = collectionsData?.[tabHandles[activeTab]]
  if (!currentCollection) {
    console.warn(`No collection found for handle: ${tabHandles[activeTab]}`);
  }

  // Products list from the active collection
  const allProducts = currentCollection?.products?.nodes || [];

  // Slice products to visible count
  const visibleProducts = useMemo(() => allProducts.slice(0, visibleCount), [allProducts, visibleCount]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setVisibleCount(8); // reset visible count on tab change
  };

  return (
    <div>
      <h2 className="text-black text-center font-semibold text-4xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 md:mb-8 px-8 lg:px-0">
        Smart Collections For You
      </h2>
      <p className='uppercase text-gray-400 text-sm sm:text-base md:text-lg text-center'>
        Handpicked With Style in Mind
      </p>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 mt-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm md:text-base font-medium cursor-pointer ${
              activeTab === tab
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-gray-300 hover:border-black'
            }`}
            onClick={() => handleTabClick(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {visibleProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No products available.</p>
        ) : (
          visibleProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.handle}`}
              className="text-center"
            >
              {product.images?.nodes?.[0] && (
                <img
                  src={product.images.nodes[0].url}
                  alt={product.images.nodes[0].altText || product.title}
                  className="rounded-lg w-full object-cover aspect-square"
                />
              )}
              <h4 className="mt-2 font-medium">{product.title}</h4>
              <small className="text-gray-600">
                {product.priceRange?.minVariantPrice?.amount &&
                  `$${Number(product.priceRange.minVariantPrice.amount).toFixed(2)}`}
              </small>
            </Link>
          ))
        )}
      </div>

      {/* Load more button */}
      {visibleCount < allProducts.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="px-6 py-2 border border-black text-black rounded-full hover:bg-black hover:text-white transition"
            type="button"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}



/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collections}) {
  if (!collections || collections.length === 0) return null;
  
  return (
    <div className='flex lg:justify-between justify-center lg:flex-nowrap flex-wrap items-start lg:items-stretch lg:gap-2 gap-4 gap-y-0 w-full'>
      {collections.map((collection) => {
        const image = collection.image;
        return (
          <Link
            key={collection.id}
            className='featured-collection lg:w-72 w-28 h-auto'
            to={`/collections/${collection.handle}`}
          >
            {image && (
              <div className='featured-collection-image mb-4'>
                <Image
                  data={image}
                  sizes='50vw'
                  className='w-32 h-auto border border-amber-600 mb-4'
                />
              </div>
            )}
            <h1 className='text-md font-medium text-center'>{collection.title}</h1>
          </Link>
        );
      })}
    </div>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products lg:pb-20 sm:pb-24 z-0">
      <h2 className='text-black text-center lg:pt-24 sm:pt-12 font-semibold lg:text-5xl text-4xl lg:mb-4 sm:mb-2'>Recommended Products</h2>
      <p className='uppercase text-gray-400 text-lg text-center'>Carefully Chosen For You</p>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid mt-12">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="50vw"
                      />
                      <div className='flex flex-col gap-1 mt-4'>
                        <h4 className='font-normal text-md'>{product.title}</h4>
                        <h4 className='font-medium text-lg'>
                          <Money data={product.priceRange.minVariantPrice} />
                        </h4>
                      </div>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 10, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 10, sortKey: UPDATED_AT, reverse: false) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

const PRODUCTS_BY_COLLECTION_QUERY = `#graphql
  fragment ProductCard on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }

  query ProductsByCollection($handle: String!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      title
      products(first: 12) {
        nodes {
          ...ProductCard
        }
      }
    }
  }
`;

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    images(first: 1) {
      nodes {
        id
        altText
        url
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
