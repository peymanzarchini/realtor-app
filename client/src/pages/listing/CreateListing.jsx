import { useState } from "react";
import Container from "../../components/Styles/Container";
import ProductSpinner from "../../components/Spinner/productSpinner";
import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const CreateListing = () => {
  const preset_key = "images_preset";
  const cloud_name = "duei0blsa";

  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();

        const image = await resizeFile(files[i]);

        formData.append("file", image);
        formData.append("upload_preset", preset_key);

        setLoading(true);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log(data);
        promises.push(data.secure_url);
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
          setImageUploadError(false);
          setLoading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setLoading(false);
          console.log(err);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <section>
      <h1 className="text-3xl text-center font-semibold pt-5">Create listing</h1>
      <Container classProps="py-5">
        <form className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              name="name"
              maxLength="62"
              minLength="10"
              required
              // onChange={handleChange}
              // value={formData.name}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              name="description"
              required
              // onChange={handleChange}
              // value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              name="address"
              required
              // onChange={handleChange}
              // value={formData.address}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="sale"
                  className="w-5"
                  // onChange={handleChange}
                  // checked={formData.type === 'sale'}
                />
                <span>Sell</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rent"
                  className="w-5"
                  // onChange={handleChange}
                  // checked={formData.type === 'rent'}
                />
                <span>Rent</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="parking"
                  className="w-5"
                  // onChange={handleChange}
                  // checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="furnished"
                  className="w-5"
                  // onChange={handleChange}
                  // checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="offer"
                  className="w-5"
                  // onChange={handleChange}
                  // checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  // value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  // value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="lat"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  // value={formData.lat}
                />
                <p>Latitude</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="long"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  // value={formData.long}
                />
                <p>Longitude</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  // value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {/* {formData.type === 'rent' && ( */}
                  {/* <span className='text-xs'>($ / month)</span> */}
                  {/* )} */}
                </div>
              </div>
              {/* {formData.offer && ( */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  // value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>

                  {/* {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )} */}
                </div>
              </div>
              {/* )} */}
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                disabled={loading}
                onClick={handleImageSubmit}
                className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80"
              >
                Upload
              </button>
            </div>
            {imageUploadError && (
              <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
            )}
            {loading ? <ProductSpinner /> : null}
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div key={url} className="flex justify-between p-3 border items-center">
                  <img
                    src={url}
                    alt="listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              // disabled={loading || uploading}
              className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80"
            >
              {/* {loading ? 'Creating...' : 'Create listing'} */}
              Create listing
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default CreateListing;
