import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const getRentDisplay = () => {
    const { financials } = property;
    return `${financials.rent.toLocaleString()}/mo`;
  };

  return (
    <div className='rounded-xl shadow-md relative'>
      <Image
        src={`https://picsum.photos/400/300?random=${property._id}`}
        alt={property.name}
        width={400}
        height={300}
        className='w-full h-auto rounded-t-xl'
      />
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600 capitalize'>{property.type}</div>
          <h3 className='text-xl font-bold'>{property.name}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          ${getRentDisplay()}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='inline mr-2' /> {property.beds}{' '}
            <span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='inline mr-2' />
            {property.baths} <span className='md:hidden lg:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline mr-2' />
            {property.size}{' '}
            <span className='md:hidden lg:inline'>
              {property.size_unit === 'square_feet' ? 'sqft' : 'sqm'}
            </span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {property.financials.rent && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Rent
            </p>
          )}
          {property.financials.deposit && (
            <p>
              <FaMoneyBill className='inline mr-2' /> Deposit
            </p>
          )}
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='text-orange-700 mt-1' />
            <span className='text-orange-700'>
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
