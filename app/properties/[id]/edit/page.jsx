import PropertyEditForm from '@/components/PropertyEditForm';
import dbConnect from '@/config/database';
import Property from '@/models/property';
import { convertToSerializableObject } from '@/utils/convertToObject';

// NOTE: this can be a server component and we can query the DB for the property
// directly and pass to our PropertyEditForm

const PropertyEditPage = async ({ params }) => {
  await dbConnect();

  // query the property in the DB
  const propertyDoc = await Property.findById(params.id).lean();

  // convert the document to a plain js object so we can pass to client
  // components
  const property = convertToSerializableObject(propertyDoc);

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};
export default PropertyEditPage;
