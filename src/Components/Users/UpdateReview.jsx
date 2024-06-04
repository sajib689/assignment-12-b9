

const UpdateReview = () => {
    return (
        <div className="flex flex-col w-[410px] md:w-full lg:w-full md:p-8  shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <h2 className="text-3xl font-semibold text-center">
            Your opinion matters!
          </h2>
          <div className="flex flex-col items-center py-6 space-y-3">
            <span className="text-center">How was your experience?</span>
            <div className="flex space-x-3">
              <Rating
                value={value}
                onChange={(e) => setValue(e.value)}
                cancel={false}
                required
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <textarea
            required
              name="review"
              rows="3"
              placeholder="Message..."
              className="p-4 border rounded-md resize-none dark:text-gray-800 dark:bg-gray-50"
            ></textarea>
            <button
              type="submit"
              className="py-4 bg-blue-600 text-white my-8 font-semibold rounded-md dark:text-gray-50 dark:bg-blue-600"
            >
              Leave feedback
            </button>
          </div>
        </form>
      </div>
    );
};

export default UpdateReview;